import { useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { VALID_DISCOUNT_CODE } from "@/constants/index.js";
import { useCartPrice } from "@/utils/useCartPrice.js";
import { formatPrice } from "@/utils/formatPrice.js";

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

    const handleApply = (e) => {
        e.preventDefault();
        const code = enteredCode.trim();

        if (!code) {
            setError("Please enter a discount code");
            return;
        }

        const ok = applyDiscount(code, VALID_DISCOUNT_CODE);

        if (ok) {
            setError('');
        } else {
            setError("Invalid discount code");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full lg:w-80 border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>

            <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
                <span>Discount</span>
                <span>{discount ? `-${formatPrice(discount)}` : "-"}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
                <span>Shipping</span>
                <span>Free</span>
            </div>

            <hr className="my-3"/>

            <div className="flex justify-between font-bold text-gray-900 mb-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
            </div>

            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    value={enteredCode}
                    disabled={isDiscountApplied}
                    onChange={(e) => {
                        setEnteredCode(e.target.value.toUpperCase());
                        setError('');
                    }}
                    placeholder="DISCOUNT10"
                    aria-label="Discount code"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "discount-error" : undefined}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm disabled:bg-green-50 disabled:text-green-700 disabled:border-green-300 disabled:cursor-not-allowed"
                />
                {!isDiscountApplied && (
                    <button
                        type="button"
                        onClick={handleApply}
                        disabled={!enteredCode.trim()}
                        className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-500 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-yellow-400 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Apply
                    </button>
                )}
            </div>

            {error && <p id="discount-error" className="text-red-500 text-sm mb-3">{error}</p>}

            <button
                type="button"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 focus:ring-2 focus:ring-gray-400 cursor-pointer"
            >
                Check out
            </button>
        </div>
    );
};

export default OrderSummary;
