import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { fileTreeState, openTabsState, activeTabState, FileTreeNode, activeFileState } from '../../store/fileSystem';
import { Icon } from './LucidIcons';
import { ChevronFirst, FilePlus, FolderPlus, FileCode, FileJson, FileText, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import socket from '../../socket';

interface FileExplorerProps {
   sidebarCollapsed: boolean;
   setSidebarCollapsed: (collapsed: boolean) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
   const [fileTree, setFileTree] = useRecoilState(fileTreeState);
   const [openTabs, setOpenTabs] = useRecoilState(openTabsState);
   const setActiveTab = useSetRecoilState(activeTabState);
   const [activeFile, setActiveFile] = useRecoilState(activeFileState);
   const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
   const [isCreating, setIsCreating] = useState(false);
   const [isFolder, setIsFolder] = useState(false);
   const [newItemName, setNewItemName] = useState('');
   const [currentFolderPath, setCurrentFolderPath] = useState<string>('/');
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   // Fetch the file tree from the server
   const fetchFileTree = async (): Promise<void> => {
      try {
         setIsLoading(true);
         setError(null);
         const response = await fetch('http://localhost:4000/files');

         if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
         }

         const result: { tree: FileTreeNode } = await response.json();

         if (!result.tree) {
            throw new Error('Invalid response format: missing tree data');
         }
         setFileTree(result.tree);
      } catch (error) {
         console.error('Failed to fetch file tree:', error);
         setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchFileTree();
      socket.on('file:refresh', fetchFileTree);
      return () => {
         socket.off('file:refresh', fetchFileTree);
      };
   }, []);

   // Handle file click
   const handleFileClick = (file: { id: string; name: string; path: string }): void => {
      setIsCreating(false)
      const alreadyOpen = openTabs.find((tab) => tab.id === file.id);
      if (!alreadyOpen) {
         setOpenTabs([...openTabs, { ...file, type: 'file' }]);
      }
      setActiveTab({ ...file, type: 'file' });
      setActiveFile({ ...file, type: 'file' });

      const parentPath = file.path.substring(0, file.path.lastIndexOf('/')) || '/';
      setCurrentFolderPath(parentPath);
   };

   // Toggle folder expansion
   const toggleFolder = (folderId: string, folderName: string): void => {
      setIsCreating(false)
      setExpandedFolders((prev) => ({
         ...prev,
         [folderId]: !prev[folderId],
      }));
      setActiveFile({ id: folderId, name: folderName, type: 'folder', path: folderId });
   };

   const handleFolderClick = (folderId: string): void => {
      setIsCreating(false)
      setCurrentFolderPath(folderId);
   };

   const handleCreateItem = async () => {
      if (!newItemName.trim()) return;

      try {
         const response = await fetch('http://localhost:4000/files/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: newItemName,
               type: isFolder ? 'folder' : 'file',
               parentPath: currentFolderPath,
            }),
         });

         if (!response.ok) {
            throw new Error('Failed to create item');
         }

         // Refresh the file tree to reflect the new item
         await fetchFileTree();
      } catch (error) {
         console.error(error);
      } finally {
         setIsCreating(false);
         setNewItemName('');
         setIsFolder(false);
      }
   };

   const inputRef = useRef<HTMLInputElement>(null);
   useEffect(() => {
      if (isCreating && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isCreating]);

   const renderInputField = (): JSX.Element => (
      <div className='px-5'>
         <div className="flex items-center gap-2 mt-2">
            <input
               ref={inputRef}
               type="text"
               value={newItemName}
               onChange={(e) => setNewItemName(e.target.value)}
               placeholder={`Enter ${isFolder ? 'folder' : 'file'} name`}
               className="flex-1 p-1 border rounded text-sm"
               onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateItem();
               }}
            />
         </div>
      </div>
   );

   // Render the file tree
   const renderTree = (nodes: FileTreeNode, parentPath: string = '/'): JSX.Element[] => {
      if (!nodes || typeof nodes !== 'object') return [];

      return Object.keys(nodes).map((key) => {
         const node = nodes[key];
         const isFolder = node !== null;
         const currentPath = parentPath === '/' ? `/${key}` : `${parentPath}/${key}`;
         const isActive = activeFile?.path === currentPath;

         return (
            <div key={currentPath} className="px-4">
               {isFolder ? (
                  <div>
                     {/* Folder */}
                     <div
                        className={`flex items-center py-0.5 px-1 cursor-pointer hover:bg-muted rounded-sm my-1 group ${isActive ? 'bg-accent' : ''
                           }`}
                        onClick={() => {
                           handleFolderClick(currentPath)
                           toggleFolder(currentPath, key);
                        }}
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
                     {/* Render children if folder is expanded */}
                     {expandedFolders[currentPath] && node?.children && (
                        <div className="pl-4 border-l border-border ml-2">
                           {renderTree(node.children || {}, currentPath)}
                           {isCreating && currentFolderPath === currentPath && renderInputField()}
                        </div>
                     )}
                  </div>
               ) : (
                  <div
                     className={`flex items-center py-0.5 px-1 cursor-pointer hover:bg-muted rounded-sm my-1 text-sm ${isActive ? 'bg-accent' : ''
                        }`}
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

   const getFileIcon = (filename: string) => {
      const extension = filename.split('.').pop()?.toLowerCase() || '';

      if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
         return FileCode;
      } else if (['json'].includes(extension)) {
         return FileJson;
      } else {
         return FileText;
      }
   };

   return (
      <div
         className={`${sidebarCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'
            } border-r border-border transition-all duration-200 overflow-hidden flex flex-col`}
      >
         <div className="p-3 font-medium text-xs tracking-tight uppercase text-muted-foreground flex items-center justify-between">
            <span>Explorer</span>
            <div className='flex'>
               <div className="flex items-center">
                  <button
                     onClick={() => {
                        setIsCreating(true);
                        setIsFolder(false);
                        setNewItemName('')
                        setExpandedFolders((prev) => ({ ...prev, [currentFolderPath]: true }));
                     }}
                     className="flex hover:bg-muted rounded-md text-sm p-1"
                  >
                     <Icon icon={FilePlus} size={18} />
                  </button>
                  <button
                     onClick={() => {
                        setIsCreating(true);
                        setIsFolder(true);
                        setNewItemName('')
                        setExpandedFolders((prev) => ({ ...prev, [currentFolderPath]: true }));
                     }}
                     className="flex items-end gap-1 hover:bg-muted rounded-md text-sm p-1"
                  >
                     <Icon icon={FolderPlus} size={18} />
                  </button>
               </div>
               <button
                  className="p-1 hover:bg-muted rounded-md"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
               >
                  <Icon icon={ChevronFirst} size={16} />
               </button>
            </div>
         </div>

         {isCreating && currentFolderPath === '/' && renderInputField()}

         <div className="overflow-y-auto flex-1">
            {isLoading ? (
               <div className="text-center text-muted-foreground p-4 text-sm">Loading...</div>
            ) : error ? (
               <div className="text-center text-red-500 p-4 text-sm">{error}</div>
            ) : (
               renderTree(fileTree)
            )}
         </div>
      </div>
   );
};