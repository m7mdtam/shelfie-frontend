import { useGetBook, useDeleteBook, useUpdateBook } from '@/api/books'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { DeleteBookDialog } from '@/components/pages/books/delete-book-dialog'
import { BookForm } from '@/components/pages/books/book-form'
import { PageSection } from '@/components/page-section'
import { Star, Download, Edit2, Trash2, ArrowLeft, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useAuthContext } from '@/contexts/auth'
import { useIsMobile } from '@/hooks/use-is-mobile'
import fallbackImage from '@/assets/images/fallbackImage.jfif'

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

const formatLabel = (value: string) =>
  value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

export function BookDetailPage() {
  const params = useParams({ from: '/books/$bookId' })
  const navigate = useNavigate()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const auth = useAuthContext()
  const isMobile = useIsMobile()
  const { data: book, isLoading, error } = useGetBook(params.bookId)
  const deleteBook = useDeleteBook()
  const updateBook = useUpdateBook(params.bookId)

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col bg-background-base p-4 md:p-6">
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
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="flex-1 flex flex-col bg-background-base p-4 md:p-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <Button
            onClick={() => navigate({ to: '/books' })}
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
      navigate({ to: '/books' })
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleEdit = async (data: any) => {
    try {
      await updateBook.mutateAsync(data)
      setEditOpen(false)
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  const isOwner = String(auth.decodedToken?.id) === String(book.owner.id)

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
      <div className="flex-1 flex flex-col bg-background-base p-4 md:p-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <Button
            onClick={() => navigate({ to: '/books' })}
            variant="outline"
            className="w-fit flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <PageSection>
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Cover */}
              <div className="w-full sm:w-44 shrink-0 rounded-lg overflow-hidden self-start">
                <img
                  src={book.coverImage?.url ?? fallbackImage}
                  alt={book.title}
                  className="w-full h-56 sm:h-64 object-cover dark:brightness-75"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col gap-4 min-w-0">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                    {book.title}
                  </h1>
                  <p className="text-sm sm:text-base text-text-secondary mt-1">{book.author}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {book.genre && <Badge variant="muted">{formatLabel(book.genre)}</Badge>}
                  {book.isPublic !== undefined && (
                    <Badge variant="muted">{book.isPublic ? 'Public' : 'Private'}</Badge>
                  )}
                  {book.isDownloadable && (
                    <Badge variant="muted" className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                {book.rating ? (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < (book.rating || 0) ? (
                        <Star key={i} className="w-4 h-4 fill-star-filled text-star-filled" />
                      ) : (
                        <Star key={i} className="w-4 h-4 text-text-secondary" />
                      )
                    )}
                    <span className="text-sm text-text-secondary ml-1">{book.rating}/5</span>
                  </div>
                ) : null}

                {/* Download */}
                {book.isDownloadable && book.downloadLink && (
                  <Button
                    variant="outline"
                    className="w-fit flex items-center gap-2"
                    onClick={() => window.open(book.downloadLink, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Download
                  </Button>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {isOwner && (
                    <>
                      <Button
                        variant="default"
                        className="flex items-center gap-2"
                        onClick={() => setEditOpen(true)}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="error"
                        className="flex items-center gap-2"
                        onClick={() => setDeleteOpen(true)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </PageSection>

          {book.description && (
            <PageSection>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
                Notes from the author
              </p>
              <p className="text-sm text-text-primary leading-relaxed">{book.description}</p>
            </PageSection>
          )}
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
