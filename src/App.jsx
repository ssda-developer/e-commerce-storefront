import './App.css';
import { Routes, Route } from "react-router";
import ProductsPage from "./pages/products/ProductsPage.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import ProductDetailPage from "./pages/product-detail-page/ProductDetailPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductsPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
        </Routes>
    )
}

export default App;
