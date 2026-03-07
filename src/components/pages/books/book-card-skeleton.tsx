export function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-3 bg-background-surface rounded-lg animate-pulse">
      <div className="w-full h-40 bg-background-muted rounded" />
      <div className="h-4 w-3/4 bg-background-muted rounded" />
      <div className="h-3 w-1/2 bg-background-muted rounded" />
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-background-muted rounded-full" />
        ))}
      </div>
      <div className="h-8 w-full bg-background-muted rounded" />
    </div>
  )
}
