import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import { Github, Terminal } from "lucide-react";
import { Icon } from "./LucidIcons";

export const HeroSection = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col items-center justify-center flex-1 p-4 relative">
         <div className="relative z-10 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center md:gap-10">
               <Icon icon={Terminal} size={100} />
               <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-6 drop-shadow-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-indigo-700 to-violet-700">Bytes' Boxes</span> <br />
                  <span className="text-2xl md:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-700 via-indigo-700 to-teal-700">
                     Zero Setup <br />
                     Just Code.
                  </span>
               </h1>
            </div>
            <p className="text-3xl md:text-4xl lg:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-700 via-yellow-500 to-red-700 mb-2">Built to Build.</p>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">The next-generation cloud IDE <br /> for rapid, collaborative, and delightful <br /> software development.</p>
         </div>

         <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
               size="lg"
               onClick={() => navigate('/signin')}
               variant="outline"
               className="md:mb-8 px-4 py-1 rounded-lg"
               title="try it out"
            >
               Get Started
            </Button>
            <Button
               size="lg"
               variant="secondary"
               className="md:mb-8 px-4 py-1 rounded-lg"
               title="Setup Locally"
            >
               <div className="flex items-center gap-2">
                  <Github size={18} />
                  <a
                     href="https://github.com/nrj-kmr/bytes-box"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     GitHub
                  </a>
               </div>
            </Button>
         </div>
      </div>
   );
};