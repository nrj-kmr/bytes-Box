import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeTabState, currentCodeState, originalFileContentState, fileIsSavedState } from '../../store/fileSystem';
import { fetchFileContent, saveFileContent } from '../../services/fileService';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

export const CodeEditor = () => {
  const activeFile = useRecoilValue(activeTabState);
  const [code, setCode] = useRecoilState(currentCodeState);
  const [originalContent, setOriginalContent] = useRecoilState(originalFileContentState);
  const [isSaved, setIsSaved] = useRecoilState(fileIsSavedState);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  
  // Load file content when active file changes
  useEffect(() => {
    const loadFileContent = async () => {
      if (activeFile?.path) {
        const content = await fetchFileContent(activeFile.path);
        setOriginalContent(content);
        setCode(content);
      }
    };
    
    loadFileContent();
  }, [activeFile, setOriginalContent, setCode]);
  
  // Update isSaved state when code changes
  useEffect(() => {
    setIsSaved(code === originalContent);
  }, [code, originalContent, setIsSaved]);
  
  // Auto-save functionality with debounce
  useEffect(() => {
    if (activeFile?.path && code && !isSaved) {
      const filePath = activeFile.path;
      const timer = setTimeout(() => {
        saveFileContent(filePath, code);
        setOriginalContent(code);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, activeFile, isSaved, setOriginalContent]);
  
  // Determine language for Monaco
  const getLanguage = () => {
    if (!activeFile) return 'plaintext';
    
    const extension = activeFile.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'typescript';
      case 'json':
        return 'json';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      default:
        return 'plaintext';
    }
  };
  
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, _monaco: Monaco) => {
    editorRef.current = editor;
    
    // Set up editor options if needed
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      tabSize: 2,
      wordWrap: 'on'
    });
    
    editor.focus();
  };
  
  if (!activeFile) {
    return <div>No file selected</div>;
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-[rgb(var(--border))]">
        <div className="text-sm flex items-center">
          {activeFile.name}
          {!isSaved && <span className="ml-2 text-[rgb(var(--warning))]">•</span>}
        </div>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguage()}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark" // Use 'vs-dark' for dark theme or 'vs-light' for light theme
          options={{
            automaticLayout: true, // Important for resizing
            scrollBeyondLastLine: false,
            minimap: { enabled: true },
            fontSize: 14,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};