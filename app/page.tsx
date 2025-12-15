import Link from 'next/link';
import { getCurrencies, getLatestRates } from '@/lib/api/frankfurter';
import { CurrencyConverter } from '@/components/currency/CurrencyConverter';
import { ExchangeRatesTable } from '@/components/currency/ExchangeRatesTable';
import { DEFAULT_BASE_CURRENCY } from '@/lib/utils/constants';

export default async function Home() {
  const [currencies, initialRates] = await Promise.all([
    getCurrencies(),
    getLatestRates(DEFAULT_BASE_CURRENCY),
  ]);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Currency Exchange Dashboard
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Convert currencies and view live exchange rates
          </p>
          <Link
            href="/transfer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Transfer Calculator
          </Link>
        </header>

        <main className="space-y-8">
          <CurrencyConverter
            currencies={currencies}
            initialRates={initialRates}
          />

          <ExchangeRatesTable
            currencies={currencies}
            initialBaseCurrency={DEFAULT_BASE_CURRENCY}
            initialRates={initialRates}
          />
        </main>

        <footer className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p>Data provided by Frankfurter API</p>
        </footer>
      </div>
    </div>
  );
}
