export function useCartPrice(cart, discountRate = 0) {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const discount = subtotal * (discountRate / 100);
    const total = Math.max(subtotal - discount, 0);

    return { subtotal, discount, total };
}
