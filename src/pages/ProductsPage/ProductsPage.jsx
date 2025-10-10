import { getProducts } from "@/api";
import CartButton from "@/components/CartButton";
import EmptyState from "@/components/EmptyState";
import Filters from "@/components/Filters";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductList from "@/components/ProductList";
import { useCartContext } from "@/context/CartContext";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const { cart } = useCartContext();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        setFetchError(false);

        try {
            const { data } = await getProducts();
            const items = Array.isArray(data?.products) ? data.products : [];

            if (items.length === 0) setFetchError(true);

            setProducts(items);
            setFilteredProducts(items);
        } catch (err) {
            console.error("Failed to fetch ProductsPage:", err);
            setFetchError(true);
            setProducts([]);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <LoadingSpinner />;

    const isApiEmpty = fetchError || products.length === 0;
    const isFilterEmpty = !isApiEmpty && filteredProducts.length === 0;

    return (
        <>
            <CartButton count={cart?.length ?? 0} />
            <div className="flex flex-col py-10">

                {isApiEmpty ? (
                    <EmptyState title="No products available"
                                message="Something went wrong or the catalog is empty"
                                showButton={true}
                                buttonText="Refresh"
                                onButtonClick={fetchProducts}
                    />
                ) : (
                    <>
                        <Filters
                            products={products}
                            setFilteredProducts={setFilteredProducts}
                        />

                        {isFilterEmpty ? (
                            <EmptyState title="No products match your filters"
                                        message="Try adjusting your filters to see more results"
                            />
                        ) : (
                            <ProductList products={filteredProducts} />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ProductsPage;
