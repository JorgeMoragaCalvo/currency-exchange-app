import { formatRate } from '@/lib/utils/formatters';
import { CurrencyCode } from '@/types/currency';

interface ExchangeRateCardProps {
  currencyCode: CurrencyCode;
  currencyName: string;
  rate: number;
  baseCurrency: CurrencyCode;
}

export function ExchangeRateCard({
  currencyCode,
  currencyName,
  rate,
  baseCurrency,
}: ExchangeRateCardProps) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {currencyCode}
      </p>
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
        {formatRate(rate)}
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 truncate" title={currencyName}>
        {currencyName}
      </p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
        1 {baseCurrency} = {formatRate(rate)} {currencyCode}
      </p>
    </div>
  );
}
