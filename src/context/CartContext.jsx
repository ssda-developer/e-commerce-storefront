import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.error('Error parsing cart:', e);
            return [];
        }
    });

    const [discountRate, setDiscountRate] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);

    const addItemToCart = useCallback((product, quantity = 1, increment = false) => {
        setCart((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: increment ? item.quantity + quantity : quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);

    const removeItemFromCart = useCallback(
        (id) => setCart((prev) => prev.filter((item) => item.id !== id)),
        []
    );

    const clearCart = useCallback(() => setCart([]), []);

    const applyDiscount = (code, validCode) => {
        if (code.toLowerCase().trim() === validCode.toLowerCase().trim()) {
            setDiscountRate(99.9);
            setDiscountCode(code);
            setIsDiscountApplied(true);
            return true;
        } else {
            setDiscountRate(0);
            setDiscountCode('');
            setIsDiscountApplied(false);
            return false;
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                discountRate,
                discountCode,
                isDiscountApplied,
                addItemToCart,
                removeItemFromCart,
                clearCart,
                applyDiscount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
