import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useCartPrice } from "../../hooks/useCartPrice";
import { VALID_DISCOUNT_CODE } from "../../constants/constants";

const OrderSummary = () => {
    const {
        cart,
        discountRate,
        isDiscountApplied,
        applyDiscount,
    } = useCartContext();

    const { subtotal, discount, total } = useCartPrice(cart, discountRate);

    const [enteredCode, setEnteredCode] = useState('');
    const [error, setError] = useState('');

    const handleApply = () => {
        const ok = applyDiscount(enteredCode, VALID_DISCOUNT_CODE);
        if (ok) {
            setError('');
        } else {
            setError("Invalid discount code");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 w-80 h-full">
            <h3 className="text-lg font-semibold mb-4">Order summary</h3>

            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span>-{discount ? discount.toFixed(2) : ""}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
            </div>

            <hr className="my-2"/>

            <div className="flex justify-between font-bold text-blue-600 mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={enteredCode}
                    disabled={isDiscountApplied}
                    onChange={(e) => {
                        setEnteredCode(e.target.value);
                        setError('');
                    }}
                    placeholder="DISCOUNT10"
                    className="flex-1 border rounded px-2 py-1 disabled:bg-gray-200 disabled:border-green-300 disabled:text-green-500 disabled:cursor-not-allowed"
                />
                {!isDiscountApplied && (
                    <button
                        className="bg-green-500 text-white px-4 rounded"
                        onClick={handleApply}
                    >
                        Apply
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button className="w-full bg-black text-white py-2 rounded">
                Check out
            </button>
        </div>
    );
};

export default OrderSummary;
