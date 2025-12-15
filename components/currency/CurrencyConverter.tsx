'use client';

import { useState, useEffect, useCallback } from 'react';
import { CurrencyMap, CurrencyCode, ExchangeRatesResponse } from '@/types/currency';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { CurrencySelect } from './CurrencySelect';
import { ConversionResult } from './ConversionResult';
import { DEFAULT_BASE_CURRENCY, DEFAULT_TARGET_CURRENCY, DEFAULT_AMOUNT } from '@/lib/utils/constants';
import { fetchConversion } from '@/app/actions/currency';

interface CurrencyConverterProps {
  currencies: CurrencyMap;
  initialRates: ExchangeRatesResponse;
}

export function CurrencyConverter({ currencies, initialRates }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>(DEFAULT_BASE_CURRENCY);
  const [toCurrency, setToCurrency] = useState<CurrencyCode>(DEFAULT_TARGET_CURRENCY);
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performConversion = useCallback(async () => {
    if (amount <= 0) {
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchConversion(amount, fromCurrency, toCurrency);
      setResult(response.rates[toCurrency]);
    } catch {
      setError('Failed to convert currency. Please try again.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      performConversion();
    }, 300);

    return () => clearTimeout(timer);
  }, [performConversion]);

  useEffect(() => {
    if (initialRates && fromCurrency === initialRates.base && toCurrency in initialRates.rates) {
      setResult(amount * initialRates.rates[toCurrency]);
    }
  }, []);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Card title="Currency Converter">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-end">
        <Input
          label="Amount"
          value={amount}
          onChange={setAmount}
          min={0}
          step={0.01}
        />

        <CurrencySelect
          currencies={currencies}
          value={fromCurrency}
          onChange={setFromCurrency}
          label="From"
        />

        <button
          onClick={handleSwapCurrencies}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors self-end mb-1"
          aria-label="Swap currencies"
        >
          <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        <CurrencySelect
          currencies={currencies}
          value={toCurrency}
          onChange={setToCurrency}
          label="To"
        />
      </div>

      <button
        onClick={handleSwapCurrencies}
        className="md:hidden mt-4 w-full py-2 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm text-zinc-600 dark:text-zinc-400"
      >
        Swap currencies
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <ConversionResult
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        result={result}
        isLoading={isLoading}
      />
    </Card>
  );
}
