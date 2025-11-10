import { calculateTotal, CartItem } from './cart';

describe('calculateTotal cart function', () => {
    it.each([
        // Arrange
        [[], 0],
        [[{ name: 'Apple', price: 10, quantity: 2}], 20],
        [[{ name: 'Apple', price: 10, quantity: 2}, { name: 'Banana', price: 5, quantity: 4}], 40],
    ])("calculateTotal(%o) should return %i", (cartItems: CartItem[], expected: number) => {
        // Act 
        const result = calculateTotal(cartItems);
        // Assert
        expect(result).toBe(expected);
    });
});
