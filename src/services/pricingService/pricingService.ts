import { getExchangeRate } from './exchangeRateService';

export async function convertPrice(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    getRateFn: (from: string, to: string) => Promise<number> = getExchangeRate
): Promise<number> {
    if (amount < 0) {
        throw new Error("Amount cannot be negative");
    }

    if (fromCurrency === toCurrency) {
        return amount;
    }

    const rate = await getRateFn(fromCurrency, toCurrency);
    return amount * rate;
}

export async function calculateBulkPrices(
    amounts: number[],
    fromCurrency: string,
    toCurrency: string,
    getRateFn: (from: string, to: string) => Promise<number> = getExchangeRate
): Promise<number[]> {
    let rate: number;
    
    // get rate
    if(fromCurrency === toCurrency) {
        rate = 1.0;
    } else {
        rate = await getRateFn(fromCurrency, toCurrency);
    }

    // calculate results
    return amounts.map(amount => amount * rate);
}