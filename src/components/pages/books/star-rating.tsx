import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarRatingProps {
  value: number
  onChange?: (rating: number) => void
  disabled?: boolean
}

export function StarRating({ value, onChange, disabled }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const isInteractive = !!onChange && !disabled
  const display = hovered ?? value

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= display

        return (
          <button
            key={starValue}
            type="button"
            disabled={!isInteractive}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => isInteractive && setHovered(starValue)}
            onMouseLeave={() => isInteractive && setHovered(null)}
            className={[
              'focus:outline-none',
              isInteractive
                ? 'cursor-pointer transition-transform hover:scale-110'
                : 'cursor-default',
            ].join(' ')}
            aria-label={`Rate ${starValue} out of 5`}
          >
            <Star
              className={[
                'w-5 h-5 transition-colors',
                filled ? 'fill-star-filled text-star-filled' : 'text-text-secondary',
              ].join(' ')}
            />
          </button>
        )
      })}
    </div>
  )
}
