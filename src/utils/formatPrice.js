const cache = new Map();

export const formatPrice = (
    value,
    { currency = 'USD', locale = 'en-US', maximumFractionDigits = 2 } = {}
) => {
    const key = `${locale}-${currency}-${maximumFractionDigits}`;
    let formatter = cache.get(key);

    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            maximumFractionDigits,
        });
        cache.set(key, formatter);
    }
    const num = Number(value);
    return formatter.format(Number.isFinite(num) ? num : 0);
}
