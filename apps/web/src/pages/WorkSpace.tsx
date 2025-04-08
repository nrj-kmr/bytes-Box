import { useState } from "react";
import { useRecoilValue } from "recoil";
import { activeTabState } from "../store/fileSystem";
import { FileTree } from "../components/FileTree/FileTree";
import { Tabs } from "../components/Tabs/Tabs";
import { CodeEditor } from "../components/Editor/Editor";
import { TerminalComponent } from "../components/Terminal/Terminal";

export const WorkSpace = () => {
    const activeFile = useRecoilValue(activeTabState);
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 border-r overflow-y-auto">
                <FileTree />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Tabs */}
                <Tabs />

                {/* Code Editor and Terminal */}
                <div className="flex flex-1 flex-col overflow-hidden">
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

                    {/* Toggle Button */}
                    <button
                        className="absolute bottom-2 right-2 bg-gray-200 text-sm px-3 py-1 rounded shadow border hover:bg-gray-300"
                        onClick={() => setShowTerminal((prev) => !prev)}
                    >
                        {showTerminal ? 'Hide Terminal' : 'Show Terminal'}
                    </button>
                </div>
            </div>
        </div>
    )
}