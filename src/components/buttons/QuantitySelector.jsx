import { useState } from 'react';

const QuantitySelector = ({ stock = 1, min = 1 }) => {
    const [value, setValue] = useState(min);

    const commitNumber = (numb) => {
        if (numb === '') return setValue(min);
        if (numb > stock) return setValue(stock);
        if (numb < min) return setValue(min);
        if (numb) return setValue(numb);
    }

    return (
        <div className={`flex items-center gap-4`}>
            <span className="font-semibold">Quantity:</span>
            <div className="w-26 flex items-center border rounded-lg overflow-hidden">
                <button
                    aria-label="Decrease quantity"
                    className="px-3 py-1 text-lg font-bold"
                    onClick={() => commitNumber(value - 1)}
                    type="button"
                >
                    -
                </button>

                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={value}
                    onChange={(e) => commitNumber(Number(e.target.value))}
                    className="w-full text-center outline-none py-1"
                    min={min}
                    max={stock}
                    aria-label="Quantity input"
                />

                <button
                    aria-label="Increase quantity"
                    className="px-3 py-1 text-lg font-bold"
                    onClick={() => commitNumber(value + 1)}
                    type="button"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantitySelector;
