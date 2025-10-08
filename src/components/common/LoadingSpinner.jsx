import { BsArrowRepeat } from "react-icons/bs";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <BsArrowRepeat className="text-5xl mb-3 animate-spin opacity-70" />
            <span className="text-lg font-medium animate-pulse">Loading...</span>
        </div>
    );
}
