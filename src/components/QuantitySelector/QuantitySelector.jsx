import { useState } from "react";

const QuantitySelector = ({ stock = 1, startValue, min = 1, onChange }) => {
    const [value, setValue] = useState(startValue < stock ? startValue : stock || min);

    const clampQuantity = (input) => {
        let next = Number(input) || min;
        next = Math.min(Math.max(next, min), stock || min);

        if (next !== value) {
            setValue(next);
            onChange(next);
        }
    };

    const canDecrement = value > min;
    const canIncrement = value < (stock || min);

    return (
        <div className="w-24 flex items-center border rounded-lg overflow-hidden">
            <button
                aria-label="Decrease quantity"
                className={`px-3 py-1 text-lg font-bold ${!canDecrement ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => canDecrement && clampQuantity(value - 1)}
                type="button"
                disabled={!canDecrement}
            >
                -
            </button>

            <input
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => clampQuantity(parseInt(e.target.value.replace(/\D/g, "") || String(min), 10))}
                className="w-full text-center outline-none py-1"
                min={min}
                max={stock}
                aria-label="Quantity input"
            />

            <button
                aria-label="Increase quantity"
                className={`px-3 py-1 text-lg font-bold ${!canIncrement ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => canIncrement && clampQuantity(value + 1)}
                type="button"
                disabled={!canIncrement}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
