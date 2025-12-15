'use client';

import { TransferMode } from '@/types/currency';

interface TransferModeToggleProps {
  mode: TransferMode;
  onChange: (mode: TransferMode) => void;
}

export function TransferModeToggle({ mode, onChange }: TransferModeToggleProps) {
  return (
    <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1">
      <button
        onClick={() => onChange('send')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          mode === 'send'
            ? 'bg-blue-500 text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`}
      >
        I want to send
      </button>
      <button
        onClick={() => onChange('receive')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          mode === 'receive'
            ? 'bg-blue-500 text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`}
      >
        I want recipient to receive
      </button>
    </div>
  );
}
