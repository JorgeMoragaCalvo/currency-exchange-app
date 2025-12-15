import { CardSkeleton, RateCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="h-9 w-80 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-5 w-64 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
        </header>

        <main className="space-y-8">
          <CardSkeleton />

          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="h-7 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
              <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <RateCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
