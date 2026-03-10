import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarDisplayProps {
  rating: number
  className?: string
}

export function StarDisplay({ rating, className }: StarDisplayProps) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full)
          return (
            <Star key={i} className={cn('fill-star-filled text-star-filled', className)} />
          )

        if (i === full && hasHalf)
          return (
            <span key={i} className="relative inline-flex shrink-0">
              <Star className={cn('text-text-secondary', className)} />
              <span className="absolute inset-0 w-[50%] overflow-hidden">
                <Star className={cn('fill-star-filled text-star-filled', className)} />
              </span>
            </span>
          )

        return <Star key={i} className={cn('text-text-secondary', className)} />
      })}
    </div>
  )
}
