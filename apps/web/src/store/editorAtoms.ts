import { atom } from "recoil";

// Tracks the current active file of the editor
export const editorContentState = atom<string>({
    key: "editorContentState",
    default: '// Write your code here...',
});

// Tracks currently selected language in the editor
export const editorLanguageState = atom<string>({
    key: "editorLanguageState",
    default: "javascript",
});

// Tracks the selected theme of the editor
export const editorThemeState = atom<string>({
    key: "editorThemeState",
    default: "vs-dark",
});