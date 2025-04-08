import { useRecoilState, useSetRecoilState } from 'recoil';
import { fileTreeState, openTabsState, activeTabState, FileNode } from '../../store/fileSystem';

export const FileTree = () => {
  const [fileTree] = useRecoilState(fileTreeState);
  const [openTabs, setOpenTabs] = useRecoilState(openTabsState);
//   const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const setActiveTab = useSetRecoilState(activeTabState);

  const handleFileClick = (file: FileNode) => {
    const alreadyOpen = openTabs.find(tab => tab.id === file.id);
    if (!alreadyOpen) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file);
  };

  const renderTree = (nodes: FileNode[]) => {
    return nodes.map(node => (
      <div key={node.id} className="pl-2">
        <div
          className={`cursor-pointer ${node.type === 'file' ? 'text-blue-500' : 'font-bold'}`}
          onClick={() => node.type === 'file' && handleFileClick(node)}
        >
          📄 {node.name}
        </div>
        {node.children && renderTree(node.children)}
      </div>
    ));
  };

  return <div className="p-2 bg-gray-100 h-full">{renderTree(fileTree)}</div>;
};
