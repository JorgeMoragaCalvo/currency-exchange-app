import { TransferMode, TransferFees, TransferBreakdown, CurrencyCode } from '@/types/currency';

export function calculateTransferBreakdown(
  mode: TransferMode,
  amount: number,
  sourceCurrency: CurrencyCode,
  targetCurrency: CurrencyCode,
  marketRate: number,
  fees: TransferFees
): TransferBreakdown {
  const effectiveRate = marketRate * (1 - fees.exchangeRateMargin / 100);

  if (mode === 'send') {
    return calculateSendMode(amount, sourceCurrency, targetCurrency, marketRate, effectiveRate, fees);
  } else {
    return calculateReceiveMode(amount, sourceCurrency, targetCurrency, marketRate, effectiveRate, fees);
  }
}

function calculateSendMode(
  amountToSend: number,
  sourceCurrency: CurrencyCode,
  targetCurrency: CurrencyCode,
  marketRate: number,
  effectiveRate: number,
  fees: TransferFees
): TransferBreakdown {
  const flatFeeAmount = fees.flatFee;
  const percentageFeeAmount = amountToSend * (fees.percentageFee / 100);
  const totalFees = flatFeeAmount + percentageFeeAmount;
  const amountAfterFees = Math.max(0, amountToSend - totalFees);
  const amountReceived = amountAfterFees * effectiveRate;

  return {
    mode: 'send',
    sourceCurrency,
    targetCurrency,
    amountEntered: amountToSend,
    amountToSend,
    flatFeeAmount,
    percentageFeeAmount,
    totalFees,
    amountAfterFees,
    marketRate,
    effectiveRate,
    amountReceived,
  };
}

function calculateReceiveMode(
  amountToReceive: number,
  sourceCurrency: CurrencyCode,
  targetCurrency: CurrencyCode,
  marketRate: number,
  effectiveRate: number,
  fees: TransferFees
): TransferBreakdown {
  const amountAfterFees = amountToReceive / effectiveRate;

  // Solve: amountToSend - flatFee - (amountToSend * percentageFee/100) = amountAfterFees
  // amountToSend * (1 - percentageFee/100) = amountAfterFees + flatFee
  const percentageMultiplier = 1 - fees.percentageFee / 100;
  const amountToSend = percentageMultiplier > 0
    ? (amountAfterFees + fees.flatFee) / percentageMultiplier
    : amountAfterFees + fees.flatFee;

  const flatFeeAmount = fees.flatFee;
  const percentageFeeAmount = amountToSend * (fees.percentageFee / 100);
  const totalFees = flatFeeAmount + percentageFeeAmount;

  return {
    mode: 'receive',
    sourceCurrency,
    targetCurrency,
    amountEntered: amountToReceive,
    amountToSend,
    flatFeeAmount,
    percentageFeeAmount,
    totalFees,
    amountAfterFees,
    marketRate,
    effectiveRate,
    amountReceived: amountToReceive,
  };
}
