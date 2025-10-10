import App from "@/App";
import { CartProvider } from "@/context/CartContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HashRouter>
            <CartProvider>
                <App />
            </CartProvider>
        </HashRouter>
    </StrictMode>
);
