import ProductCard from './ProductCard.jsx';

const ProductList = ({ productsList }) => {
    return (
        <div className="flex flex-col">
            <ul className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {productsList.map((product) => (
                    <li key={product.id} className="h-full">
                        <ProductCard card={product}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
