import { useCartContext } from "../../context/CartContext.jsx";

const ProductCard = ({ card }) => {
    const { addItemToCart } = useCartContext();

    const handlerAddItemToCart = (e) => {
        e.preventDefault();
        addItemToCart(card);
        // console.log(e);
    }

    return (
        <div className="flex flex-col items-center bg-white shadow-sm border border-slate-200 rounded-lg h-full">
            <div className="p-2.5 h-[150px] w-[150px] overflow-hidden rounded-xl bg-clip-border">
                <img
                    src={card.images[0]}
                    alt={card.description}
                    className="h-full w-full object-contain rounded-md"
                />
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2 flex justify-between">
                    <h3 className="text-slate-800 text-sm font-semibold">{card.title}</h3>
                    <p className="text-cyan-600 text-lg font-semibold">${card.price}</p>
                </div>
                {/*<p className="text-slate-600 leading-normal font-light flex-1">*/}
                {/*    {card.description}*/}
                {/*</p>*/}

                <button
                    type="button"
                    className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handlerAddItemToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
