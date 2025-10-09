import { NavLink } from "react-router-dom";
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";
import { useCartContext } from "@/context/CartContext.jsx";
import { formatPrice } from "@/utils/formatPrice.js";

const ProductCard = ({ card }) => {
    const { addItemToCart } = useCartContext();

    const handlerAddItemToCart = (e) => {
        e.preventDefault();
        addItemToCart(card, 1, true);
    };

    const originalPrice = card?.discountPercentage
        ? (card.price / (1 - (card.discountPercentage / 100)))
        : null;

    return (
        <NavLink
            to={`/product/${card.id}`}
            end
            className="group flex flex-col p-3 bg-white border rounded-2xl h-full shadow-sm hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            aria-label={`Open product ${card.title}`}
        >
            <div className="relative border w-full h-64 overflow-hidden rounded-xl flex items-center justify-center">
                <img
                    src={card.images?.[0]}
                    alt={card.description || card.title}
                    loading="lazy"
                    className="h-full w-full object-contain bg-gray-100 duration-200 group-hover:bg-gray-300"
                />

                <button
                    type="button"
                    onClick={handlerAddItemToCart}
                    aria-label={`Add ${card.title} to cart`}
                    className="absolute bottom-3 right-3 w-12 h-12 rounded-lg duration-200 bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md hover:bg-indigo-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer lg:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                    <BsCartPlus/>
                </button>
            </div>

            <div className="flex flex-col p-4 w-full flex-1">
                <div className="mb-2 flex justify-between items-start">
                    <h3 className="text-slate-800 text-sm font-semibold group-hover:underline">{card.title}</h3>
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <BsFillStarFill className="text-yellow-400"/>
                        <p className="text-sm font-bold text-gray-900 ml-1">{card.rating ?? "—"}</p>
                    </div>
                    <div className="flex items-center text-sm font-bold text-right">
                        {originalPrice !== null && (
                            <span className="mr-1 text-gray-400 line-through text-xs">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <div className="text-base text-indigo-700">
                            {formatPrice(card.price)}
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default ProductCard;
