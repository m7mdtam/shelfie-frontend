import { PageSection } from '@/components/page-section'
import { CommentForm } from './comment-form'
import { CommentsList } from './comments-list'
import { RatingsSection } from './ratings-section'
import { useAuthContext } from '@/contexts/auth'

interface CommentsSectionProps {
  bookId: string
  averageRating: number
  userRating: number | null
  totalRatings: number
}

export function CommentsSection({
  bookId,
  averageRating,
  userRating,
  totalRatings,
}: CommentsSectionProps) {
  const auth = useAuthContext()
  const isAuthenticated = !!auth.decodedToken

  return (
    <PageSection>
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
        Community Rating
      </p>
      <RatingsSection
        bookId={bookId}
        averageRating={averageRating}
        userRating={userRating}
        totalRatings={totalRatings}
      />

      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
        Comments
      </p>
      {isAuthenticated && <CommentForm bookId={bookId} />}
      {!isAuthenticated && (
        <p className="text-sm text-text-secondary mb-4">Sign in to leave a comment.</p>
      )}
      <CommentsList bookId={bookId} />
    </PageSection>
  )
}
