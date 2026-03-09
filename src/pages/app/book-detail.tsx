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
import { DeleteBookDialog } from '@/components/pages/books/delete-book-dialog'
import { BookForm } from '@/components/pages/books/book-form'
import { PageSection } from '@/components/page-section'
import { CommentsSection } from '@/components/pages/books/comments-section'
import { Star, PencilLine, Trash, ArrowLeft, ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@tanstack/react-router'
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
            averageRating={0}
            userRating={null}
            totalRatings={0}
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
      navigate({ to: '/books' })
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

          <PageSection>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-44 shrink-0 rounded-lg overflow-hidden self-start">
                <img
                  src={book.coverImage?.url ?? fallbackImage}
                  alt={book.title}
                  className="w-full h-auto max-h-96 sm:h-64 sm:max-h-none object-contain sm:object-cover dark:brightness-75"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                      {book.title}
                    </h1>
                    <div className="mt-1">
                      <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                        Author
                      </p>
                      <p className="text-sm sm:text-base text-text-primary">{book.author}</p>
                    </div>
                  </div>
                  {isOwner && (
                    <div className="flex shrink-0 gap-2 items-center">
                      <button
                        onClick={() => setEditOpen(true)}
                        className="text-text-secondary hover:text-accent-primary transition-colors cursor-pointer"
                      >
                        <PencilLine className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setDeleteOpen(true)}
                        className="text-state-error/60 hover:text-state-error transition-colors cursor-pointer"
                      >
                        <Trash className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  {book.genre && (
                    <div>
                      <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                        Genre
                      </p>
                      <p className="text-sm text-text-primary">{formatLabel(book.genre)}</p>
                    </div>
                  )}
                  {book.isPublic !== undefined && (
                    <div>
                      <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                        Visibility
                      </p>
                      <p className="text-sm text-text-primary">
                        {book.isPublic ? 'Public' : 'Private'}
                      </p>
                    </div>
                  )}
                </div>

                {bookOwner && (
                  <div>
                    <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">
                      Posted by
                    </p>
                    <Link
                      to="/profile/$userId"
                      params={{ userId: bookOwner.id }}
                      className="flex items-center gap-1.5 text-sm text-text-primary hover:text-accent-primary transition-colors w-fit"
                    >
                      <Avatar className="w-5 h-5 shrink-0">
                        <AvatarImage
                          src={
                            bookOwner.profileImage?.sizes?.[0]?.url || bookOwner.profileImage?.url
                          }
                          alt={`${bookOwner.firstName} ${bookOwner.lastName}`}
                        />
                        <AvatarFallback className="text-[9px]">
                          {bookOwner.firstName[0]}
                          {bookOwner.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {bookOwner.firstName} {bookOwner.lastName}
                    </Link>
                  </div>
                )}

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

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={[
                        'w-4 h-4',
                        i < Math.round(book.averageRating ?? 0)
                          ? 'fill-star-filled text-star-filled'
                          : 'text-text-secondary',
                      ].join(' ')}
                    />
                  ))}
                  <span className="text-sm font-medium text-text-primary ml-0.5">
                    {(book.averageRating ?? 0).toFixed(1)}
                  </span>
                  <span className="text-sm text-text-secondary">
                    ({book.totalRatings ?? 0}{' '}
                    {(book.totalRatings ?? 0) === 1 ? 'rating' : 'ratings'})
                  </span>
                </div>
              </div>
            </div>
          </PageSection>

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
            averageRating={book.averageRating}
            userRating={book.userRating}
            totalRatings={book.totalRatings}
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
