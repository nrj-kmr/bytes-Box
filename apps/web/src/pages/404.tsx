import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import { Telescope } from "lucide-react";
import { Footer } from "../components/ui/Footer";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen text-foreground relative">
            <div
                className="pointer-events-none absolute inset-0 h-full w-full bg-gray-200 dark:bg-gray-900 z-0"
                aria-hidden="true"
            >
                <div
                    className="
                    absolute inset-0
                    bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
                    bg-[size:20px_28px]
                    [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]
                    dark:bg-[linear-gradient(to_right,#3e3e3e33_1px,transparent_1px),linear-gradient(to_bottom,#3e3e3e33_1px,transparent_1px)]"
                ></div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 p-4 relative">
                <Telescope size={80} />
                <div className="flex flex-col items-center mt-6">
                    <h1 className="text-3xl font-bold">404</h1>
                    <h1 className="text-3xl font-bold mb-4">Uh Oh!</h1>
                    <p className="text-muted-foreground">Looks like you're lost</p>
                    <p className="text-muted-foreground mb-6">This is not something you were looking for!</p>
                </div>

                <Button
                    size="lg"
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="mb-8 cursor-pointer px-4 py-1 rounded-lg"
                >
                    Go Home
                </Button>
            </div>

            <Footer/>
        </div>
    );
};