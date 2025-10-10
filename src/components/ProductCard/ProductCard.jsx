import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/utils/format-price";
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { addItemToCart } = useCartContext();

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        addItemToCart(product, 1, true);
    };

    const originalPrice = product?.discountPercentage
        ? (product.price / (1 - (product.discountPercentage / 100)))
        : null;

    return (
        <NavLink
            to={`/product/${product.id}`}
            className="group flex flex-col p-3 bg-white border rounded-2xl h-full shadow-sm hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            aria-label={`Open product ${product.title}`}
        >
            <div className="relative border w-full h-64 overflow-hidden rounded-xl flex items-center justify-center">
                <img
                    src={product.images?.[0]}
                    alt={product.description || product.title}
                    loading="lazy"
                    className="h-full w-full object-contain bg-indigo-50 duration-200 group-hover:bg-indigo-200"
                />

                <button
                    type="button"
                    onClick={handleAddItemToCart}
                    aria-label={`Add ${product.title} to cart`}
                    className="absolute bottom-3 right-3 w-12 h-12 rounded-lg duration-200 bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md hover:bg-indigo-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer lg:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                    <BsCartPlus />
                </button>
            </div>

            <div className="flex flex-col p-4 w-full flex-1">
                <div className="mb-2 flex justify-between items-start">
                    <h3 className="text-slate-800 text-sm font-semibold group-hover:underline">{product.title}</h3>
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <BsFillStarFill className="text-yellow-400" />
                        <p className="text-sm font-bold text-gray-900 ml-1">{product.rating ?? "—"}</p>
                    </div>
                    <div className="flex items-center text-sm font-bold text-right">
                        {originalPrice !== null && (
                            <span className="mr-1 text-gray-400 line-through text-xs">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <div className="text-base text-indigo-700">
                            {formatPrice(product.price)}
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default ProductCard;
