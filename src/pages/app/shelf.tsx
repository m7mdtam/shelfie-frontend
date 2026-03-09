import { useBookList, useBookForm } from '@/hooks/pages/books'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { BookFilters } from '@/components/pages/books/book-filters'
import { BookListDisplay } from '@/components/pages/books/book-list-display'
import { DeleteBookDialog } from '@/components/pages/books/book-details/delete-book-dialog'
import { BookForm } from '@/components/pages/books/book-form'
import { PageSection } from '@/components/common/page-section'
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
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

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

export function ShelfPage() {
  const bookList = useBookList({ limit: 10, scope: 'mine' })
  const bookForm = useBookForm()
  const isMobile = useIsMobile()

  const formTitle = bookForm.mode === 'create' ? 'Add Book' : 'Edit Book'
  const formDescription =
    bookForm.mode === 'create' ? 'Add a new book to your shelf' : 'Update book information'
  const formContent = (
    <BookForm
      mode={bookForm.mode}
      initialData={bookForm.selectedBook || undefined}
      onSubmit={bookForm.submitForm}
      isLoading={bookForm.isCreating || bookForm.isUpdating}
      genres={GENRES}
    />
  )

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

        <PageSection>
          <BookFilters
            search={bookList.search}
            onSearchChange={bookList.setSearch}
            genre={bookList.genre}
            onGenreChange={bookList.setGenre}
            downloadable={bookList.downloadable}
            onDownloadableChange={bookList.setDownloadable}
            genres={GENRES}
          />

          <BookListDisplay
            isLoading={bookList.isLoading}
            error={bookList.error}
            books={bookList.allBooks}
            totalCount={bookList.totalCount}
            isFetchingNextPage={bookList.isFetchingNextPage}
            hasNextPage={bookList.hasNextPage}
            onLoadMore={bookList.fetchNextPage}
            isOwner={true}
            onAddBook={() => bookForm.openCreate()}
            emptyTitle="No Books Yet"
            emptyDescription="Add your first book to get started"
          />
        </PageSection>
      </div>

      {isMobile ? (
        <Drawer open={bookForm.formOpen} onOpenChange={bookForm.setFormOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{formTitle}</DrawerTitle>
              <DrawerDescription>{formDescription}</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>{formContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={bookForm.formOpen} onOpenChange={bookForm.setFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{formTitle}</DialogTitle>
              <DialogDescription>{formDescription}</DialogDescription>
            </DialogHeader>
            <DialogBody>{formContent}</DialogBody>
          </DialogContent>
        </Dialog>
      )}

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
