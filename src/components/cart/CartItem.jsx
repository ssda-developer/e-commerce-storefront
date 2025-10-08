import { useCartContext } from "../../context/CartContext.jsx";
import { BsFillTrashFill } from "react-icons/bs";
import QuantitySelector from "../buttons/QuantitySelector.jsx";

const CartItem = ({ item }) => {
    const { addItemToCart, removeItemFromCart } = useCartContext();

    const handleQuantityChange = (qty) => {
        addItemToCart(item, qty);
    };

    return (
        <div className="grid grid-cols-4 sm:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 items-center">
            <div className="col-span-4 sm:col-span-1 flex items-center gap-4">
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="bg-gray-100 w-16 h-16 object-contain rounded-md border"
                />
                <div className="min-w-0">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                </div>
            </div>

            <p className="flex text-gray-800 justify-center"><span className="block font-semibold mr-2 sm:hidden">Price:</span>${item.price.toFixed(2)}</p>
            <div className="flex justify-center">
                <QuantitySelector
                    stock={item.stock}
                    startValue={item.quantity}
                    onChange={handleQuantityChange}
                />
            </div>
            <p className="flex justify-center font-medium text-gray-800">
                <span className="block font-semibold mr-2 sm:hidden">Total:</span>
                ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
                onClick={() => removeItemFromCart(item.id)}
                className="flex justify-center text-red-500 hover:text-red-700 cursor-pointer"
            >
                <BsFillTrashFill size={18} />
            </button>
        </div>

    );
};

export default CartItem;
