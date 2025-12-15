'use client';

import { useState, useEffect, useCallback } from 'react';
import { CurrencyMap, CurrencyCode, ExchangeRatesResponse, TransferMode, TransferFees, TransferBreakdown } from '@/types/currency';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { CurrencySelect } from '@/components/currency/CurrencySelect';
import { TransferModeToggle } from './TransferModeToggle';
import { TransferFeeInputs } from './TransferFeeInputs';
import { TransferBreakdownDisplay } from './TransferBreakdownDisplay';
import { DEFAULT_BASE_CURRENCY, DEFAULT_TARGET_CURRENCY, DEFAULT_AMOUNT, DEFAULT_TRANSFER_FEES } from '@/lib/utils/constants';
import { fetchTransferBreakdown } from '@/app/actions/transfer';

interface TransferCalculatorProps {
  currencies: CurrencyMap;
  initialRates: ExchangeRatesResponse;
}

export function TransferCalculator({ currencies, initialRates }: TransferCalculatorProps) {
  const [mode, setMode] = useState<TransferMode>('send');
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT * 1000);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>(DEFAULT_BASE_CURRENCY);
  const [toCurrency, setToCurrency] = useState<CurrencyCode>(DEFAULT_TARGET_CURRENCY);
  const [fees, setFees] = useState<TransferFees>(DEFAULT_TRANSFER_FEES);
  const [breakdown, setBreakdown] = useState<TransferBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performCalculation = useCallback(async () => {
    if (amount <= 0) {
      setBreakdown(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setError('Source and target currencies must be different');
      setBreakdown(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchTransferBreakdown(mode, amount, fromCurrency, toCurrency, fees);
      setBreakdown(result);
    } catch {
      setError('Failed to calculate transfer. Please try again.');
      setBreakdown(null);
    } finally {
      setIsLoading(false);
    }
  }, [mode, amount, fromCurrency, toCurrency, fees]);

  useEffect(() => {
    const timer = setTimeout(() => {
      performCalculation();
    }, 300);

    return () => clearTimeout(timer);
  }, [performCalculation]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Card title="Transfer Calculator">
      <div className="space-y-6">
        <TransferModeToggle mode={mode} onChange={setMode} />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <Input
            label={mode === 'send' ? 'Amount to send' : 'Amount to receive'}
            value={amount}
            onChange={setAmount}
            min={0}
            step={0.01}
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
            value={mode === 'send' ? fromCurrency : toCurrency}
            onChange={mode === 'send' ? setFromCurrency : setToCurrency}
            label={mode === 'send' ? 'From' : 'Currency'}
          />
        </div>

        <CurrencySelect
          currencies={currencies}
          value={mode === 'send' ? toCurrency : fromCurrency}
          onChange={mode === 'send' ? setToCurrency : setFromCurrency}
          label={mode === 'send' ? 'To' : 'Sending from'}
          excludeCurrency={mode === 'send' ? fromCurrency : toCurrency}
        />

        <button
          onClick={handleSwapCurrencies}
          className="md:hidden w-full py-2 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm text-zinc-600 dark:text-zinc-400"
        >
          Swap currencies
        </button>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <TransferFeeInputs
            fees={fees}
            onChange={setFees}
            sourceCurrency={fromCurrency}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <TransferBreakdownDisplay
          breakdown={breakdown}
          currencies={currencies}
          isLoading={isLoading}
        />
      </div>
    </Card>
  );
}
