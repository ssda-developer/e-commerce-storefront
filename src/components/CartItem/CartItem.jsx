import QuantitySelector from "@/components/QuantitySelector";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/utils/format-price";
import { BsFillTrashFill } from "react-icons/bs";

const CartItem = ({ item }) => {
    const { addItemToCart, removeItemFromCart } = useCartContext();

    const handleQuantityChange = (qty) => {
        addItemToCart(item, qty);
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 items-center">
            <div className="col-span-3 order-1 sm:col-span-1 flex items-center gap-4">
                <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="bg-indigo-50 w-16 h-16 object-contain rounded-md border"
                />
                <div className="min-w-0">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                </div>
            </div>

            <p className="flex col-span-4 order-3 sm:order-2 sm:col-span-1 text-gray-800 justify-center">
                <span className="block font-semibold mr-2 sm:hidden">Price:</span>
                {formatPrice(item.price)}
            </p>
            <div className="flex col-span-4 order-4 sm:order-3 sm:col-span-1 justify-center">
                <QuantitySelector
                    stock={item.stock}
                    startValue={item.quantity}
                    onChange={handleQuantityChange}
                />
            </div>
            <p className="flex col-span-4 order-4 sm:order-3 sm:col-span-1 justify-center font-medium text-gray-800">
                <span className="block font-semibold mr-2 sm:hidden">Total:</span>
                {formatPrice(item.price * item.quantity)}
            </p>
            <button
                type="button"
                onClick={() => removeItemFromCart(item.id)}
                className="flex order-2 sm:order-5 justify-center text-red-500 hover:text-red-700 cursor-pointer"
                aria-label={`Remove ${item.title} from cart`}
            >
                <BsFillTrashFill size={18} />
            </button>
        </div>
    );
};

export default CartItem;
