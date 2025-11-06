export interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

export function calculateTotal(items: CartItem[]): number {
    let total = 0;

    items.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
};