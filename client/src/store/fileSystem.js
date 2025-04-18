import { atom } from "recoil";

export const fileTreeState = atom({
    key: 'fileTreeState',
    default: [
        {
          id: '1',
          name: 'root',
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

export const openTabsState = atom({
    key: 'openTabsState',
    default: [],
});

export const activeTabState = atom({
    key: 'activeTabState',
    default: null,
});