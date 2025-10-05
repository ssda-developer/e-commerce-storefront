import { useCartContext } from "../../context/CartContext.jsx";
import CartList from "../../components/cart/CartList.jsx";
import OrderSummary from "../../components/cart/OrderSummary.jsx";
import { NavLink } from "react-router";
import { BsChevronLeft } from "react-icons/bs";
import GoBackButton from "../../components/buttons/GoBackButton.jsx";

const CartPage = () => {
    const { cart } = useCartContext();

    return (
        <div>
            <div className="flex">
                <div className="flex justify-between mb-6">
                    <GoBackButton/>
                </div>
            </div>
            <div className="flex gap-8">
                <CartList cart={cart}/>
                <OrderSummary cart={cart}/>
            </div>
        </div>
    );
};

export default CartPage;
