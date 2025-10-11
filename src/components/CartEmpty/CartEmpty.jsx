import { BsCartX } from "react-icons/bs";

const CartEmpty = () => (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <BsCartX className="text-5xl mb-3 text-gray-400" />
        <p className="text-lg font-medium">Cart is empty</p>
        <p className="text-sm text-gray-400">No products added yet</p>
    </div>
);

export default CartEmpty;
