import { calculateTotal } from './cart';

describe('calculateTotal function', () => {
    it('should return 0 for an empty cart', () => {
        // Arrange
        const cartItems: number[] = [];
        // Act
        const total = calculateTotal(cartItems);
        // Assert
        expect(total).toBe(0);
    });

    it('should return the total for a single item', () => {
        // Arrange 
        const cartItems = [{ name: 'Apple', price: 10, quantity: 3}];
        // Act
        const totalt = calculateTotal(cartItems);
        // Assert
        expect(totalt).toBe(30);
    })
});