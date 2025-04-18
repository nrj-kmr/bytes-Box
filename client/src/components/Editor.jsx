import Editor from "@monaco-editor/react"
import { useRecoilState } from "recoil";
import { editorContentState, editorLanguageState, editorThemeState } from "../store/editorAtoms";

export const CodeEditor = () => {
    const [code, setCode] = useRecoilState(editorContentState);
    const [language] = useRecoilState(editorLanguageState);
    const [theme] = useRecoilState(editorThemeState);

    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                width="100%"
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontLigatures: true,
                    tabSize: 2,
                    lineNumbers: "on",
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    renderLineHighlight: "all",
                    minimap: { 
                        enabled: true,
                        maxColumn: 80,
                        scale: 0.8,
                        showSlider: "mouseover"
                    },
                    scrollbar: {
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                        alwaysConsumeMouseWheel: false
                    },
                    padding: {
                        top: 12,
                        bottom: 12
                    },
                }}
                className="editor-container"
            />
        </div>
    );
}