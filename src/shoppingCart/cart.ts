export interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

export function calculateTotal(items: CartItem[]): number {
    if(items.length > 0) {
        const item = items[0];
        return item.price * item.quantity;
    }
    return 0;
}