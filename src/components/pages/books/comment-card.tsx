import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Comment } from '@/@types/comment'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useAuthContext } from '@/contexts/auth'
import { auth as authHooks } from '@/api/auth/hooks'
import { useDeleteComment, useUpdateComment } from '@/hooks/pages/books/use-comments'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { Trash2, Edit2, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface CommentCardProps {
  comment: Comment
  bookId: string
}

export function CommentCard({ comment, bookId }: CommentCardProps) {
  const auth = useAuthContext()
  const isMobile = useIsMobile()
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const deleteComment = useDeleteComment(bookId)
  const updateComment = useUpdateComment(bookId)

  const isOwner = String(auth.decodedToken?.id) === String(comment.userId)
  const isLongComment = comment.text.length > 300

  const { data: commentUserData } = authHooks.useGetUserById(comment.user?.id ?? '')
  const profileImageUrl =
    commentUserData?.profileImage?.sizes?.[0]?.url ||
    commentUserData?.profileImage?.url ||
    comment.user?.profileImage?.sizes?.[0]?.url ||
    comment.user?.profileImage?.url

  const handleDelete = () => {
    deleteComment.mutate(comment.id)
    setIsDeleteDialogOpen(false)
  }

  const handleSaveEdit = async () => {
    if (editText.trim() === comment.text) {
      setIsEditing(false)
      return
    }

    try {
      await updateComment.mutateAsync({
        commentId: comment.id,
        payload: { text: editText.trim() },
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update comment:', error)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const userName = comment.user
    ? `${comment.user.firstName} ${comment.user.lastName}`
    : 'Deleted User'
  const userInitials = comment.user
    ? `${comment.user.firstName[0]}${comment.user.lastName[0]}`.toUpperCase()
    : '?'

  return (
    <Card variant="default" className="p-4">
      <div className="flex gap-4">
        {comment.user ? (
          isOwner ? (
            <Link to="/profile" className="shrink-0">
              <Avatar className="w-10 h-10 hover:ring-2 hover:ring-accent-primary transition-all">
                <AvatarImage
                  src={profileImageUrl}
                  alt={userName}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/profile/$userId" params={{ userId: comment.user.id }} className="shrink-0">
              <Avatar className="w-10 h-10 hover:ring-2 hover:ring-accent-primary transition-all">
                <AvatarImage
                  src={profileImageUrl}
                  alt={userName}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Link>
          )
        ) : (
          <Avatar className="w-10 h-10 shrink-0">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              {comment.user ? (
                isOwner ? (
                  <Link
                    to="/profile"
                    className="font-medium text-sm text-text-primary hover:text-accent-primary transition-colors"
                  >
                    {userName}
                  </Link>
                ) : (
                  <Link
                    to="/profile/$userId"
                    params={{ userId: comment.user.id }}
                    className="font-medium text-sm text-text-primary hover:text-accent-primary transition-colors"
                  >
                    {userName}
                  </Link>
                )
              ) : (
                <p className="font-medium text-sm text-text-primary">{userName}</p>
              )}
              <p className="text-xs text-text-secondary">{formatDate(comment.createdAt)}</p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  className="h-8 w-8 p-0"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={deleteComment.isPending}
                  className="h-8 w-8 p-0 text-state-error hover:text-state-error"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                autoFocus
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditText(comment.text)
                  }}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveEdit} disabled={updateComment.isPending}>
                  {updateComment.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-base text-text-primary leading-relaxed whitespace-pre-wrap">
                {isExpanded || !isLongComment
                  ? comment.text
                  : `${comment.text.substring(0, 300)}...`}
              </p>
              {isLongComment && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-auto p-0 text-accent-primary hover:text-accent-primary"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {isMobile ? (
        <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="sr-only">Delete Comment</DrawerTitle>
              <DrawerDescription className="sr-only">Confirm deletion of comment</DrawerDescription>
            </DrawerHeader>
            <div className="px-6 pb-2">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-state-error-bg flex items-center justify-center shrink-0">
                  <Trash2 className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Delete comment?</p>
                  <p className="text-sm text-text-secondary mt-1">This action cannot be undone.</p>
                </div>
              </div>
            </div>
            <DrawerFooter className="justify-center">
              <DrawerClose asChild>
                <Button variant="outline" disabled={deleteComment.isPending}>
                  Cancel
                </Button>
              </DrawerClose>
              <Button variant="error" onClick={handleDelete} disabled={deleteComment.isPending}>
                {deleteComment.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="w-[22vw]">
            <DialogHeader>
              <DialogTitle className="sr-only">Delete Comment</DialogTitle>
              <DialogDescription className="sr-only">Confirm deletion of comment</DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-state-error-bg flex items-center justify-center shrink-0">
                  <Trash2 className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Delete comment?</p>
                  <p className="text-sm text-text-secondary mt-1">This action cannot be undone.</p>
                </div>
              </div>
            </div>
            <DialogFooter className="justify-center">
              <DialogClose asChild>
                <Button variant="outline" disabled={deleteComment.isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="error" onClick={handleDelete} disabled={deleteComment.isPending}>
                {deleteComment.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
