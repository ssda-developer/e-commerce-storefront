import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/products/ProductsPage.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import ProductDetailPage from "./pages/product-detail-page/ProductDetailPage.jsx";
import Layout from "./components/layout/Layout.jsx";
import { ROUTES } from "./constants/index.js";

const App = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={ROUTES.HOME} element={<ProductsPage/>}/>
                <Route path={ROUTES.CART} element={<CartPage/>}/>
                <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;
