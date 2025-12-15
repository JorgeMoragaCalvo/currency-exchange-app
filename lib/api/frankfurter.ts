import { CurrencyMap, ExchangeRatesResponse, ConversionResponse } from '@/types/currency';
import { API_BASE_URL } from '@/lib/utils/constants';

export async function getCurrencies(): Promise<CurrencyMap> {
  const response = await fetch(`${API_BASE_URL}/currencies`, {
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch currencies');
  }

  return response.json();
}

export async function getLatestRates(baseCurrency: string): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${API_BASE_URL}/latest?from=${baseCurrency}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }

  return response.json();
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<ConversionResponse> {
  const response = await fetch(
    `${API_BASE_URL}/latest?amount=${amount}&from=${from}&to=${to}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to convert currency');
  }

  return response.json();
}
