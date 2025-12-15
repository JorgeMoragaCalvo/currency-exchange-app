export const MAJOR_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CHF',
  'CAD', 'AUD', 'CNY', 'INR', 'MXN',
  'BRL', 'KRW', 'SGD', 'HKD', 'NOK'
] as const;

export const DEFAULT_BASE_CURRENCY = 'USD';
export const DEFAULT_TARGET_CURRENCY = 'EUR';
export const DEFAULT_AMOUNT = 1;

export const API_BASE_URL = 'https://api.frankfurter.app';

export const DEFAULT_TRANSFER_FEES = {
  flatFee: 0,
  percentageFee: 0,
  exchangeRateMargin: 0,
};
