import http from 'node:http';
import fs from 'node:fs/promises';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
// import pty from 'node-pty';
const pty = require('node-pty');
import express from 'express';
import chokidar from 'chokidar';

import fileRouter from './routes/files'

const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD + '/user',
    env: process.env
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

io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);

    socket.emit('file:refresh');

    socket.on('file:change', async ({ path, content }) => {
        await fs.writeFile(`./user${path}`, content);
    });

    socket.on('terminal:write', (data) => {
        ptyProcess.write(data);
    });
});

app.use('/files', fileRouter);

app.get('/', (_req, res) => {
    res.send('Hello from the Server!')
})


const PORT = process.env.PORT || 4000;
apiServer.listen(PORT, () => console.log(`Listening on Port:${PORT}`));