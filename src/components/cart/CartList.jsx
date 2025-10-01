import React from "react";
import CartItem from "./CartItem";

function CartList({ cart }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex-1">
            <h3 className="text-lg font-semibold mb-4">Cart ({cart.length} items)</h3>
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
}

export default CartList;
