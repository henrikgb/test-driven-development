export function calculateTotal(items: any[]): number {
    if(items.length > 0) {
        return items[0].price * items[0].quantity;
    }
    return 0;
}