import { NavLink } from 'react-router';
import { BsCart } from 'react-icons/bs';

function CartButton({ count }) {
    return (
        <NavLink to="/cart"
                 className="flex fixed right-0 top-[80px] z-[999] cursor-pointer rounded-tl-2xl p-4 rounded-bl-2xl bg-white shadow-xl/20">
            <BsCart size={22} className="text-gray-800 hover:text-gray-900"/>
            {count > 0 && (
                <span
                    className="absolute -top-[-8px] -right-[-2px] bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{count}</span>
            )}
        </NavLink>
    );
}

export default CartButton;
