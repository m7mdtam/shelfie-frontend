import { PageSection } from '@/components/page-section'
import { CommentForm } from './comment-form'
import { CommentsList } from './comments-list'
import { useAuthContext } from '@/contexts/auth'

interface CommentsSectionProps {
  bookId: string
}

export function CommentsSection({ bookId }: CommentsSectionProps) {
  const auth = useAuthContext()
  const isAuthenticated = !!auth.decodedToken

  return (
    <PageSection>
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
