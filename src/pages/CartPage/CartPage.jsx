import CartList from "@/components/CartList";
import GoBackButton from "@/components/GoBackButton";
import OrderSummary from "@/components/OrderSummary";
import { useCartContext } from "@/context/CartContext";

const CartPage = () => {
    const { cart } = useCartContext();

    return (
        <div className="flex flex-col py-10">
            <div className="flex md:px-8 lg:px-12 mb-6">
                <GoBackButton />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start px-4 md:px-8 lg:px-12 gap-6">
                <CartList cart={cart} />
                <OrderSummary />
            </div>
        </div>
    );
};

export default CartPage;
