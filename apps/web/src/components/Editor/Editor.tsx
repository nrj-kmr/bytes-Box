
import Editor from "@monaco-editor/react"
import { useRecoilState } from "recoil";
import { editorContentState, editorLanguageState, editorThemeState } from "../../store/editorAtoms";

export const CodeEditor = () => {
    const [code, setCode] = useRecoilState(editorContentState);
    const [language] = useRecoilState(editorLanguageState);
    const [theme] = useRecoilState(editorThemeState);

    return (
        <div>
            <Editor
                height="75vh"
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                    fontSize: 15,
                    tabSize: 2,
                    lineNumbers: "on",
                    wordWrap: "on",
                    minimap: { enabled: false },
                }}
            />
        </div>
    );
}