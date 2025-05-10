import React from 'react';
import { FileTree } from './FileTree'
import { Icon } from './LucidIcons'
import { ChevronFirst } from 'lucide-react'

interface FileExplorerProps {
   sidebarCollapsed: boolean;
   setSidebarCollapsed: (collapsed: boolean) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {

   return (
      <div className={`${sidebarCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'} border-r border-[rgb(var(--border))] transition-all duration-200 overflow-hidden flex flex-col`}>
         <div className="p-3 font-medium text-xs tracking-tight uppercase text-[rgb(var(--muted-foreground))] flex items-center justify-between">
            <span>Explorer</span>
            <div className="flex items-center gap-2">
               <button
                  className="p-1 hover:bg-[rgb(var(--muted))] rounded-md"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
               >
                  <Icon icon={ChevronFirst} size={16} />
               </button>
            </div>
         </div>
         <div className="overflow-y-auto flex-1">
            <FileTree />
         </div>
      </div>
   )

}