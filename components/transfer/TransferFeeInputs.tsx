'use client';

import { TransferFees, CurrencyCode } from '@/types/currency';

interface TransferFeeInputsProps {
  fees: TransferFees;
  onChange: (fees: TransferFees) => void;
  sourceCurrency: CurrencyCode;
}

export function TransferFeeInputs({ fees, onChange, sourceCurrency }: TransferFeeInputsProps) {
  const updateFee = (key: keyof TransferFees, value: number) => {
    onChange({ ...fees, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Fees & Margins (optional)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">
            Transfer Fee ({sourceCurrency})
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={fees.flatFee}
              onChange={(e) => updateFee('flatFee', parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              placeholder="0.00"
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-zinc-500 dark:text-zinc-400">+</span>
            <div className="flex items-center">
              <input
                type="number"
                value={fees.percentageFee}
                onChange={(e) => updateFee('percentageFee', parseFloat(e.target.value) || 0)}
                min={0}
                max={100}
                step={0.01}
                placeholder="0.00"
                className="w-20 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="ml-1 text-zinc-500 dark:text-zinc-400">%</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">
            Exchange Rate Margin
          </label>
          <div className="flex items-center">
            <input
              type="number"
              value={fees.exchangeRateMargin}
              onChange={(e) => updateFee('exchangeRateMargin', parseFloat(e.target.value) || 0)}
              min={0}
              max={100}
              step={0.01}
              placeholder="0.00"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="ml-1 text-zinc-500 dark:text-zinc-400">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
