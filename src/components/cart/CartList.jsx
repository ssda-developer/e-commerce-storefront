import React from "react";
import CartItem from "./CartItem";
import { useCartContext } from "../../context/CartContext.jsx";

function CartList({ cart }) {
    const { clearCart } = useCartContext();

    return (
        <div className="bg-white rounded-lg shadow p-6 flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                    Cart ({cart.length} items)
                </h3>
                <button onClick={clearCart}>Clear All</button>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_60px] gap-4 border-b border-gray-300 pb-2 font-semibold text-gray-700">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Total price</span>
                <span className="text-center sr-only">Remove</span>
            </div>

            <ul>
                {cart.map((item, idx) => (
                    <li key={`${item.id}${idx}`} className="py-4 border-b border-gray-100 last:border-b-0">
                        <CartItem item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CartList;
