import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { io } from 'socket.io-client';

export const TerminalComponent = () => {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const term = useRef<Terminal | null>(null);
    const fitAddon = useRef<FitAddon | null>(null);
    const socket = useRef<any>();

    useEffect(() => {
        if (terminalRef.current) {
            term.current = new Terminal({
                cursorBlink: true,
                fontFamily: 'monospace',
                rows: 20,
                theme: {
                    background: '#1e1e1e',
                    foreground: '#ffffff',
                    cursor: '#ffffff',
                },
            });

            fitAddon.current = new FitAddon();
            term.current.loadAddon(fitAddon.current);
            term.current.open(terminalRef.current);

            socket.current = io('http://localhost:4000');

            socket.current.on('output', (data: string) => {
                term.current?.write(data);
            })

            // Use setTimeout to ensure the terminal element is properly mounted
            setTimeout(() => {
                if (fitAddon.current) {
                    try {
                        fitAddon.current.fit();
                    } catch (err) {
                        console.error('Failed to fit terminal:', err);
                    }
                }
            }, 100);

            term.current.writeln('Welcome to ByteBox Terminal!');
            term.current.writeln("$");

            term.current.onData((data) => {
                socket.current.emit('input', data);
            });

            // Handle window resizing
            const handleResize = () => {
                fitAddon.current?.fit();
            };

            window.addEventListener('resize', handleResize);

            // Handle Cleanup
            return () => {
                window.removeEventListener('resize', handleResize);
                term.current?.dispose();
                fitAddon.current = null;
                socket.current.disconnect();
            };
        }
    }, []);

    return <div className='h-64 w-full bg-black' ref={terminalRef} id="terminal" />
}