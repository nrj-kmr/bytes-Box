import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/components/button";
import { ThemeToggle } from "../ThemeToggle";
import { LogIn } from "lucide-react";

export const Appbar = () => {
   const navigate = useNavigate();

   return (
      <div className="w-full h-16 bg-background flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <img src="byteBox.png" alt="Logo" className="w-8 h-8" />
                    <span className="text-lg font-semibold">BytesBox</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-2"
                        onClick={() => navigate('/signin')}
                    >
                        <LogIn size={16} />
                        <span>Sign In</span>
                    </Button>
                </div>
            </div>
   )
}