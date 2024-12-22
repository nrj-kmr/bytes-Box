import { useEffect, useState } from 'react'
import './App.css'
import Terminal from './components/Terminal'
import FileTree from './components/Tree';
import socket from './socket';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function App() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState('')
  const [code, setCode] = useState('')

  const getFileTree = async () => {
    const response = await fetch("http://localhost:9000/files")
    const result = await response.json();
    setFileTree(result.tree)
  }

  useEffect(() => {
    getFileTree()
  }, []);

  useEffect(() => {
    socket.on('file:refresh', getFileTree);
    return () => {
      socket.off('file:refresh', getFileTree)
    }
  })

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    if (code) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path : selectedFile,
          content: code
        }) 
      }, 5 * 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [code, selectedFile])

  return (
    <div className='playground-container'>
      <div className='editor-container'>
        <div className='files p-5'>
          <FileTree onSelect={(path) => setSelectedFile(path)} tree={fileTree} />
        </div>
        <div className='text-editor'>
          {selectedFile && <p>{selectedFile.replaceAll('/', ' > ')}</p>}
          <AceEditor
            value={code}
            onChange={(e) => setCode(e)}
          />
        </div>
      </div>
      <div className='terminal-container'>
        <Terminal />
      </div>
    </div>
  )
}

export default App
