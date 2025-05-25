import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import { Appbar } from "../components/ui/Appbar";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen text-foreground relative">
            {/* App Bar */}
            <Appbar />

            {/* Background Grid */}
            <div
                className="pointer-events-none absolute inset-0 h-full w-full bg-gray-200 dark:bg-gray-900 z-0"
                aria-hidden="true"
            >
                <div
                    className="
                    absolute inset-0
                    bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
                    bg-[size:20px_18px]
                    [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]
                    dark:bg-[linear-gradient(to_right,#3e3e3e33_1px,transparent_1px),linear-gradient(to_bottom,#3e3e3e33_1px,transparent_1px)]
                "
                ></div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-4 relative">
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
                    className="mb-8 cursor-pointer px-4 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black"
                >
                    Get Started
                </Button>
            </div>

            {/* Footer */}
            <div className="bottom-0 relative bg-gray-300 dark:bg-slate-800 py-1.5">
                <p className="w-full text-center text-xs text-foreground">All rights reserved, Copyright &copy; 2025 - BytesBox (nrjkmr)</p>
            </div>
        </div>
    );
}