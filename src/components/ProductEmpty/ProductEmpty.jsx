import { BsBoxSeam } from "react-icons/bs";

const ProductEmpty = ({ title, message, showButton = false, buttonText, onButtonClick }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500 animate-fade-in">
            <BsBoxSeam className="text-6xl mb-4 opacity-70" />
            <p className="text-lg font-medium mb-2">{title}</p>
            <p className="text-sm mb-6">{message}</p>

            {showButton && (
                <button
                    onClick={onButtonClick}
                    className="py-2 px-4 rounded-lg transition bg-gray-200 hover:bg-indigo-200 text-gray-800 cursor-pointer"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default ProductEmpty;
