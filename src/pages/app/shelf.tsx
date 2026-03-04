import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useBookList, useBookForm } from '@/hooks/pages/books'
import { useAuthContext } from '@/contexts/auth'
import { BookFilters } from '@/components/pages/books/BookFilters'
import { DeleteBookDialog } from '@/components/pages/books/DeleteBookDialog'
import { BookForm } from '@/components/pages/books/BookForm'
import { BookCard } from '@/components/pages/books/BookCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Fantasy',
  'Thriller',
  'Romance',
  'Mystery',
  'Biography',
]

const STATUSES = ['Want to Read', 'Reading', 'Completed']

export function ShelfPage() {
  const auth = useAuthContext()
  const bookList = useBookList({ limit: 50, ownerId: auth.decodedToken?.id })
  const bookForm = useBookForm()
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: bookList.hasNextPage ? bookList.allBooks.length + 1 : bookList.allBooks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 10,
  })

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  const paddingStart = virtualItems.length > 0 ? (virtualItems?.[0]?.start ?? 0) : 0
  const paddingEnd =
    virtualItems.length > 0 ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end ?? 0) : 0

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= bookList.allBooks.length - 1 &&
      bookList.hasNextPage &&
      !bookList.isFetchingNextPage
    ) {
      bookList.fetchNextPage()
    }
  }, [
    virtualItems,
    bookList.allBooks.length,
    bookList.hasNextPage,
    bookList.isFetchingNextPage,
    bookList.fetchNextPage,
  ])

  if (!auth.isAuthenticated || !auth.decodedToken?.id) {
    return (
      <div className="min-h-screen bg-background-base p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Card variant="default" className="text-center">
            <CardHeader>
              <CardTitle>Sign in Required</CardTitle>
              <CardDescription>You need to be signed in to view your shelf</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-base p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">My Shelf</h1>
            <p className="text-text-secondary">Manage your personal book collection</p>
          </div>
          <Button
            onClick={() => bookForm.openCreate()}
            variant="default"
            className="flex gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Book
          </Button>
        </div>

        <BookFilters
          search={bookList.search}
          onSearchChange={bookList.setSearch}
          genre={bookList.genre}
          onGenreChange={bookList.setGenre}
          status={bookList.status}
          onStatusChange={bookList.setStatus}
          genres={GENRES}
          statuses={STATUSES}
        />

        {bookList.isLoading && bookList.allBooks.length === 0 ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-background-surface rounded-lg animate-pulse" />
            ))}
          </div>
        ) : bookList.error ? (
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-state-error">Error Loading Your Books</CardTitle>
              <CardDescription>
                {bookList.error?.message || 'Failed to load your books'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.reload()} className="w-full" variant="default">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : bookList.allBooks.length === 0 ? (
          <Card variant="default" className="text-center">
            <CardHeader>
              <CardTitle>No Books Yet</CardTitle>
              <CardDescription>Add your first book to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => bookForm.openCreate()} className="w-full" variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Book
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            <p className="text-sm text-text-secondary mb-4">
              {bookList.allBooks.length} of {bookList.totalCount} books
            </p>
            <div
              ref={parentRef}
              className="h-[800px] overflow-y-auto"
              style={{
                contain: 'strict',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem',
                  paddingTop: paddingStart,
                  paddingBottom: paddingEnd,
                }}
              >
                {virtualItems.map(virtualItem => {
                  const isLoaderRow = virtualItem.index > bookList.allBooks.length - 1
                  const book = bookList.allBooks[virtualItem.index]

                  return (
                    <div key={virtualItem.key} data-index={virtualItem.index}>
                      {isLoaderRow ? (
                        <div className="flex items-center justify-center p-4">
                          {bookList.isFetchingNextPage && <div className="animate-spin">⟳</div>}
                        </div>
                      ) : (
                        <BookCard
                          book={book}
                          isOwner={true}
                          onEdit={b => bookForm.openEdit(b)}
                          onDelete={b => bookForm.openDelete(b)}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={bookForm.formOpen} onOpenChange={bookForm.setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{bookForm.mode === 'create' ? 'Add Book' : 'Edit Book'}</DialogTitle>
            <DialogDescription>
              {bookForm.mode === 'create'
                ? 'Add a new book to your shelf'
                : 'Update book information'}
            </DialogDescription>
          </DialogHeader>
          <BookForm
            mode={bookForm.mode}
            initialData={bookForm.selectedBook || undefined}
            onSubmit={bookForm.submitForm}
            isLoading={bookForm.isCreating || bookForm.isUpdating}
            genres={GENRES}
            statuses={STATUSES}
          />
        </DialogContent>
      </Dialog>

      <DeleteBookDialog
        open={bookForm.deleteDialogOpen}
        onOpenChange={bookForm.setDeleteDialogOpen}
        bookTitle={bookForm.selectedBook?.title || 'Book'}
        onConfirm={bookForm.confirmDelete}
        isLoading={bookForm.isDeleting}
      />
    </div>
  )
}

export default ShelfPage
