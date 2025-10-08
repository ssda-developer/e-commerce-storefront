import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { VALID_DISCOUNT_CODE } from "../../constants/constants";

const OrderSummary = () => {
    const {
        cart,
        discountRate,
        isDiscountApplied,
        applyDiscount,
    } = useCartContext();

    const useCartPrice = (cart, discountRate = 0) => {
        const subtotal = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const discount = subtotal * (discountRate / 100);
        const total = Math.max(subtotal - discount, 0);

        return { subtotal, discount, total };
    }

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
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full lg:w-80 border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>

            <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
                <span>Discount</span>
                <span>{discount ? `-${discount.toFixed(2)}` : "-"}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
                <span>Shipping</span>
                <span>Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-gray-900 mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    value={enteredCode}
                    disabled={isDiscountApplied}
                    onChange={(e) => {
                        setEnteredCode(e.target.value);
                        setError('');
                    }}
                    placeholder="DISCOUNT10"
                    className="flex-1 border rounded-lg px-3 py-2 text-sm disabled:bg-green-50 disabled:text-green-700 disabled:border-green-300 disabled:cursor-not-allowed"
                />
                {!isDiscountApplied && (
                    <button
                        onClick={handleApply}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                    >
                        Apply
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 focus:ring-2 focus:ring-gray-400 cursor-pointer">
                Check out
            </button>
        </div>
    );
};

export default OrderSummary;
