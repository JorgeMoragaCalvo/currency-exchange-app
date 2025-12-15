export type CurrencyCode = string;

export interface CurrencyMap {
  [code: string]: string;
}

export interface ExchangeRatesResponse {
  amount: number;
  base: CurrencyCode;
  date: string;
  rates: {
    [code: string]: number;
  };
}

export interface ConversionResponse {
  amount: number;
  base: CurrencyCode;
  date: string;
  rates: {
    [code: string]: number;
  };
}

export type TransferMode = 'send' | 'receive';

export interface TransferFees {
  flatFee: number;
  percentageFee: number;
  exchangeRateMargin: number;
}

export interface TransferBreakdown {
  mode: TransferMode;
  sourceCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  amountEntered: number;
  amountToSend: number;
  flatFeeAmount: number;
  percentageFeeAmount: number;
  totalFees: number;
  amountAfterFees: number;
  marketRate: number;
  effectiveRate: number;
  amountReceived: number;
}
