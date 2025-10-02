export function useCartPrice(cart, discountRate) { //TODO: this works many times, maybe use useMemo?
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const discount = discountRate ? subtotal - discountRate : 0;
    const total = Math.max(subtotal - discount, 0);

    return { subtotal, discount, total };
}
