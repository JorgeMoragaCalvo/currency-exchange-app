'use client';

import { TransferBreakdown, CurrencyMap } from '@/types/currency';
import { formatCurrency, formatRate } from '@/lib/utils/formatters';

interface TransferBreakdownDisplayProps {
  breakdown: TransferBreakdown | null;
  currencies: CurrencyMap;
  isLoading: boolean;
}

function BreakdownRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-2 ${highlight ? 'text-lg font-semibold' : ''}`}>
      <span className="text-zinc-600 dark:text-zinc-400">{label}</span>
      <span className={highlight ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-900 dark:text-zinc-100'}>
        {value}
      </span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3 mt-6">
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-1/2" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-2/3" />
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-full mt-4" />
    </div>
  );
}

export function TransferBreakdownDisplay({ breakdown, currencies, isLoading }: TransferBreakdownDisplayProps) {
  if (isLoading) {
    return <Skeleton />;
  }

  if (!breakdown) {
    return null;
  }

  const hasAnyFees = breakdown.totalFees > 0;
  const hasMargin = breakdown.marketRate !== breakdown.effectiveRate;

  return (
    <div className="mt-6 space-y-4">
      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
          Breakdown
        </h3>

        <div className="space-y-1">
          <BreakdownRow
            label="You send"
            value={formatCurrency(breakdown.amountToSend, breakdown.sourceCurrency)}
          />

          {hasAnyFees && (
            <>
              <BreakdownRow
                label={`Transfer fee${breakdown.flatFeeAmount > 0 && breakdown.percentageFeeAmount > 0
                  ? ` (${formatCurrency(breakdown.flatFeeAmount, breakdown.sourceCurrency)} + ${((breakdown.percentageFeeAmount / breakdown.amountToSend) * 100).toFixed(2)}%)`
                  : ''}`}
                value={`- ${formatCurrency(breakdown.totalFees, breakdown.sourceCurrency)}`}
              />
              <BreakdownRow
                label="Amount converted"
                value={formatCurrency(breakdown.amountAfterFees, breakdown.sourceCurrency)}
              />
            </>
          )}

          <div className="border-t border-zinc-200 dark:border-zinc-700 my-2" />

          <BreakdownRow
            label="Market rate"
            value={`1 ${breakdown.sourceCurrency} = ${formatRate(breakdown.marketRate)} ${breakdown.targetCurrency}`}
          />

          {hasMargin && (
            <BreakdownRow
              label={`Your rate (${((1 - breakdown.effectiveRate / breakdown.marketRate) * 100).toFixed(2)}% margin)`}
              value={`1 ${breakdown.sourceCurrency} = ${formatRate(breakdown.effectiveRate)} ${breakdown.targetCurrency}`}
            />
          )}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Recipient gets
          </span>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatCurrency(breakdown.amountReceived, breakdown.targetCurrency)}
          </span>
        </div>
        <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
          {currencies[breakdown.targetCurrency]}
        </div>
      </div>
    </div>
  );
}
