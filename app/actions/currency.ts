'use server';

import { convertCurrency, getLatestRates } from '@/lib/api/frankfurter';
import { ConversionResponse, ExchangeRatesResponse } from '@/types/currency';

export async function fetchConversion(
  amount: number,
  from: string,
  to: string
): Promise<ConversionResponse> {
  return convertCurrency(amount, from, to);
}

export async function fetchRates(baseCurrency: string): Promise<ExchangeRatesResponse> {
  return getLatestRates(baseCurrency);
}
