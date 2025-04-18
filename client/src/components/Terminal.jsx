import { useEffect, useRef } from 'react'
import {Terminal as XTerminal} from '@xterm/xterm'
import socket from '../socket'

import '@xterm/xterm/css/xterm.css'

export const TerminalComponent = () => {
     const terminalRef = useRef();
     const isRendered = useRef(false);

     useEffect(() => {
          if(isRendered.current) return;
          isRendered.current = true;
          
          const term = new XTerminal({
               rows: 20,
          });
          term.open(terminalRef.current);

          term.onData(data => {
               socket.emit('terminal:write', data)
          });

          socket.on('terminal:data', (data) => {
               term.write(data)
          });
     }, []);

     return(
          <div ref={terminalRef} id="terminal" />
     )
}