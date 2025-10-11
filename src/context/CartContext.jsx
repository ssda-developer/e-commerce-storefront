import { CART_STORAGE_KEY } from "@/constants";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);

            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage:\n", error);

            return [];
        }
    });

    const [discount, setDiscount] = useState({
        rate: 0,
        code: "",
        isApplied: false
    });

    const addItemToCart = useCallback((product, quantity = 1, shouldIncrement = false) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === product.id);

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === product.id
                        ? { ...cartItem, quantity: shouldIncrement ? cartItem.quantity + quantity : quantity }
                        : cartItem
                );
            }

            return [...prevCart, { ...product, quantity }];
        });
    }, []);

    const removeItemFromCart = useCallback(
        (productId) => setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== productId)),
        []
    );

    const clearCart = useCallback(() => setCart([]), []);

    const applyDiscount = (inputCode, expectedCode) => {
        if (inputCode.toLowerCase().trim() === expectedCode.toLowerCase().trim()) {
            setDiscount({
                rate: 99.9,
                code: inputCode,
                isApplied: true
            });

            return true;
        } else {
            setDiscount({
                rate: 0,
                code: "",
                isApplied: false
            });

            return false;
        }
    };

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const contextValue = useMemo(() => ({
        cart,
        discount,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        applyDiscount
    }), [cart, discount, addItemToCart, removeItemFromCart, clearCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
