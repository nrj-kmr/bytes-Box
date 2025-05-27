import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Files, Palette, LogIn, UserCircle2 } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { FileExplorer } from "./FileExplorer";
import { useRecoilState } from "recoil";
import { editorThemeState } from "../../store/editorAtoms";
import {
   Icon
} from "../ui/LucidIcons";

export const ActivityBar = () => {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [editorTheme, setEditorTheme] = useRecoilState(editorThemeState)
   const navigate = useNavigate();

   const userId = localStorage.getItem('user-id');

   return (
      <div className={`flex h-screen bg-background text-foreground overflow-hidden`}>
         <div className="w-11 bg-secondary h-full flex flex-col items-center py-2 gap-1 border-r border-border">

            <div className="py-3 flex flex-col items-center">
               <div onClick={() => navigate('/')}
                  className="w-7 h-7 rounded-md mb-4 cursor-pointer">
                  <img src="byteBox.png" alt="Logo" />
               </div>
            </div>

            <button
               onClick={() => setSidebarCollapsed(prev => !prev)}
               className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-md text-foreground mb-2 relative active:translate-y-[1px] transition-all cursor-pointer">
               <Icon icon={Files} size={24} />
               <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-foreground rounded-r-md"></div>
            </button>

            <div className="flex-1"></div>

            {userId ? (
               <button
                  onClick={() => {
                     localStorage.removeItem('user-id')
                     navigate('/signin')
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-md text-muted-foreground hover:text-foreground active:translate-y-[1px] transition-all cursor-pointer"
                  title="Logout"
                  >
                  <Icon icon={UserCircle2} size={24} />
               </button>
            ) : (
               <button
                  onClick={() => {
                     localStorage.removeItem('user-id')
                     navigate('/signin')
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-md text-muted-foreground hover:text-foreground active:translate-y-[1px] transition-all cursor-pointer"
                  title="Login"
               >
                  <Icon icon={LogIn} size={24} />
               </button>
            )}

            <div className="text-muted-foreground hover:text-foreground m-2 cursor-pointer">
               <ThemeToggle />
            </div>

            <button
               onClick={() => editorTheme === "vs-dark" ? setEditorTheme('vs-light') : setEditorTheme('vs-dark')}
               className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md text-muted-foreground hover:text-foreground active:translate-y-[1px] transition-all mb-2 cursor-pointer"
               title="Change Code Editor Theme"
            >
               <Palette size={24} />
            </button>
         </div>

         <FileExplorer
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
         />
      </div>
   );
}