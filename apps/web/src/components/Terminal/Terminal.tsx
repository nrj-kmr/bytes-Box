import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
// import '@xterm/css/xterm.css';

export default function TerminalComponent() {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const term = useRef<Terminal | null>(null);
    const fitAddon = useRef<FitAddon | null>(null);

    useEffect(() => {
        if (terminalRef.current) {
            term.current = new Terminal({
                cursorBlink: true,
                // fontSize: 16,
                fontFamily: 'monospace',
                // lineHeight: 1.5,
                // scrollback: 1000,
                rows: 20,
                // cols: 80,
                theme: {
                    background: '#1e1e1e',
                    foreground: '#ffffff',
                    cursor: '#ffffff',
                },
            });

            fitAddon.current = new FitAddon();
            term.current.loadAddon(fitAddon.current);
            term.current.open(terminalRef.current);
            setTimeout(() => {
                fitAddon.current?.fit();
            }, 0);

            term.current.writeln('Welcome to ByteBox Terminal!');
            term.current.writeln("$");

            // Handle Cleanup
            return () => {
                term.current?.dispose();
                fitAddon.current?.dispose();
            };
        }
    }, []);

    return <div className='h-64 w-full bg-black' ref={terminalRef} id="terminal" />
}