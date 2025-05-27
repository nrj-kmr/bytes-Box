import { useRecoilValue } from "recoil";
import { editorThemeState } from "../../store/editorAtoms";
import { activeTabState } from "../../store/fileSystem";

export const WorkspaceFooter = () => {
   const activeFile = useRecoilValue(activeTabState);
   const editorTheme = useRecoilValue(editorThemeState);
   return (
      <div className="h-6 border-t border-border bg-secondary flex items-center justify-between px-3 text-xs">
         <div className="flex items-center space-x-2">
            {activeFile && (
               <span>
                  {activeFile.type === 'file' && activeFile.path
                     ? activeFile.path.replace(/^\//, '')
                     : ''}
               </span>
            )}
         </div>

         <div className="flex items-center space-x-3">
            <span>{editorTheme === 'vs-dark' ? 'Dark' : 'Light'}</span>
            {activeFile && (
               <>
                  <span className="text-muted-foreground">|</span>
                  <span>{activeFile.name.split('.').pop()?.toUpperCase() || 'TXT'}</span>
               </>
            )}
         </div>

      </div>
   );
}