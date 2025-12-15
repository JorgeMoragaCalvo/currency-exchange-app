interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
