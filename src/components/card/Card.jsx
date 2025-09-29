import React from 'react';

function Card({ card }) {
    return (
        <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg h-full">
            <div className="p-2.5 h-40 overflow-hidden rounded-xl bg-clip-border">
                <img
                    src={card.images[0]}
                    alt={card.description}
                    className="h-full w-full object-contain rounded-md"
                />
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2 flex justify-between">
                    <h3 className="text-slate-800 text-lg font-semibold">{card.title}</h3>
                    <p className="text-cyan-600 text-lg font-semibold">${card.price}</p>
                </div>
                <p className="text-slate-600 leading-normal font-light flex-1">
                    {card.description}
                </p>

                <button
                    type="button"
                    className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default Card;
