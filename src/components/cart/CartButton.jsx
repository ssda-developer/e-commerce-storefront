import { NavLink } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';

const CartButton = ({ count }) => {
    return (
        <NavLink
            to="/cart"
            aria-label={`Open cart${count > 0 ? ` (${count})` : ''}`}
            className="fixed right-0 top-[55px] z-[999] rounded-tl-2xl rounded-bl-2xl bg-white p-4 shadow-xl hover:shadow-2xl transition"
        >
            <div className="relative">
                <BsCart size={22} className="text-gray-800 hover:text-gray-900"/>
                {count > 0 && (
                    <span
                        className="absolute min-w-5 -top-2 -right-2 bg-red-500 text-white text-center text-xs px-1.5 py-0.5 rounded-full">
                        {count}
                    </span>
                )}
            </div>
        </NavLink>
    );
}

export default CartButton;
