import { sum } from './math';

describe("math sum function", () => {
    it.each([
        [2,3,5],
        [-2,-3,-5],
        [0,5,5],
        [-2,3,1],
    ])("sum(%i, %i) should return %i", (a: number, b: number, expected: number) => {
        // Act 
        const result = sum(a, b);

        // Assert
        expect(result).toBe(expected);
    });
});