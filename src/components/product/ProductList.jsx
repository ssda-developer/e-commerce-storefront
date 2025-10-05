import ProductCard from './ProductCard.jsx';

const ProductList = ({ productsList = [] }) => {
    return (
        <div className="flex flex-col px-4 md:px-8 lg:px-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsList.map((product) => (
                    <li key={product.id} className="h-full">
                        <ProductCard card={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
