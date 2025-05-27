import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { activeTabState } from "../store/fileSystem";
import { Tabs } from "../components/ui/Tabs";
import { CodeEditor } from "../components/ui/CodeEditor";
import { TerminalComponent } from "../components/ui/Terminal";
import {
    Icon,
} from "../components/ui/LucidIcons";
import socket from "../socket";
import { ActivityBar } from "../components/ui/ActivityBar";
import { WorkspaceFooter } from "../components/ui/WorkspaceFooter";
import { Monitor, Terminal, X } from "lucide-react";

export const WorkSpace = () => {
    const activeFile = useRecoilValue(activeTabState);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalHeight] = useState(288);


    // Initialize socket connection
    useEffect(() => {
        if (socket.disconnected) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">

            <ActivityBar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Tabs */}
                <Tabs />

                {/* Code Editor and Terminal */}
                <div className="flex flex-1 flex-col overflow-hidden relative">
                    {/* Code Editor */}
                    <div
                        className="flex-1 overflow-hidden"
                        style={{ height: showTerminal ? `calc(100% - ${terminalHeight}px)` : '100%' }}
                    >
                        {activeFile ? (
                            <CodeEditor />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <div className="text-center space-y-3">
                                    <Icon icon={Monitor} size={48} strokeWidth={1} className="mx-auto mb-2 opacity-30" />
                                    <div className="text-xl font-light">No file is open</div>
                                    <div className="text-sm">Select a file from the explorer to start editing</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Terminal */}
                    {showTerminal && (
                        <div
                            className="border-t border-border bg-card"
                            style={{ height: `${terminalHeight}px` }}
                        >
                            <div
                                className="h-9 bg-secondary flex items-center px-3 justify-between select-none"
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon icon={Terminal} size={14} />
                                    <span className="text-xs font-medium">TERMINAL</span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="p-1 hover:bg-muted rounded-md"
                                        onClick={() => setShowTerminal(false)}
                                    >
                                        <Icon icon={X} size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="h-[calc(100%-32px)] overflow-hidden">
                                <TerminalComponent />
                            </div>
                        </div>
                    )}

                    <button
                        className="absolute bottom-4 right-4 bg-secondary text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-accent transition-colors shadow-sm z-10 cursor-pointer"
                        onClick={() => setShowTerminal(!showTerminal)}
                    >
                        <Icon icon={Terminal} size={14} />
                        <span>{showTerminal ? "Hide Terminal" : "Show Terminal"}</span>
                    </button>
                </div>
                    <WorkspaceFooter />
            </div>
        </div>
    );
};