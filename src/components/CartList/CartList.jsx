import CartItem from "@/components/CartItem";

const CartList = ({ cart }) => {
    const headers = [
        { label: "Product" },
        { label: "Price", className: "text-center" },
        { label: "Quantity", className: "text-center" },
        { label: "Total", className: "text-center" },
        { label: "Remove", className: "sr-only" }
    ];

    return (
        <>
            <div
                className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 border-b pb-2 font-semibold text-gray-700">
                {headers.map((header, index) => (
                    <span key={index} className={header.className || ""}>
                        {header.label}
                    </span>
                ))}
            </div>
            <ul>
                {cart.map((item) => (
                    <li
                        key={item.id}
                        className="py-4 border-b border-gray-300 last:border-b-0"
                    >
                        <CartItem item={item} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CartList;
