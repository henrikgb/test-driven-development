import { sum } from '../src/math';

describe('sum function', () => {
    it('should add two numbers correctly', () => {
        expect(sum(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
        expect(sum(-2, -3)).toBe(-5);
    });
    it('should handle zero', () => {
        expect(sum(0, 5)).toBe(5);
    });
})