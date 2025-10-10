export const calculatePrice = (cart, discountRate = 0) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * (Math.max(discountRate, 0) / 100);
    const total = Math.max(subtotal - discount, 0);

    return { subtotal, discount, total };
};
