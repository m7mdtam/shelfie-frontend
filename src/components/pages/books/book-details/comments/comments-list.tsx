import { useState } from 'react'
import { motion } from 'motion/react'
import { useCommentsListPreset, useCommentItemPreset } from '@/lib/animations'
import { Comment } from '@/@types/comment'
import { CommentCard } from './comment-card'

function AnimatedCommentItem({ comment, bookId, index }: { comment: Comment; bookId: string; index: number }) {
  const itemPreset = useCommentItemPreset(index)
  return (
    <motion.div {...itemPreset}>
      <CommentCard comment={comment} bookId={bookId} />
    </motion.div>
  )
}
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
  const commentsListPreset = useCommentsListPreset()

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
    <motion.div className="space-y-4" {...commentsListPreset}>
      {allComments.map((comment, index) => (
        <AnimatedCommentItem key={comment.id} comment={comment} bookId={bookId} index={index} />
      ))}

      {hasMorePages && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Load More'}
          </Button>
        </div>
      )}
    </motion.div>
  )
}
