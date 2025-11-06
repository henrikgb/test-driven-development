import { sum } from '../utils/math';

describe('sum function', () => {
    it('should add two numbers correctly', () => {
        // Arrange: Set up test data (inputs for the function)
        // (No explicit setup needed here - values are used directly)
        
        // Act: Execute the function under test
        const result = sum(2, 3);
        
        // Assert: Verify the result matches expectations
        expect(result).toBe(5);
    });

    it('should handle negative numbers', () => {
        // Arrange: Set up test data with negative numbers
        // (No explicit setup needed here - values are used directly)
        
        // Act: Execute the function with negative inputs
        const result = sum(-2, -3);
        
        // Assert: Verify the result is correct
        expect(result).toBe(-5);
    });
    
    it('should handle zero', () => {
        // Arrange: Set up test data with zero
        // (No explicit setup needed here - values are used directly)
        
        // Act: Execute the function with zero as input
        const result = sum(0, 5);
        
        // Assert: Verify the result is correct
        expect(result).toBe(5);
    });
})