import { useState } from "react";
import { useRecoilValue } from "recoil";
import { activeTabState } from "../store/fileSystem";
import { FileTree } from "../components/FileTree/FileTree";
import { Tabs } from "../components/Tabs/Tabs";
import { CodeEditor } from "../components/Editor/Editor";
import { TerminalComponent } from "../components/Terminal/Terminal";
import { ThemeToggle } from "../components/ThemeToggle";
import {
    Icon,
    IconTerminal,
    IconX,
    IconBranch,
    IconMonitor
} from "../components/Icons";
import { ChevronFirst, Files, Settings, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WorkSpace = () => {
    const activeFile = useRecoilValue(activeTabState);
    const [showTerminal, setShowTerminal] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [terminalHeight, setTerminalHeight] = useState(240);

    const navigate = useNavigate();

    // Terminal drag resize handler
    const handleTerminalResize = (e: React.MouseEvent) => {
        if (e.buttons !== 1) return; // Only resize on left mouse button
        const newHeight = Math.max(100, Math.min(500, window.innerHeight - e.clientY));
        setTerminalHeight(newHeight);
    };

    return (
        <div className="flex h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-hidden">

            {/* Activity Bar */}
            <div className="w-12 bg-[rgb(var(--secondary))] h-full flex flex-col items-center py-2 gap-1 border-r border-[rgb(var(--border))]">
                <div className="py-3 flex flex-col items-center">
                    <div onClick={() => navigate('/')}
                    className="w-7 h-7 rounded-md mb-4 cursor-pointer">
                        <img src="byteBox.png" alt="Logo" />
                    </div>
                </div>

                <button
                    onClick={() => setSidebarCollapsed(prev => !prev)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[rgb(var(--muted))] rounded-md text-[rgb(var(--foreground))] mb-2 relative active:translate-y-[1px] transition-all cursor-pointer">
                    <Icon icon={Files} size={24} />
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[rgb(var(--accent-foreground))] rounded-r-md"></div>
                </button>

                {/* Search Button */}
                {/* <button className="w-10 h-10 flex items-center justify-center hover:bg-[rgb(var(--muted))] rounded-md text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] active:translate-y-[1px] transition-all">
                    <Icon icon={Search} />
                </button> */}

                {/* VCS button */}
                {/* <button className="w-10 h-10 flex items-center justify-center hover:bg-[rgb(var(--muted))] rounded-md text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] active:translate-y-[1px] transition-all">
                    <Icon icon={GitCompareArrows} />
                </button> */}

                <div className="flex-1"></div>

                {/* User's Info - Give Options in a popup 'onClick' */}
                <button className="w-10 h-10 flex items-center justify-center hover:bg-[rgb(var(--muted))] rounded-md text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] active:translate-y-[1px] transition-all cursor-pointer">
                    <Icon icon={CircleUserRound} size={24} />
                </button>

                {/* ThemeToggle Button - Positioned around line 80 */}
                <div className="w-10 h-10 active:translate-y-[1px] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 cursor-pointer">
                    <ThemeToggle />
                </div>

                {/* Settings Button - plan to move theme toggle inside the settins option */}
                <button className="w-10 h-10 flex items-center justify-center hover:bg-[rgb(var(--muted))] rounded-md text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] active:translate-y-[1px] transition-all mb-2 cursor-pointer">
                    <Icon icon={Settings} size={24} />
                </button>

            </div>

            {/* Explorer Panel */}
            <div className={`${sidebarCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'} border-r border-[rgb(var(--border))] transition-all duration-200 overflow-hidden flex flex-col`}>
                <div className="p-3 font-medium text-xs tracking-tight uppercase text-[rgb(var(--muted-foreground))] flex items-center justify-between">
                    <span>Explorer</span>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-[rgb(var(--muted))] rounded-md">
                            <Icon
                                onClick={() => setSidebarCollapsed(prev => !prev)}
                                icon={ChevronFirst}
                                size={16}
                            />
                        </button>
                    </div>
                </div>
                <div className="overflow-y-auto flex-1">
                    <FileTree />
                </div>
            </div>

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
                            <div className="flex items-center justify-center h-full text-[rgb(var(--muted-foreground))]">
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
                            className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]"
                            style={{ height: `${terminalHeight}px` }}
                        >
                            <div
                                className="h-8 bg-[rgb(var(--secondary))] flex items-center px-3 justify-between cursor-ns-resize select-none"
                                onMouseDown={() => { }}
                                onMouseMove={handleTerminalResize}
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon icon={IconTerminal} size={14} />
                                    <span className="text-xs font-medium">TERMINAL</span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="p-1 hover:bg-[rgb(var(--muted))] rounded-md"
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

                    {/* Status bar - bottom -> dynamically render the info like line number etc */}
                    <div className="h-6 border-t border-[rgb(var(--border))] bg-[rgb(var(--secondary))] flex items-center justify-between px-3 text-xs">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center gap-1.5">
                                <Icon icon={IconBranch} size={12} />
                                <span>main</span>
                            </div>
                            <span className="text-[rgb(var(--muted-foreground))]">TypeScript</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span>Ln 1, Col 1</span>
                            <span>Spaces: 2</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terminal Toggle Button - Always visible */}
            <button
                className="absolute bottom-10 right-4 bg-[rgb(var(--secondary))] text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-[rgb(var(--muted))] transition-colors shadow-sm z-10"
                onClick={() => setShowTerminal(!showTerminal)}
            >
                <Icon icon={IconTerminal} size={14} />
                <span>{showTerminal ? "Hide Terminal" : "Show Terminal"}</span>
            </button>
        </div>
    );
};