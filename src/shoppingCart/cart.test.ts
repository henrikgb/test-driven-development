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
});