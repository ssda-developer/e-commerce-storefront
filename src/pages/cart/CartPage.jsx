import { useCartContext } from "../../context/CartContext.jsx";
import CartList from "../../components/cart/CartList.jsx";
import OrderSummary from "../../components/cart/OrderSummary.jsx";
import { NavLink } from "react-router";
import { BsChevronLeft } from "react-icons/bs";

const CartPage = () => {
    const { cart, clearCart } = useCartContext();

    return (
        <div>
            <div className="flex">
                <NavLink to="/" end className="flex items-center">
                    <BsChevronLeft />
                    Continue shopping
                </NavLink>
                <button className="ml-170" onClick={clearCart}>Clear All</button>
            </div>
            <div className="flex gap-8">
                <CartList cart={cart}/>
                <OrderSummary cart={cart}/>
            </div>
        </div>
    );
};

export default CartPage;
