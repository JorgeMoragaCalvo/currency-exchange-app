'use server';

import { convertCurrency } from '@/lib/api/frankfurter';
import { calculateTransferBreakdown } from '@/lib/utils/transfer';
import { TransferMode, TransferFees, TransferBreakdown, CurrencyCode } from '@/types/currency';

export async function fetchTransferBreakdown(
  mode: TransferMode,
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  fees: TransferFees
): Promise<TransferBreakdown> {
  // Fetch the market rate (1 unit conversion)
  const response = await convertCurrency(1, fromCurrency, toCurrency);
  const marketRate = response.rates[toCurrency];

  return calculateTransferBreakdown(mode, amount, fromCurrency, toCurrency, marketRate, fees);
}
