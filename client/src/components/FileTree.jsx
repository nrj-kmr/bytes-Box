import { useRecoilState, useSetRecoilState } from 'recoil';
import { fileTreeState, openTabsState, activeTabState } from '../store/fileSystem';
import { useState, useEffect } from 'react';
import { Icon } from './Icons';
import { FileCode, FileJson, FileText, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import socket from '../socket'; // Import the socket instance

// Function to determine which icon to use based on file extension
const getFileIcon = (filename) => {
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
  const [fileTree, setFileTree] = useRecoilState(fileTreeState);
  const [openTabs, setOpenTabs] = useRecoilState(openTabsState);
  const setActiveTab = useSetRecoilState(activeTabState);
  const [expandedFolders, setExpandedFolders] = useState({});

  // Fetch file tree from the server
  const fetchFileTree = async () => {
    try {
      const response = await fetch("http://localhost:9000/files");
      const result = await response.json();
      setFileTree(result.tree); // Update the Recoil state with the fetched file tree
    } catch (error) {
      console.error("Failed to fetch file tree:", error);
    }
  };

  useEffect(() => {
    // Fetch the file tree on component mount
    fetchFileTree();

    // Listen for file:refresh events from the server
    socket.on('file:refresh', fetchFileTree);

    // Cleanup the listener on component unmount
    return () => {
      socket.off('file:refresh', fetchFileTree);
    };
  }, [setFileTree]);

  const handleFileClick = (file) => {
    const alreadyOpen = openTabs.find(tab => tab.id === file.id);
    if (!alreadyOpen) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file);
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const renderTree = (nodes) => {
    return Object.keys(nodes).map((key) => {
      const node = nodes[key];
      const isFolder = node !== null;

      return (
        <div key={key} className="pl-1">
          {isFolder ? (
            <div>
              <div
                className="flex items-center py-0.5 px-1 cursor-pointer hover:bg-[rgb(var(--muted))] rounded-sm my-0.5 group"
                onClick={() => toggleFolder(key)}
              >
                <Icon 
                  icon={expandedFolders[key] ? ChevronDown : ChevronRight} 
                  size={16} 
                  className="mr-1 text-[rgb(var(--muted-foreground))]" 
                />
                <Icon 
                  icon={expandedFolders[key] ? FolderOpen : Folder} 
                  size={16} 
                  className="mr-1.5 text-[rgb(var(--accent-foreground))]" 
                />
                <span className="text-sm">{key}</span>
              </div>
              {expandedFolders[key] && (
                <div className="pl-4 border-l border-[rgb(var(--border))] ml-2">
                  {renderTree(node)}
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center py-0.5 px-1 cursor-pointer hover:bg-[rgb(var(--muted))] rounded-sm my-0.5 text-sm"
              onClick={() => handleFileClick({ id: key, name: key, path: `/${key}` })}
            >
              <Icon 
                icon={getFileIcon(key)} 
                size={16} 
                className="mr-1.5 text-[rgb(var(--muted-foreground))]" 
                strokeWidth={1.5}
              />
              {key}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-2 h-full">
      {Object.keys(fileTree).length > 0 ? (
        renderTree(fileTree)
      ) : (
        <div className="text-center text-[rgb(var(--muted-foreground))] p-4 text-sm">
          No files in workspace
        </div>
      )}
    </div>
  );
};
