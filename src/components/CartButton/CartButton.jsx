import { ROUTES } from "@/constants";
import { useCartContext } from "@/context/CartContext";
import { BsCart } from "react-icons/bs";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const CartButton = () => {
    const { cart } = useCartContext();
    const location = useLocation();

    const isHidden = !!matchPath({ path: ROUTES.CART, end: false }, location.pathname);

    const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);

    if (isHidden) return null;

    return (
        <NavLink
            to={ROUTES.CART}
            aria-label={`Open cart${count > 0 ? ` (${count})` : ""}`}
            className="fixed right-0 top-[90px] z-[999] rounded-tl-2xl rounded-bl-2xl bg-white p-4 shadow-xl hover:shadow-2xl transition"
        >
            <div className="relative">
                <BsCart size={22} className="text-gray-800 hover:text-gray-900" />
                {count > 0 && (
                    <span
                        className="absolute min-w-5 -top-2 -right-2 bg-red-500 text-white text-center text-xs px-1.5 py-0.5 rounded-full">
                        {count}
                    </span>
                )}
            </div>
        </NavLink>
    );
};

export default CartButton;
