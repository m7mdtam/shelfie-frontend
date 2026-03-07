export function CommentsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3 bg-background-surface rounded-lg">
          <div className="w-10 h-10 rounded-full bg-background-muted animate-pulse shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-4 w-32 bg-background-muted rounded animate-pulse mb-2" />
            <div className="h-3 w-24 bg-background-muted rounded animate-pulse mb-2" />
            <div className="h-3 w-full bg-background-muted rounded animate-pulse mb-1" />
            <div className="h-3 w-3/4 bg-background-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
