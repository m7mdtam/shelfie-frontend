import { useAuthContext } from '@/contexts/auth'
import { useRating } from '@/hooks/pages/books/use-rating'
import { StarRating } from './star-rating'
import { motion } from 'motion/react'
import { ANIMATION_DURATION, ANIMATION_STATE } from '@/utils/animations'

interface RatingsSectionProps {
  bookId: string
  averageRating: number
  userRating: number | null
  totalRatings: number
}

export function RatingsSection({
  bookId,
  averageRating,
  userRating,
  totalRatings,
}: RatingsSectionProps) {
  const auth = useAuthContext()
  const isAuthenticated = !!auth.decodedToken
  const { mutate: submitRating, isPending } = useRating(bookId)

  const hasRated = userRating !== null && userRating !== undefined

  const handleRate = (rating: number) => {
    submitRating(rating)
  }

  return (
    <motion.div
      className="flex flex-col gap-2 mb-6"
      initial={ANIMATION_STATE.slideUpSmall.hidden}
      whileInView={ANIMATION_STATE.slideUpSmall.visible}
      transition={{ duration: ANIMATION_DURATION.midFast }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <StarRating
          value={userRating ?? 0}
          onChange={isAuthenticated && !hasRated ? handleRate : undefined}
          disabled={isPending || hasRated}
        />
        {(totalRatings ?? 0) > 0 && (
          <span className="text-sm text-text-secondary">
            {(averageRating ?? 0).toFixed(1)} ({totalRatings}{' '}
            {totalRatings === 1 ? 'rating' : 'ratings'})
          </span>
        )}
      </div>
      {isAuthenticated && (
        <p className="text-xs text-text-secondary">
          {hasRated ? `Your rating: ${userRating}/5 — thanks!` : 'Rate this book'}
        </p>
      )}
    </motion.div>
  )
}
