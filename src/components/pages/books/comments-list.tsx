import { useState } from 'react'
import { Comment } from '@/@types/comment'
import { CommentCard } from './comment-card'
import { useComments } from '@/hooks/pages/books/use-comments'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import React from 'react'

interface CommentsListProps {
  bookId: string
}

export function CommentsList({ bookId }: CommentsListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [allComments, setAllComments] = useState<Comment[]>([])
  const { data, isLoading, error } = useComments(bookId, currentPage)

  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllComments(data.data)
      } else {
        setAllComments(prev => [...prev, ...data.data])
      }
    }
  }, [data?.data, currentPage])

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const handleShowLess = () => {
    setCurrentPage(1)
    setAllComments(data?.data || [])
  }

  const hasMorePages = data?.pagination?.pages && currentPage < data.pagination.pages

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex justify-center py-8">
        <Loader className="w-6 h-6 animate-spin text-accent-primary" />
      </div>
    )
  }

  if (error && currentPage === 1) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-state-error">Failed to load comments</p>
      </div>
    )
  }

  if (!allComments || allComments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-text-secondary">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {allComments.map(comment => (
        <CommentCard key={comment.id} comment={comment} bookId={bookId} />
      ))}

      <div className="flex justify-center gap-2 pt-4">
        {hasMorePages && (
          <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        )}
        {currentPage > 1 && (
          <Button variant="outline" onClick={handleShowLess}>
            Show Less
          </Button>
        )}
      </div>
    </div>
  )
}
