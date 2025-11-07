export interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

export function calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};