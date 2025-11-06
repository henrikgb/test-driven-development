import { CartItem, calculateTotal } from './cart';

describe('calculateTotal function', () => {
    it('should return 0 for an empty cart', () => {
        // Arrange
        const cartItems: CartItem[] = [];
        // Act
        const total = calculateTotal(cartItems);
        // Assert
        expect(total).toBe(0);
    });

    it('should return the total for a single item', () => {
        // Arrange 
        const cartItems: CartItem[] = [{ name: 'Apple', price: 10, quantity: 3}];
        // Act
        const totalt = calculateTotal(cartItems);
        // Assert
        expect(totalt).toBe(30);
    })

    it('should return the total for multiple items', () => {
        // Arrange
        const cartItems: CartItem[] = [
            { name: 'Apple', price: 10, quantity: 2},
            { name: 'Banana', price: 5, quantity: 4}
        ];
        // Act
        const total = calculateTotal(cartItems);
        // Assert
        expect(total).toBe(40);
    });
});