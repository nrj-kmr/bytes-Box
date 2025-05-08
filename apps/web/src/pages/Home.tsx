import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import { Appbar } from "../components/ui/Appbar";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* App Bar */}
            <Appbar/>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-4">
                <img
                    src="byteBox.png"
                    alt="Logo"
                    className="w-32 h-32 mb-4"
                />
                <h1 className="text-3xl font-bold mb-4">Welcome to BytesBox</h1>
                <p className="text-muted-foreground mb-6">Your all-in-one development environment</p>

                <Button
                    size="lg"
                    onClick={() => navigate('/workspace')}
                    className="mb-8 cursor-pointer px-2 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black"
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
}