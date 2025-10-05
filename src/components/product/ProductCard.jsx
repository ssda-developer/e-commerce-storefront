import { useCartContext } from "../../context/CartContext.jsx";
import { NavLink } from "react-router";
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";

const ProductCard = ({ card }) => {
    const { addItemToCart } = useCartContext();

    const handlerAddItemToCart = (e) => {
        e.preventDefault();
        addItemToCart(card);
    }

    return (
        <NavLink
            to={`/product/${card.id}`}
            end
            className="group flex flex-col p-3 items-center bg-white shadow-sm border border-slate-200 rounded-2xl h-full"
        >
            <div className="flex relative w-[268px] h-[268px] overflow-hidden rounded-xl bg-clip-border">
                <img
                    src={card.images[0]}
                    alt={card.description}
                    className="h-full w-full object-contain rounded-md bg-gray-100 group-hover:bg-gray-200 group-focus-within:bg-gray-200 transition-all duration-200 ease-out"
                />
                <button
                    type="button"
                    className="absolute bottom-2 right-2 rounded-lg w-[48px] h-[48px] bg-orange-400 flex items-center justify-center text-xl cursor-pointer
                 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                 transition-all duration-200 ease-out
                 hover:bg-orange-700 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    onClick={handlerAddItemToCart}
                >
                    <BsCartPlus />
                </button>
            </div>
            <div className="flex flex-col p-4 w-full">
                <div className="mb-2 flex justify-between">
                    <h3 className="text-slate-800 text-sm font-semibold">{card.title}</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BsFillStarFill className="text-yellow-400"/>
                        <p className="ms-1 text-sm font-bold text-gray-900">{card.rating}</p>
                    </div>
                    <div className="text-m font-bold">
                        <span className="mr-2 text-gray-400 line-through">
                            ${(card.price / (1 - card.discountPercentage / 100)).toFixed(2)}
                        </span>
                        ${card.price.toFixed(2)}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default ProductCard;
