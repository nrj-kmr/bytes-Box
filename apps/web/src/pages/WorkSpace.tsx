import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTabState } from "../store/fileSystem";
import { Tabs } from "../components/ui/Tabs";
import { CodeEditor } from "../components/ui/CodeEditor";
import { TerminalComponent } from "../components/ui/Terminal";
import { ThemeToggle } from "../components/ThemeToggle";
import {
    Icon,
    IconTerminal,
    IconX,
    IconMonitor
} from "../components/ui/LucidIcons";
import { Files, Palette, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { editorThemeState } from "../store/editorAtoms";
import { FileExplorer } from "../components/ui/FileExplorer";

export const WorkSpace = () => {
    const activeFile = useRecoilValue(activeTabState);
    const [editorTheme, setEditorTheme] = useRecoilState(editorThemeState)
    const [showTerminal, setShowTerminal] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [terminalHeight] = useState(288);

    const userId = localStorage.getItem('user-id')
    const navigate = useNavigate();

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

            {/* Activity Bar */}
            <div className="w-12 bg-secondary h-full flex flex-col items-center py-2 gap-1 border-r border-border">
                <div className="py-3 flex flex-col items-center">
                    <div onClick={() => navigate('/')}
                        className="w-7 h-7 rounded-md mb-4 cursor-pointer">
                        <img src="byteBox.png" alt="Logo" />
                    </div>
                </div>

                <button
                    onClick={() => setSidebarCollapsed(prev => !prev)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md text-foreground mb-2 relative active:translate-y-[1px] transition-all cursor-pointer">
                    <Icon icon={Files} size={24} />
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-foreground rounded-r-md"></div>
                </button>

                <div className="flex-1"></div>

                {/* User's Info - Login or Logout */}
                {userId ? (
                    <button
                    onClick={() => {
                        localStorage.removeItem('user-id')
                        navigate('/signin')
                    }}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md text-muted-foreground hover:text-foreground active:translate-y-[1px] transition-all cursor-pointer"
                    title="Logout"
                    >
                    <Icon icon={LogOut} size={24} />
                </button>
                ) : (
                    <button
                    onClick={() => {
                        localStorage.removeItem('user-id')
                        navigate('/signin')
                    }}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md text-muted-foreground hover:text-foreground active:translate-y-[1px] transition-all cursor-pointer"
                    title="Login"
                    >
                    <Icon icon={LogIn} size={24} />
                </button>
                )}

                {/* ThemeToggle Button - Positioned around line 80 */}
                <div className="text-muted-foreground hover:text-foreground m-2 cursor-pointer">
                    <ThemeToggle />
                </div>

                {/* Code Editor's Theme */}
                <button
                    onClick={() => editorTheme === "vs-dark" ? setEditorTheme('vs-light') : setEditorTheme('vs-dark')}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md text-muted-foreground hover:text-foreground active:translate-y-[1px] transition-all mb-2 cursor-pointer"
                    title="Change Code Editor Theme"
                >
                    <Palette size={24} />
                </button>
            </div>

            {/* Explorer Panel */}
            <FileExplorer
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />


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
                                    <IconMonitor size={48} strokeWidth={1} className="mx-auto mb-2 opacity-30" />
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
                                className="h-7 bg-secondary flex items-center px-3 justify-between select-none"
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon icon={IconTerminal} size={14} />
                                    <span className="text-xs font-medium">TERMINAL</span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="p-1 hover:bg-muted rounded-md"
                                        onClick={() => setShowTerminal(false)}
                                    >
                                        <Icon icon={IconX} size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="h-[calc(100%-32px)] overflow-hidden">
                                <TerminalComponent />
                            </div>
                        </div>
                    )}

                    <button
                        className="absolute bottom-10 right-4 bg-secondary text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-muted transition-colors shadow-sm z-10"
                        onClick={() => setShowTerminal(!showTerminal)}
                    >
                        <Icon icon={IconTerminal} size={14} />
                        <span>{showTerminal ? "Hide Terminal" : "Show Terminal"}</span>
                    </button>

                    {/* Status bar - bottom -> dynamically render the info like line number etc */}
                    <div className="h-6 border-t border-border bg-secondary flex items-center justify-between px-3 text-xs">
                        <div className="flex items-center space-x-2">
                            {activeFile && (
                                <span>
                                    {activeFile.type === 'file' && activeFile.path
                                        ? activeFile.path.replace(/^\//, '')
                                        : ''}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-3">
                            <span>{editorTheme === 'vs-dark' ? 'Dark' : 'Light'}</span>
                            {activeFile && (
                                <>
                                    <span className="text-muted-foreground">|</span>
                                    <span>{activeFile.name.split('.').pop()?.toUpperCase() || 'TXT'}</span>

                                    <span className="text-muted-foreground">|</span>
                                    <span>UTF-8</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};