export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    // In real implementation, this would call an external API
    const response = await fetch(
        `https://api.exchange.com/rates/${fromCurrency}/${toCurrency}`
    );
    const data = await response.json();
    return data.rate;
}