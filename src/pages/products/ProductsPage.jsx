import React, { useEffect, useState } from 'react';
import { getProducts } from "../../api/products.js";
import ProductList from "../../components/product/ProductList.jsx";
import CartButton from "../../components/cart/CartButton.jsx";
import { useCartContext } from "../../context/CartContext.jsx";

function ProductsPage() {
    const { cart } = useCartContext();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchTerm, seSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const PRODUCTS_CATEGORIES = new Set(products.map(product => product.category));

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();
            setProducts(data.products);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        seSearchTerm(e.target.value);
    }

    const handleFilter = (e) => {
        setSelectedCategory(e.target.value);
    }

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' ? true : product.category.toLowerCase() === selectedCategory.toLowerCase();
        const searchTermMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchTermMatch;
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <>Loading...</>;

    return (
        <>
            <CartButton count={cart.length}/>
            <div className="flex flex-col py-10">
                <div className="flex">
                    <input type="text" className="border-2" onChange={handleSearch}/>
                    <label htmlFor="category-select">Choose a category</label>

                    <select onChange={handleFilter}>
                        <option value="all">All Categories</option>
                        {[...PRODUCTS_CATEGORIES].map((category, index) => (
                            <option key={category + '' + index} value={category}> {category.toUpperCase()} </option>
                        ))}
                    </select>
                </div>
                <ProductList productsList={filteredProducts}/>
            </div>
        </>
    );
}

export default ProductsPage;
