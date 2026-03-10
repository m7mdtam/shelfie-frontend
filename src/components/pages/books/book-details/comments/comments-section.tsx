import { CommentForm } from './comment-form'
import { CommentsList } from './comments-list'
import { RatingsSection } from '../ratings/ratings-section'
import { RatingsSkeleton } from '../ratings/ratings-skeleton'
import { CommentsSkeleton } from './comments-skeleton'
import { useAuthContext } from '@/contexts/auth'
import { PageSection } from '@/components'

interface CommentsSectionProps {
  bookId: string
  userRating: number | null
  isLoading?: boolean
}

export function CommentsSection({
  bookId,
  userRating,
  isLoading = false,
}: CommentsSectionProps) {
  const auth = useAuthContext()
  const isAuthenticated = !!auth.decodedToken

  if (isLoading) {
    return (
      <PageSection>
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Community Rating
        </p>
        <RatingsSkeleton />

        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Comments
        </p>
        <CommentsSkeleton />
      </PageSection>
    )
  }

  return (
    <PageSection>
      {!isAuthenticated && (
        <p className="text-sm font-bold italic text-state-error mb-4">
          Sign in to rate this book and share your thoughts in the comments.
        </p>
      )}

      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
        Community Rating
      </p>
      <RatingsSection
        bookId={bookId}
        userRating={userRating}
      />

      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
        Comments
      </p>
      {isAuthenticated && <CommentForm bookId={bookId} />}
      <CommentsList bookId={bookId} />
    </PageSection>
  )
}
