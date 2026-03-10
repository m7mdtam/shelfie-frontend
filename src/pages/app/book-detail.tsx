import { useGetBook, useDeleteBook, useUpdateBook } from '@/api/books'
import { getBookOwner } from '@/@types/book'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { DeleteBookDialog } from '@/components/pages/books/book-details/delete-book-dialog'
import { BookForm } from '@/components/pages/books/book-form'
import { PageSection } from '@/components/common/page-section'
import { CommentsSection } from '@/components/pages/books/book-details/comments/comments-section'
import { BookDetailCover } from '@/components/pages/books/book-details/book-detail-cover'
import { ArrowLeft } from 'lucide-react'
import { useAuthContext } from '@/contexts/auth'
import { useIsMobile } from '@/hooks/use-is-mobile'

const GENRES = [
  'fiction',
  'non-fiction',
  'fantasy',
  'science-fiction',
  'mystery',
  'thriller',
  'romance',
  'historical-fiction',
  'biography',
  'self-help',
  'other',
]

export function BookDetailPage() {
  const params = useParams({ from: '/books/$bookId' })
  const navigate = useNavigate()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const auth = useAuthContext()
  const isMobile = useIsMobile()
  const { data: book, isLoading, error, refetch } = useGetBook(params.bookId)
  const deleteBook = useDeleteBook()
  const updateBook = useUpdateBook(params.bookId)

  useEffect(() => {
    refetch()
  }, [auth.decodedToken?.id, refetch])

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <div className="h-9 w-24 bg-background-surface rounded-md animate-pulse" />
          <PageSection>
            <div className="animate-pulse flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-44 h-56 sm:h-64 bg-background-base rounded-lg shrink-0" />
              <div className="flex-1 flex flex-col gap-3">
                <div className="h-7 bg-background-base rounded w-3/4" />
                <div className="h-5 bg-background-base rounded w-1/2" />
                <div className="flex gap-2 mt-1">
                  <div className="h-5 w-16 bg-background-base rounded-full" />
                  <div className="h-5 w-16 bg-background-base rounded-full" />
                </div>
                <div className="h-4 bg-background-base rounded w-full mt-2" />
                <div className="h-4 bg-background-base rounded w-full" />
                <div className="h-4 bg-background-base rounded w-2/3" />
              </div>
            </div>
          </PageSection>

          <PageSection>
            <div className="animate-pulse flex flex-col gap-3">
              <div className="h-4 w-40 bg-background-surface rounded" />
              <div className="h-3 w-full bg-background-surface rounded" />
              <div className="h-3 w-full bg-background-surface rounded" />
              <div className="h-3 w-3/4 bg-background-surface rounded" />
            </div>
          </PageSection>

          <CommentsSection
            bookId={params.bookId}
            userRating={null}
            isLoading={true}
          />
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-fit flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <PageSection className="text-center py-10">
            <p className="text-state-error font-semibold text-lg">Book Not Found</p>
            <p className="text-text-secondary text-sm mt-1">
              {error?.message || 'Unable to load book details'}
            </p>
          </PageSection>
        </div>
      </div>
    )
  }

  const handleDelete = async () => {
    try {
      await deleteBook.mutateAsync(params.bookId)
      navigate({ to: '/books/shelf' })
    } catch {
      // Handle error silently
    }
  }

  const handleEdit = async (data: any) => {
    try {
      await updateBook.mutateAsync(data)
      setEditOpen(false)
    } catch {
      // Handle error silently
    }
  }

  const isAuthenticated = !!auth.decodedToken
  const bookOwner = getBookOwner(book.owner)
  const isOwner = isAuthenticated && String(auth.decodedToken?.id) === String(bookOwner?.id)

  const editFormContent = (
    <BookForm
      mode="edit"
      initialData={book}
      onSubmit={handleEdit}
      isLoading={updateBook.isPending}
      genres={GENRES}
    />
  )

  return (
    <>
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-fit flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <BookDetailCover
            book={book}
            isOwner={isOwner}
            onEdit={() => setEditOpen(true)}
            onDelete={() => setDeleteOpen(true)}
          />

          {book.description && (
            <PageSection>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
                Notes from the Poster
              </p>
              <p className="text-sm text-text-primary leading-relaxed">{book.description}</p>
            </PageSection>
          )}

          <CommentsSection
            bookId={book.id}
            userRating={book.userRating}
          />
        </div>
      </div>

      {isMobile ? (
        <Drawer open={editOpen} onOpenChange={setEditOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Book</DrawerTitle>
              <DrawerDescription>Update "{book.title}"</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>{editFormContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
              <DialogDescription>Update "{book.title}"</DialogDescription>
            </DialogHeader>
            <DialogBody>{editFormContent}</DialogBody>
          </DialogContent>
        </Dialog>
      )}

      <DeleteBookDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        bookTitle={book.title}
        onConfirm={handleDelete}
        isLoading={deleteBook.isPending}
      />
    </>
  )
}
