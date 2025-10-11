export const calculatePrice = (cart, discountRate = 0) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = subtotal * (Math.max(discountRate, 0) / 100);
    const total = Math.max(subtotal - discountAmount, 0);

    return { subtotal, discountAmount, total };
};
