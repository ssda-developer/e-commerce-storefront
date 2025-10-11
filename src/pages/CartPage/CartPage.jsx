import Cart from "@/components/Cart";
import GoBackButton from "@/components/GoBackButton";
import OrderSummary from "@/components/OrderSummary";

const CartPage = () => {
    return (
        <div className="flex flex-col py-10">
            <div className="flex md:px-8 lg:px-12 mb-6">
                <GoBackButton />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start px-4 md:px-8 lg:px-12 gap-6">
                <Cart />
                <OrderSummary />
            </div>
        </div>
    );
};

export default CartPage;
