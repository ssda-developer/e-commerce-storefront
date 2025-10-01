export function useCartPrice(cart, discountRate) {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    console.log(subtotal, discountRate);
    const discount = discountRate ? subtotal - discountRate : 0;
    console.log(discount);
    const total = Math.max(subtotal - discount, 0);

    return { subtotal, discount, total };
}
