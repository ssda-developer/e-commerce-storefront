import "./App.css";
import Layout from "@/components/Layout";
import { ROUTES } from "@/constants";
import CartPage from "@/pages/CartPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={ROUTES.HOME} element={<ProductsPage />} />
                <Route path={ROUTES.CART} element={<CartPage />} />
                <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
            </Route>
        </Routes>
    );
};

export default App;
