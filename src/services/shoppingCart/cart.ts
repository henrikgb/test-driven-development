import { CartItem } from '../../types/cart';

export function calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};