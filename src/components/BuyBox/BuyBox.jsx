import { formatPrice } from "@/utils/format-price";
import { useState } from "react";

const BuyBox = ({
                    price,
                    discountPercentage,
                    availabilityStatus,
                    stock,
                    shippingInformation,
                    returnPolicy,
                    warrantyInformation,
                    onAdd,
                    onBuyNow
                }) => {
    const [added, setAdded] = useState(false);

    const handleAddClick = () => {
        onAdd();
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const handleBuyNowClick = () => {
        onBuyNow();
    };

    return (
        <>
            {discountPercentage ? <span className="text-sm text-red-500 font-bold uppercase">Sale</span> : null}
            <span className="text-sm text-green-600 font-semibold">{availabilityStatus}</span>
            <div className="text-2xl font-bold my-2">
                {formatPrice(price)}
                {discountPercentage ? (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                        {formatPrice(price / (1 - (discountPercentage / 100)))}
                    </span>
                ) : null}
            </div>

            <span className="text-gray-500 text-sm">
                <span className="font-bold mr-1">Available:</span>{stock}
            </span>

            <div className="flex flex-col gap-3 my-4">
                <button
                    className={`w-full font-semibold py-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 ${added ? "bg-yellow-200" : "bg-yellow-400 hover:bg-yellow-500"} text-black`}
                    onClick={handleAddClick}
                    type="button"
                    disabled={added}
                    aria-live="polite"
                    aria-label={added ? "Product added to cart" : "Add to cart"}
                >
                    {added ? "Product added to cart" : "Add to cart"}
                </button>
                <button
                    className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                    onClick={handleBuyNowClick}
                    type="button"
                >
                    Buy now
                </button>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-bold mr-1">Shipping:</span>{shippingInformation}</p>
                <p><span className="font-bold mr-1">Return Policy:</span>{returnPolicy}</p>
                <p><span className="font-bold mr-1">Warranty:</span>{warrantyInformation}</p>
            </div>
        </>
    );
};

export default BuyBox;
