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

const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: currentCwd,
    env: {
        ...process.env,
        HISTSIZE: '0',
        HISTFILESIZE: '0',
        PS1: '\\W $ ',
    }
});

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

ptyProcess.onData((data: string) => {
    io.emit('terminal:data', data);
});


// When a client connects, send the current directory path
io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);

    // Send the current files
    socket.emit('file:refresh');


    socket.on('file:change', async ({ path, content }) => {
        await fs.writeFile(`../user-storage${path}`, content);
    });

    socket.on('terminal:write', (data) => {
        ptyProcess.write(data);
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
