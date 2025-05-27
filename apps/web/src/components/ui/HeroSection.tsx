import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import { Github } from "lucide-react";

export const HeroSection = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col items-center justify-center flex-1 p-4 relative">
         <img
            src="byteBox.png"
            alt="Logo"
            className="w-32 h-32 mb-4"
         />
         <div className="relative z-10 text-center">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
               Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-pink-700 to-red-700">BytesBox IDE</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">Your all-in-one development environment</p>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">The next-generation cloud IDE for rapid, collaborative, and delightful software development.</p>
         </div>

         <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
               size="lg"
               onClick={() => navigate('/signin')}
               variant="outline"
               className="mb-8 px-4 py-1 rounded-lg"
               title="try it out"
            >
               Get Started
            </Button>
            <Button
               size="lg"
               variant="secondary"
               className="mb-8 px-4 py-1 rounded-lg"
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