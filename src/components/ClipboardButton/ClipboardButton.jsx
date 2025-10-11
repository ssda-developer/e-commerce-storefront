import { useState } from "react";
import { BsClipboard, BsClipboardCheck, BsClipboardX } from "react-icons/bs";

const ClipboardButton = () => {
    const [status, setStatus] = useState("idle");
    const statusMap = {
        idle: { icon: <BsClipboard className="text-lg" />, text: "Copy Link" },
        copied: { icon: <BsClipboardCheck className="text-lg" />, text: "Copied" },
        error: { icon: <BsClipboardX className="text-lg" />, text: "Failed to copy" }
    };
    const { icon, text } = statusMap[status];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setStatus("copied");
            setTimeout(() => setStatus("idle"), 1500);
        } catch (error) {
            console.error("Failed to copy:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 1500);
        }
    };

    return (
        <button
            type="button"
            onClick={copyLink}
            aria-live="polite"
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition bg-gray-200 hover:bg-indigo-200 text-gray-800 cursor-pointer"
        >
            {icon} {text}
        </button>
    );
};

export default ClipboardButton;
