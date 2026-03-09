import { useState } from 'react'
import { motion } from 'motion/react'
import { ANIMATION_DURATION, ANIMATION_STATE } from '@/utils/animations'
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
    <motion.div
      className="space-y-4"
      initial={ANIMATION_STATE.fade.hidden}
      animate={ANIMATION_STATE.fade.visible}
      transition={{ duration: ANIMATION_DURATION.fast }}
    >
      {allComments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={ANIMATION_STATE.slideUpSmall.hidden}
          animate={ANIMATION_STATE.slideUpSmall.visible}
          transition={{ duration: ANIMATION_DURATION.fast, delay: index * 0.05 }}
        >
          <CommentCard comment={comment} bookId={bookId} />
        </motion.div>
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
