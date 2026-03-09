export function RatingsSkeleton() {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-background-surface rounded animate-pulse" />
          ))}
        </div>
        <div className="h-4 w-24 bg-background-surface rounded animate-pulse" />
      </div>
      <div className="h-3 w-32 bg-background-surface rounded animate-pulse" />
    </div>
  )
}
