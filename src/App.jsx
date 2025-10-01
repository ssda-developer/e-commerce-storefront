import './App.css';
import { Routes, Route } from "react-router";
import ProductsPage from "./pages/products/ProductsPage.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import ProductDetailPage from "./pages/product-detail-page/ProductDetailPage.jsx";
import Layout from "./components/layout/Layout.jsx";

const App = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<ProductsPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/product/:id" element={<ProductDetailPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;
