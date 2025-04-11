// Using Lucide React icons for a more modern and consistent look
// https://lucide.dev/icons/
import {
  Terminal,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Settings,
  GitBranch,
  PanelLeftClose,
  PanelLeftOpen,
  FileCode,
  Folder,
  FolderOpen,
  Languages,
  Sun,
  Moon,
  MonitorDot,
  LucideProps,
} from "lucide-react";
import React from "react";

// Re-export Lucide icons with consistent naming
export const IconTerminal = Terminal;
export const IconX = X;
export const IconChevronDown = ChevronDown;
export const IconChevronUp = ChevronUp;
export const IconSearch = Search;
export const IconSettings = Settings;
export const IconBranch = GitBranch;
export const IconLayoutSidebarLeftCollapse = PanelLeftClose;
export const IconLayoutSidebarLeftExpand = PanelLeftOpen;
export const IconFile = FileCode;
export const IconFolder = Folder;
export const IconFolderOpen = FolderOpen;
export const IconLanguages = Languages;
export const IconSun = Sun;
export const IconMoon = Moon;
export const IconMonitor = MonitorDot;

// Icon wrapper component with default sizing for consistency
export const Icon = ({ 
  icon: LucideIcon, 
  className, 
  size = 18,
  ...props 
}: { 
  icon: React.ElementType<LucideProps>,
  className?: string,
  size?: number | string
  [key: string]: any
}) => {
  return (
    <LucideIcon
      size={size}
      className={className}
      strokeWidth={1.5}
      {...props}
    />
  );
};