import { useCartContext } from "../../context/CartContext.jsx";
import { BsFillTrashFill } from "react-icons/bs";

const CartItem = ({ item }) => {
    const { increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } = useCartContext();

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
                <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-contain rounded-md"/>
                <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">rating: {item.rating}</p>
                </div>
            </div>
            <p className="w-20 text-gray-800">${item.price.toFixed(2)}</p>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => decreaseItemQuantity(item.id)}
                        className="px-2 py-1 border rounded cursor-pointer"
                    >
                        −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={() => increaseItemQuantity(item.id)}
                        className="px-2 py-1 border rounded cursor-pointer"
                    >
                        +
                    </button>
                </div>
                <p className="text-sm text-gray-500">available: {item.stock}</p>
            </div>
            <p className="w-24 text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeItemFromCart(item.id)} className="text-red-500 cursor-pointer">
                <BsFillTrashFill/>
            </button>
        </div>
    );
}

export default CartItem;
