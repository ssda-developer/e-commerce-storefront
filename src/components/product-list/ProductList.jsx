import React from 'react';
import Card from "../card/Card.jsx";

function ProductList({ productsList }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            {productsList.map((product) => (
                <li key={product.id} className="h-full">
                    <Card card={product}/>
                </li>
            ))}
        </ul>
    );
}

export default ProductList;
