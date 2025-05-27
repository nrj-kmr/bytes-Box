import { Appbar } from "../components/ui/Appbar";
import { Footer } from "../components/ui/Footer";
import { HeroSection } from "../components/ui/HeroSection";

export const HomePage = () => {

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

            <HeroSection />

            <Footer />
        </div>
    );
}