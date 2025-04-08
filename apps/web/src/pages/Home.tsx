import CodeEditor from "../components/Editor/Editor";
import TerminalComponent from "../components/Terminal/Terminal";

export default function HomePage() {
    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            <div className="flex-1">
                <CodeEditor />
            </div>
            <div className="h-64">
                <TerminalComponent />
            </div>
        </div>
    );
}