'use client';

import { CurrencyMap, CurrencyCode } from '@/types/currency';
import { Select } from '@/components/ui/Select';

interface CurrencySelectProps {
  currencies: CurrencyMap;
  value: CurrencyCode;
  onChange: (code: CurrencyCode) => void;
  label?: string;
  excludeCurrency?: CurrencyCode;
}

export function CurrencySelect({
  currencies,
  value,
  onChange,
  label,
  excludeCurrency,
}: CurrencySelectProps) {
  const options = Object.entries(currencies)
    .filter(([code]) => code !== excludeCurrency)
    .map(([code, name]) => ({
      value: code,
      label: `${code} - ${name}`,
    }))
    .sort((a, b) => a.value.localeCompare(b.value));

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      label={label}
    />
  );
}
