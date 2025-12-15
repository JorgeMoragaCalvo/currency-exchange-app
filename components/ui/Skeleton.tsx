interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
      <Skeleton className="h-7 w-48 mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function RateCardSkeleton() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
      <Skeleton className="h-5 w-12 mb-2" />
      <Skeleton className="h-6 w-20 mb-1" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
