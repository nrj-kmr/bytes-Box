import { atom } from "recoil";

export type FileType = "file" | "folder";

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  children?: Record<string, FileNode | null>;
  content?: string; // For files only
  path?: string;
}

export type FileTreeNode = Record<string, FileNode | null>;

// For storing the filetree from API
export const fileTreeState = atom<FileTreeNode>({
  key: 'fileTreeState',
  default: {},
});

// Store Open tabs
export const openTabsState = atom<FileNode[]>({
  key: 'openTabsState',
  default: [],
});

// Active Tab
export const activeTabState = atom<FileNode | null>({
  key: 'activeTabState',
  default: null,
});

// To track if file is saved
export const fileIsSavedState = atom<boolean>({
  key: 'fileIsSavedState',
  default: true,
});

// Current file content from editor
export const currentCodeState = atom<string>({
  key: 'currentCodeState',
  default: '',
});

// Original file content from API
export const originalFileContentState = atom<string>({
  key: 'originalFileContentState',
  default: '',
});