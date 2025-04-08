import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <img
                src="byteBox.png"
                alt="Logo"
                className="w-32 h-32 mb-4"
            />
            <h1>Welcome to the Home Page</h1>
            <p>This is the main content of the home page.</p>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => navigate('/workspace')}
            >
                Get Started
            </button>
        </div>
    );
}