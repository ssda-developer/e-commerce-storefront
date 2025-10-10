const SaleBanner = ({ promoCode }) => {
    return (
        <div
            role="note"
            className="text-center text-sm sm:text-base p-2 rounded-md bg-indigo-100 text-gray-800"
        >
            <span className="mr-1">Big Sale!</span>
            <span className="mr-1">Discount on all items!</span>
            <span className="block sm:inline mt-1 sm:mt-0">
                Use code <span className="font-semibold">{promoCode}</span> for 99% off!
            </span>
        </div>
    );
};

export default SaleBanner;
