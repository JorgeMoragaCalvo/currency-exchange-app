import { formatCurrency, formatRate } from '@/lib/utils/formatters';
import { CurrencyCode } from '@/types/currency';

interface ConversionResultProps {
  amount: number;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  result: number | null;
  isLoading: boolean;
}

export function ConversionResult({
  amount,
  fromCurrency,
  toCurrency,
  result,
  isLoading,
}: ConversionResultProps) {
  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2" />
          <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-32" />
        </div>
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-500 dark:text-zinc-400">
        Enter an amount to see the conversion
      </div>
    );
  }

  const rate = result / amount;

  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
      <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {formatCurrency(amount, fromCurrency)} = {formatCurrency(result, toCurrency)}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        1 {fromCurrency} = {formatRate(rate)} {toCurrency}
      </p>
    </div>
  );
}
