import { useCartContext } from "../../context/CartContext.jsx";
import { BsFillTrashFill } from "react-icons/bs";
import QuantitySelector from "../buttons/QuantitySelector.jsx";

const CartItem = ({ item }) => {
    const { addItemToCart, removeItemFromCart } = useCartContext();

    const handleQuantityChange = (qty) => {
        addItemToCart(item, qty);
    };

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_60px] gap-4 items-center">
            <div className="flex items-center gap-4">
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-md border"
                />
                <div className="min-w-0">
                    <h4 className="font-medium text-gray-800  max-w-[200px]">
                        {item.title}
                    </h4>
                </div>
            </div>
            <p className="text-center text-gray-800">${item.price.toFixed(2)}</p>
            <div className="flex justify-center">
                <QuantitySelector
                    stock={item.stock}
                    onChange={handleQuantityChange}
                />
            </div>
            <p className="text-center font-medium text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
                onClick={() => removeItemFromCart(item.id)}
                className="flex justify-center text-red-500 hover:text-red-700"
            >
                <BsFillTrashFill size={18} />
            </button>
        </div>
    );
};

export default CartItem;
