import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import socket from '../../socket'
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export const TerminalComponent = () => {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const isRendered = useRef<boolean>(false);
    const fitAddon = useRef<FitAddon | null>(null);

    useEffect(() => {
        // Prevent multiple terminal instances
        if (isRendered.current || !terminalRef.current) return;
        isRendered.current = true;

        // Initialize terminal
        const term = new Terminal({
            rows: 20,
            cursorBlink: true,
            fontFamily: 'monospace',
            theme: {
                background: '#1e1e1e',
                foreground: '#ffffff',
                cursor: '#ffffff',
            },
        });
        term.open(terminalRef.current);

        fitAddon.current = new FitAddon();
        term.loadAddon(fitAddon.current);

        setTimeout(() => {
            fitAddon.current?.fit();
        }, 100);

        term.write(`Welcome to ByteBox Terminal! Press Enter to Continue`);

        term.onData((data: string) => {
            socket.emit('terminal:write', data);
        });

        const handleTerminalData = (data: string) => {
            term.write(data);
        }
        socket.on('terminal:data', handleTerminalData);
    }, []);

    return (
        <div
            ref={terminalRef}
            id="terminal"
            className='h-63 w-full bg-black'
        />
    );
}