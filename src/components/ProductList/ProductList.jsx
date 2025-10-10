import ProductCard from "@/components/ProductCard";

const ProductList = ({ products = [] }) => {
    return (
        <div className="flex flex-col px-4 md:px-8 lg:px-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <li key={product.id} className="h-full">
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
