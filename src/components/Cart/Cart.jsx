import CartEmpty from "@/components/CartEmpty";
import CartList from "@/components/CartList";
import { useCartContext } from "@/context/CartContext";

const Cart = () => {
    const { cart, clearCart } = useCartContext();
    const isCartEmpty = cart.length === 0;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex-1 border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Cart ({cart.length} items)
                </h3>
                {!isCartEmpty && (
                    <button
                        type="button"
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200 cursor-pointer focus:ring-2 focus:ring-red-300 rounded"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {isCartEmpty ? <CartEmpty /> : <CartList cart={cart} />}
        </div>
    );
};

export default Cart;
