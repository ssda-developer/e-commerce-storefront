import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products.js';
import ProductList from '../../components/product/ProductList.jsx';
import CartButton from '../../components/cart/CartButton.jsx';
import { useCartContext } from '../../context/CartContext.jsx';
import Filters from '../../components/filters/Filters.jsx';

function ProductsPage() {
    const { cart } = useCartContext();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();
            const items = Array.isArray(data?.products) ? data.products : [];

            setProducts(items);
            setFilteredProducts(items);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setProducts([]);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <>Loading...</>;

    return (
        <>
            <CartButton count={cart?.length ?? 0}/>
            <div className="flex flex-col py-10">
                <Filters products={products} setFilteredProducts={setFilteredProducts} />
                <ProductList productsList={filteredProducts} />
            </div>
        </>
    );
}

export default ProductsPage;
