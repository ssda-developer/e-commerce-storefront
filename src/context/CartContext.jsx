import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = "ecommerce_cart_storage";

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

    const [discountRate, setDiscountRate] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);

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
            setDiscountRate(99.9);
            setDiscountCode(inputCode);
            setIsDiscountApplied(true);

            return true;
        } else {
            setDiscountRate(0);
            setDiscountCode("");
            setIsDiscountApplied(false);

            return false;
        }
    };

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const contextValue = useMemo(() => ({
        cart,
        discountRate,
        discountCode,
        isDiscountApplied,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        applyDiscount
    }), [cart, discountRate, discountCode, isDiscountApplied, addItemToCart, removeItemFromCart, clearCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
