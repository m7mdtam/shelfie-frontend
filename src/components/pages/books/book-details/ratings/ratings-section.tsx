import { useAuthContext } from '@/contexts/auth'
import { useRating } from '@/hooks/pages/books/use-rating'
import { StarRating } from './star-rating'
import { motion } from 'motion/react'
import { useRatingsSectionPreset } from '@/lib/animations'

interface RatingsSectionProps {
  bookId: string
  averageRating: number
  userRating: number | null
  totalRatings: number
}

export function RatingsSection({
  bookId,
  userRating,
}: Pick<RatingsSectionProps, 'bookId' | 'userRating'>) {
  const auth = useAuthContext()
  const isAuthenticated = !!auth.decodedToken
  const { mutate: submitRating, isPending } = useRating(bookId)

  const hasRated = userRating !== null && userRating !== undefined

  const handleRate = (rating: number) => {
    submitRating(rating)
  }

  const ratingsSectionPreset = useRatingsSectionPreset()

  return (
    <motion.div className="flex flex-col gap-2 mb-6" {...ratingsSectionPreset}>
      <div className="flex flex-wrap items-center gap-3">
        <StarRating
          value={userRating ?? 0}
          onChange={isAuthenticated && !hasRated ? handleRate : undefined}
          disabled={isPending || hasRated}
        />
      </div>

      {isAuthenticated && (
        <p className="text-xs text-text-secondary">
          {hasRated ? `Your rate is ${userRating} out of 5` : 'Rate this book'}
        </p>
      )}
    </motion.div>
  )
}
