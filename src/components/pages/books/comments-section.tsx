import { PageSection } from '@/components/page-section'
import { CommentForm } from './comment-form'
import { CommentsList } from './comments-list'
import { RatingsSection } from './ratings-section'
import { RatingsSkeleton } from './ratings-skeleton'
import { CommentsSkeleton } from './comments-skeleton'
import { useAuthContext } from '@/contexts/auth'
import { Badge } from '@/components/ui/badge'

interface CommentsSectionProps {
  bookId: string
  averageRating: number
  userRating: number | null
  totalRatings: number
  isLoading?: boolean
}

export function CommentsSection({
  bookId,
  averageRating,
  userRating,
  totalRatings,
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
        <Badge variant="destructive" className="w-fit mb-4">
          Sign in to leave a comment.
        </Badge>
      )}
      <CommentsList bookId={bookId} />
    </PageSection>
  )
}
