import http from 'node:http';
import path from 'node:path'
import fs from 'node:fs/promises';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
const pty = require('node-pty');
import express from 'express';
import chokidar from 'chokidar';

import fileRouter from './routes/files'

// store the terminal's current working directory
let currentCwd = path.resolve(process.env.INIT_CWD || process.cwd(), '../user-storage');
console.log('Initial directory:', currentCwd);

const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: currentCwd,
    env: {
        ...process.env,
        HISTSIZE: '0',
        HISTFILESIZE: '0',
        PS1: '\\w $ ',
    }
});

// Track if directory is changing
let directoryChangeInProgress = false;
let commandInProgress = false;
let lastActivity = Date.now();
const ACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const app = express();
app.use(cors());
const apiServer = http.createServer(app);
const io = new SocketServer({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.attach(apiServer);

chokidar.watch('./user').on("all", (event, path) => {
    io.emit('file:refresh', path);
});

// Improved parsing of terminal output
ptyProcess.onData((data: string) => {
    lastActivity = Date.now();

    // Forward data to clients immediately
    io.emit('terminal:data', data);

    // Check for directory change command
    if (data.includes(' cd ') && !commandInProgress) {
        console.log('CD command detected');
        directoryChangeInProgress = true;
        commandInProgress = true;
    }

    // Look for command completion (prompt pattern)
    if (data.includes(' $ ') && commandInProgress) {
        commandInProgress = false;

        if (directoryChangeInProgress) {
            directoryChangeInProgress = false;
            console.log('Directory change command completed');

            // Wait a bit for the shell to stabilize
            setTimeout(() => {
                // Use a unique marker with timestamp to avoid confusion with other output
                const timestamp = Date.now();
                const marker = `__CWD_MARKER_${timestamp}__`;
                ptyProcess.write(`echo "${marker}$(pwd)${marker}"\r`);
            }, 200);
        }
    }

    // Extract current directory from marker
    if (data.includes('__CWD_MARKER_')) {
        // Use a more flexible regex that can handle partial data chunks
        const markerPattern = /__CWD_MARKER_\d+__(.+?)__CWD_MARKER_\d+__/;
        const match = data.match(markerPattern);

        if (match && match[1]) {
            const newCwd = match[1].trim();
            if (currentCwd !== newCwd) {
                currentCwd = newCwd;
                console.log('Current directory updated to:', currentCwd);
            }
        }
    }
});

// More aggressive activity check
setInterval(() => {
    const now = Date.now();
    if (now - lastActivity > ACTIVITY_TIMEOUT / 2) {
        // Write a noop command that won't change the display but keeps session alive
        ptyProcess.write('\x00');  // Null byte won't appear in terminal
        lastActivity = now;
    }
}, 30000); // Check every 30 seconds

// When a client connects, send the current directory path
io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);

    // Send the current files
    socket.emit('file:refresh');

    // Let client know current directory
    socket.emit('terminal:data', `Current directory: ${currentCwd}\r\n`);

    socket.on('file:change', async ({ path, content }) => {
        await fs.writeFile(`../user-storage${path}`, content);
    });

    socket.on('terminal:write', (data) => {
        lastActivity = Date.now();
        ptyProcess.write(data);

        // If data looks like it might be a cd command, remember it
        if (data.includes('cd ')) {
            commandInProgress = true;
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket Disconnected', socket.id);
    });
});

app.use('/files', fileRouter);

app.get('/', (_req, res) => {
    res.send('Hello from the BytesBox Server!');
});

const PORT = process.env.PORT || 4000;
apiServer.listen(PORT, () => console.log(`Listening on Port:${PORT}`));
