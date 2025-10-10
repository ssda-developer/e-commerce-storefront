import CartItem from "@/components/CartItem";
import { useCartContext } from "@/context/CartContext";
import { BsCartX } from "react-icons/bs";

const CartList = ({ cart }) => {
    const { clearCart } = useCartContext();
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

            <div
                className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 border-b pb-2 font-semibold text-gray-700">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Total</span>
                <span className="sr-only">Remove</span>
            </div>

            <ul>
                {isCartEmpty
                    ? (
                        <li className="flex flex-col items-center justify-center py-10 text-gray-500">
                            <BsCartX className="text-5xl mb-3 text-gray-400" />
                            <p className="text-lg font-medium">Cart is empty</p>
                            <p className="text-sm text-gray-400">No products added yet</p>
                        </li>
                    ) : (
                        cart.map((item) => (
                            <li
                                key={item.id}
                                className="py-4 border-b border-gray-100 last:border-b-0"
                            >
                                <CartItem item={item} />
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    );
};

export default CartList;
