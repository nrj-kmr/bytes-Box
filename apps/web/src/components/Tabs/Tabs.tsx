import { useRecoilState } from "recoil";
import { activeTabState, FileNode, openTabsState } from "../../store/fileSystem";


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
        <div className="flex space-x-2 p-2 bg-gray-200 border-b">
            {openTabs.map((file) => (
                <div
                    key={file.id}
                    onClick={() => handleTabClick(file)}
                    className={`px-2 py-1 border rounded-t ${file.id === activeTab?.id ? 'bg-gray-200 font-bold' : 'bg-gray-100'
                        } cursor-pointer flex items-center`}
                >
                    {file.name}
                    <button
                        className="ml-2 text-sm text-red-500"
                        onClick={(e) => handleCloseTab(e, file)}
                    >
                        ✖️
                    </button>
                </div>
            ))}
        </div>
    )
}