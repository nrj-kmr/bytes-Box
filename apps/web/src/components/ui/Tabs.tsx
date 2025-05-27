import { useRecoilState } from "recoil";
import { activeTabState, FileNode, openTabsState } from "../../store/fileSystem";
import { Icon, IconX } from "./LucidIcons";
import { X } from "lucide-react";

export const Tabs = () => {
    const [openTabs, setOpenTabs] = useRecoilState(openTabsState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    const handleTabClick = (file: FileNode) => {
        setActiveTab(file);
    };

    const handleCloseTab = (e: React.MouseEvent, file: FileNode) => {
        e.stopPropagation();
        setOpenTabs(openTabs.filter(tab => tab.id !== file.id));
        if (activeTab?.id === file.id) {
            setActiveTab(openTabs.length > 1 ? openTabs[0] : null);
        }
    };

    return (
        <div className="flex overflow-x-auto border-b border-border bg-card">
            {openTabs.map((file) => (
                <div
                    key={file.id}
                    onClick={() => handleTabClick(file)}
                    className={`
                        px-3 py-2 flex items-center text-sm border-r border-border relative min-w-[100px] max-w-[200px]
                        ${file.id === activeTab?.id
                            ? 'bg-background text-foreground'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }
                        ${file.id === activeTab?.id ? 'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:bg-primary' : ''}
                        transition-colors cursor-pointer group whitespace-nowrap
                    `}
                >
                    <div className="truncate flex-1">{file.name}</div>
                    <button
                        className={`
                            ml-2 rounded-sm hover:bg-muted transition-opacity
                            ${file.id === activeTab?.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                        `}
                        onClick={(e) => handleCloseTab(e, file)}
                    >
                        <Icon icon={X} className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    )
}