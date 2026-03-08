import { useState } from 'react'
import { Comment } from '@/@types/comment'
import { CommentCard } from './comment-card'
import { CommentsSkeleton } from './comments-skeleton'
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

  const hasMorePages = data?.pagination?.pages && currentPage < data.pagination.pages

  if (isLoading && currentPage === 1) {
    return <CommentsSkeleton />
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
      <div className="text-center py-8 rounded-lg bg-background-base border border-text-border">
        <p className="text-sm text-text-secondary">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {allComments.map(comment => (
        <CommentCard key={comment.id} comment={comment} bookId={bookId} />
      ))}

      {hasMorePages && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}
