import { useRecoilValue } from 'recoil'
import './styles/App.css'

import { FileTree } from './components/FileTree/FileTree';
import { Tabs } from './components/Tabs/Tabs';
import { activeTabState } from './store/fileSystem';
import CodeEditor from './components/Editor/Editor';
import TerminalComponent from './components/Terminal/Terminal';
import { useState } from 'react';


function App() {
  const activeFile = useRecoilValue(activeTabState);
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r overflow-y-auto">
        <FileTree />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs />

        {/* Editor and Terminal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <div className={`flex-1 ${showTerminal ? 'h-[calc(100%-14rem)]' : 'h-full'} overflow-hidden`}>
            {activeFile ? (
              <CodeEditor />
            ) : (
              <div className="p-2">Open a file to start editing</div>
            )}
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div className="h-56 border-t overflow-hidden">
              <TerminalComponent />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className="absolute bottom-2 right-2 bg-gray-200 text-sm px-3 py-1 rounded shadow border hover:bg-gray-300"
          onClick={() => setShowTerminal((prev) => !prev)}
        >
          {showTerminal ? 'Hide Terminal' : 'Show Terminal'}
        </button>
      </div>
    </div>
  );
}

export default App;
