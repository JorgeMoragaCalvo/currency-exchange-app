import Link from 'next/link';
import { getCurrencies, getLatestRates } from '@/lib/api/frankfurter';
import { TransferCalculator } from '@/components/transfer';
import { DEFAULT_BASE_CURRENCY } from '@/lib/utils/constants';

export default async function TransferPage() {
  const [currencies, initialRates] = await Promise.all([
    getCurrencies(),
    getLatestRates(DEFAULT_BASE_CURRENCY),
  ]);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <nav className="mb-4">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              &larr; Back to Dashboard
            </Link>
          </nav>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Transfer Calculator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Calculate the true cost of your international money transfer
          </p>
        </header>

        <main>
          <TransferCalculator
            currencies={currencies}
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
