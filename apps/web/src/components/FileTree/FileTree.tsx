import { useRecoilState, useSetRecoilState } from 'recoil';
import { fileTreeState, openTabsState, activeTabState, FileNode } from '../../store/fileSystem';
import { useState } from 'react';
import { Icon } from '../Icons';
import { FileCode, FileJson, FileText, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

// Function to determine which icon to use based on file extension
const getFileIcon = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  if (['js', 'jsx', 'ts', 'tsx'].includes(extension || '')) {
    return FileCode;
  } else if (['json'].includes(extension || '')) {
    return FileJson;
  } else {
    return FileText;
  }
};

export const FileTree = () => {
  const [fileTree] = useRecoilState(fileTreeState);
  const [openTabs, setOpenTabs] = useRecoilState(openTabsState);
  const setActiveTab = useSetRecoilState(activeTabState);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const handleFileClick = (file: FileNode) => {
    const alreadyOpen = openTabs.find(tab => tab.id === file.id);
    if (!alreadyOpen) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const renderTree = (nodes: FileNode[]) => {
    return nodes.map(node => (
      <div key={node.id} className="pl-1">
        {node.type === 'folder' ? (
          <div>
            <div
              className="flex items-center py-0.5 px-1 cursor-pointer hover:bg-[rgb(var(--muted))] rounded-sm my-0.5 group"
              onClick={() => toggleFolder(node.id)}
            >
              <Icon 
                icon={expandedFolders[node.id] ? ChevronDown : ChevronRight} 
                size={16} 
                className="mr-1 text-[rgb(var(--muted-foreground))]" 
              />
              <Icon 
                icon={expandedFolders[node.id] ? FolderOpen : Folder} 
                size={16} 
                className="mr-1.5 text-[rgb(var(--accent-foreground))]" 
              />
              <span className="text-sm">{node.name}</span>
            </div>
            {expandedFolders[node.id] && node.children && (
              <div className="pl-4 border-l border-[rgb(var(--border))] ml-2">
                {renderTree(node.children)}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center py-0.5 px-1 cursor-pointer hover:bg-[rgb(var(--muted))] rounded-sm my-0.5 text-sm"
            onClick={() => handleFileClick(node)}
          >
            <Icon 
              icon={getFileIcon(node.name)} 
              size={16} 
              className="mr-1.5 text-[rgb(var(--muted-foreground))]" 
              strokeWidth={1.5}
            />
            {node.name}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="p-2 h-full">
      {fileTree.length > 0 ? (
        renderTree(fileTree)
      ) : (
        <div className="text-center text-[rgb(var(--muted-foreground))] p-4 text-sm">
          No files in workspace
        </div>
      )}
    </div>
  );
};
