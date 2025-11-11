import { convertPrice, calculateBulkPrices } from './pricingService';
import { getExchangeRate } from './exchangeRateService';

// Mock the entire ExchangeRateService module
jest.mock('./exchangeRateService');

describe('PricingService', () => {
    let mockGetExchangeRate: jest.MockedFunction<typeof getExchangeRate>;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Get reference to the mocked function
        mockGetExchangeRate = getExchangeRate as jest.MockedFunction<typeof getExchangeRate>;
    });

    it('should convert prices using exchange rate', async () => {
        // Arrange
        mockGetExchangeRate.mockResolvedValue(1.5);

        // Act
        const result = await convertPrice(100, 'USD', 'EUR');

        // Assert
        expect(mockGetExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
        expect(result).toBe(150.00);
    });
    
    it('should return same amount when currencies are identical', async () => {
        // Arrange
        mockGetExchangeRate.mockResolvedValue(1.0);

        // Act
        const result = await convertPrice(100, 'USD', 'USD');

        // Assert
        expect(mockGetExchangeRate).not.toHaveBeenCalled();
        expect(result).toBe(100);
    });
    
    it('should throw error for negative amounts', async () => {
        // Arrange
        mockGetExchangeRate.mockResolvedValue(1.5);

        // Act & Assert
        await expect(
            convertPrice(-100, 'USD', 'EUR')
        ).rejects.toThrow('Amount cannot be negative');
        expect(mockGetExchangeRate).not.toHaveBeenCalled();
    });
    
    it('should handle different exchange rates', async () => {
        // Arrange
        mockGetExchangeRate.mockImplementation(async (from, to) => {
            if (to === 'EUR') return 0.85;
            if (to === 'GBP') return 0.73;
            return 1.0;
        });

        // Act
        const eurResult = await convertPrice(100, 'USD', 'EUR');
        const gbpResult = await convertPrice(100, 'USD', 'GBP');

        // Assert
        expect(eurResult).toBe(85.00);
        expect(gbpResult).toBe(73.00);
        expect(mockGetExchangeRate).toHaveBeenCalledTimes(2);
    });
    
    it('should calculate bulk prices correctly', async () => {
        // Arrange
        mockGetExchangeRate.mockResolvedValue(1.5);

        // Act
        const result = await calculateBulkPrices([100, 200, 300], 'USD', 'EUR');

        // Assert
        expect(mockGetExchangeRate).toHaveBeenCalledTimes(1);
        expect(mockGetExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
        expect(result).toEqual([150.00, 300.00, 450.00]);
    });
});