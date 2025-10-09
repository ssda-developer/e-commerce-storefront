import { useEffect, useState } from 'react';

const QuantitySelector = ({ stock = 1, startValue, min = 1, onChange }) => {
    const [value, setValue] = useState(startValue < stock ? startValue : stock || min);

    const commitNumber = (numb) => {
        if (numb === '') return setValue(min);
        if (numb > stock) return setValue(stock);
        if (numb < min) return setValue(min);
        if (numb) return setValue(numb);
    }

    useEffect(() => {
        onChange(value);
    }, [value]);

    const canDec = value > min;
    const canInc = value < (stock || min);

    return (
        <div className="w-24 flex items-center border rounded-lg overflow-hidden">
            <button
                aria-label="Decrease quantity"
                className={`px-3 py-1 text-lg font-bold ${!canDec ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => canDec && commitNumber(value - 1)}
                type="button"
                disabled={!canDec}
            >
                -
            </button>

            <input
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => commitNumber(parseInt(e.target.value.replace(/\D/g, '') || String(min), 10))}
                className="w-full text-center outline-none py-1"
                min={min}
                max={stock}
                aria-label="Quantity input"
            />

            <button
                aria-label="Increase quantity"
                className={`px-3 py-1 text-lg font-bold ${!canInc ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => canInc && commitNumber(value + 1)}
                type="button"
                disabled={!canInc}
            >
                +
            </button>
        </div>
    );
}

export default QuantitySelector;
