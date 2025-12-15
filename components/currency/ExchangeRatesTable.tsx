'use client';

import { useState, useEffect, useCallback } from 'react';
import { CurrencyMap, CurrencyCode, ExchangeRatesResponse } from '@/types/currency';
import { Card } from '@/components/ui/Card';
import { CurrencySelect } from './CurrencySelect';
import { ExchangeRateCard } from './ExchangeRateCard';
import { RateCardSkeleton } from '@/components/ui/Skeleton';
import { MAJOR_CURRENCIES } from '@/lib/utils/constants';
import { formatDate } from '@/lib/utils/formatters';
import { fetchRates } from '@/app/actions/currency';

interface ExchangeRatesTableProps {
  currencies: CurrencyMap;
  initialBaseCurrency: CurrencyCode;
  initialRates: ExchangeRatesResponse;
}

export function ExchangeRatesTable({
  currencies,
  initialBaseCurrency,
  initialRates,
}: ExchangeRatesTableProps) {
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>(initialBaseCurrency);
  const [rates, setRates] = useState<ExchangeRatesResponse>(initialRates);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRates = useCallback(async (currency: CurrencyCode) => {
    if (currency === initialBaseCurrency && rates.base === initialBaseCurrency) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newRates = await fetchRates(currency);
      setRates(newRates);
    } catch {
      setError('Failed to fetch exchange rates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [initialBaseCurrency, rates.base]);

  useEffect(() => {
    if (baseCurrency !== rates.base) {
      loadRates(baseCurrency);
    }
  }, [baseCurrency, rates.base, loadRates]);

  const displayCurrencies = MAJOR_CURRENCIES.filter(
    (code) => code !== baseCurrency && code in rates.rates
  );

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Exchange Rates
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Base:</span>
          <CurrencySelect
            currencies={currencies}
            value={baseCurrency}
            onChange={setBaseCurrency}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <RateCardSkeleton key={i} />)
          : displayCurrencies.map((code) => (
              <ExchangeRateCard
                key={code}
                currencyCode={code}
                currencyName={currencies[code] || code}
                rate={rates.rates[code]}
                baseCurrency={baseCurrency}
              />
            ))}
      </div>

      <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-500 text-center">
        Last updated: {formatDate(rates.date)}
      </p>
    </Card>
  );
}
