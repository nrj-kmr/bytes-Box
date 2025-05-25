import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import { ThemeToggle } from "../ThemeToggle";
import { CircleUserRound, LogIn } from "lucide-react";
import { Icon } from "./LucidIcons";

export const Appbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user-id')

    return (
        <div className="w-full h-16 flex items-center justify-between px-6 z-10">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
                <img src="byteBox.png" alt="Logo" className="w-8 h-8" />
                <span className="text-lg font-semibold">BytesBox</span>
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                {userId ? (
                    <span className="flex items-center" title={userId}>

                        <Icon icon={CircleUserRound} size={24} />
                        <Button
                            onClick={() => {
                                localStorage.removeItem('user-id')
                                navigate('/signin')
                            }}

                            className="cursor-pointer"
                        >Logout</Button>
                    </span>
                ) : (
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-2 cursor-pointer"
                        onClick={() => navigate('/signin')}
                    >
                        <LogIn size={16} />
                        <span>Sign In</span>
                    </Button>
                )}
            </div>
        </div >
    )
}