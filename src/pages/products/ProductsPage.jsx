import React, { useEffect, useState } from 'react';
import { getProducts } from "../../api/products.js";
import ProductList from "../../components/product/ProductList.jsx";
import CartButton from "../../components/cart/CartButton.jsx";
import { useCartContext } from "../../context/CartContext.jsx";

function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { cart } = useCartContext();

    // const [limit] = useState(8);
    // const [pageNumber, setPageNumber] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);

    // const [filters, setFilters] = useState({});

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts({
                // page: pageNumber,
                // limit,
                // category: filters
            });
            console.log(data);
            setProducts(data.products);
            // setTotalPages(data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); // pageNumber, filters

    if (loading) return <>Loading...</>;

    return (
        <>
            <CartButton count={cart.length}/>
            <div className="flex flex-col py-10">
                {/*<Filters onFilterChange={setFilters} />*/}
                <ProductList productsList={products}/>
                {/*<Pagination*/}
                {/*    currentPage={pageNumber}*/}
                {/*    limitPage={limit}*/}
                {/*    totalPages={totalPages}*/}
                {/*    onPageChange={setPageNumber}*/}
                {/*/>*/}
            </div>
        </>

    );
}

export default ProductsPage;
