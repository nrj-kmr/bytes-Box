import { useRecoilState, useSetRecoilState } from 'recoil';
import { fileTreeState, openTabsState, activeTabState, FileTreeNode } from '../../store/fileSystem';
import { useState, useEffect } from 'react';
import { Icon } from './LucidIcons';
import { FileCode, FileJson, FileText, Folder, FolderOpen, ChevronRight, ChevronDown, LucideIcon } from 'lucide-react';
import socket from '../../socket';

interface FileObject {
  id: string;
  name: string;
  path: string;
}

// Function to determine which icon to use based on file extension
const getFileIcon = (filename: string): LucideIcon => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';

  if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
    return FileCode;
  } else if (['json'].includes(extension || '')) {
    return FileJson;
  } else {
    return FileText;
  }
};

// Function to generate proper path for files based on their location in tree
const generateFilePath = (parentPath: string, fileName: string): string => {
  return parentPath === '/' ? `/${fileName}` : `${parentPath}/${fileName}`;
};

export const FileTree: React.FC = () => {
  const [fileTree, setFileTree] = useRecoilState(fileTreeState);
  const [openTabs, setOpenTabs] = useRecoilState(openTabsState);
  const setActiveTab = useSetRecoilState(activeTabState);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFileTree = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("http://localhost:4000/files");

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const result: { tree: FileTreeNode } = await response.json();

      if (!result.tree) {
        throw new Error("Invalid response format: missing tree data");
      }

      setFileTree(result.tree);
    } catch (error) {
      console.error("Failed to fetch file tree:", error);
      setError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFileTree();
    socket.on('file:refresh', fetchFileTree);

    return () => {
      socket.off('file:refresh', fetchFileTree);
    };
  }, [fetchFileTree]);

  const handleFileClick = (file: FileObject): void => {
    if (!file.id || !file.name) return;

    const alreadyOpen = openTabs.find(tab => tab.id === file.id);
    if (!alreadyOpen) {
      setOpenTabs([...openTabs, { ...file, type: 'file' }]);
    }
    setActiveTab({ ...file, type: 'file' });
  };

  const toggleFolder = (folderId: string): void => {
    if (!folderId) return;

    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const renderTree = (nodes: FileTreeNode, parentPath: string = '/'): JSX.Element[] => {
    if (!nodes || typeof nodes !== 'object') return [];

    return Object.keys(nodes).map((key) => {
      const node = nodes[key];
      const isFolder = node !== null;
      const currentPath = generateFilePath(parentPath, key);

      return (
        <div key={currentPath} className="pl-1">
          {isFolder ? (
            <div>
              <div
                className="flex items-center py-0.5 px-1 cursor-pointer hover:bg-muted rounded-sm my-0.5 group"
                onClick={() => toggleFolder(currentPath)}
              >
                <Icon
                  icon={expandedFolders[currentPath] ? ChevronDown : ChevronRight}
                  size={16}
                  className="mr-1 text-muted-foreground"
                />
                <Icon
                  icon={expandedFolders[currentPath] ? FolderOpen : Folder}
                  size={16}
                  className="mr-1.5 text-accent-foreground"
                />
                <span className="text-sm">{key}</span>
              </div>
              {expandedFolders[currentPath] && node?.children && (
                <div className="pl-4 border-l border-border ml-2">
                  {renderTree(node.children, currentPath)}
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center py-0.5 px-1 cursor-pointer hover:bg-muted rounded-sm my-0.5 text-sm"
              onClick={() => handleFileClick({ id: currentPath, name: key, path: currentPath })}
            >
              <Icon
                icon={getFileIcon(key)}
                size={16}
                className="mr-1.5 text-muted-foreground"
                strokeWidth={1.5}
              />
              {key}
            </div>
          )}
        </div>
      );
    });
  };

  if (isLoading && Object.keys(fileTree).length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-muted-foreground text-sm">Loading files...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 text-red-500 text-sm">
        Error loading files: {error}
      </div>
    );
  }

  return (
    <div className="p-2 h-full overflow-auto">
      {Object.keys(fileTree).length > 0 ? (
        renderTree(fileTree)
      ) : (
        <div className="text-center text-muted-foreground p-4 text-sm">
          No files in workspace
        </div>
      )}
    </div>
  );
};
