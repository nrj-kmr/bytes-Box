import { atom } from "recoil";

export type FileType = "file" | "folder";

export interface FileNode {
    id: string;
    name: string;
    type: FileType;
    children?: FileNode[];
    content?: string; // For files only
}

export const fileTreeState = atom<FileNode[]>({
    key: 'fileTreeState',
    default: [
        {
          id: '1',
          name: 'src',
          type: 'folder',
          children: [
            {
              id: '2',
              name: 'index.ts',
              type: 'file',
              content: '// Hello World',
            },
            {
              id: '3',
              name: 'App.tsx',
              type: 'file',
              content: '// App component',
            },
          ],
        },
      ],
});

export const openTabsState = atom<FileNode[]>({
    key: 'openTabsState',
    default: [],
});

export const activeTabState = atom<FileNode | null>({
    key: 'activeTabState',
    default: null,
});