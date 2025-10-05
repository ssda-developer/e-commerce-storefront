import { useState } from "react";
import { BsClipboard, BsCheck2 } from "react-icons/bs";

const ClipboardButton = () => {
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <button
            onClick={copyLink}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
        >
            {copied ? (
                <>
                    <BsCheck2 className="text-lg" /> Copied
                </>
            ) : (
                <>
                    <BsClipboard className="text-lg" /> Copy Link
                </>
            )}
        </button>
    );
};

export default ClipboardButton;
