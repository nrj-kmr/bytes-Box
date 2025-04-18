import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { LogIn } from "lucide-react";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* App Bar */}
            <div className="w-full h-16 bg-background flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <img src="/byteBox.png" alt="Logo" className="w-8 h-8" />
                    <span className="text-lg font-semibold">BytesBox</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button 
                        variant="default"
                        className="flex items-center gap-2 px-2"
                        onClick={() => {}}
                    >
                        <LogIn size={16} />
                        <span>Sign In</span>
                    </button>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-4">
                <img
                    src="/byteBox.png"
                    alt="Logo"
                    className="w-32 h-32 mb-4"
                />
                <h1 className="text-3xl font-bold mb-4">Welcome to BytesBox</h1>
                <p className="text-muted-foreground mb-6">Your all-in-one development environment</p>

                <button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/workspace')}
                    className="mb-8 cursor-pointer px-2 py-1 rounded-lg"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}