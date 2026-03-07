import { BookCard } from './book-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Book } from '@/@types/book'

interface BookListDisplayProps {
  isLoading: boolean
  error: Error | null
  books: Book[]
  totalCount: number
  isFetchingNextPage?: boolean
  isOwner?: boolean
  onAddBook?: () => void
  emptyTitle?: string
  emptyDescription?: string
}

export function BookListDisplay({
  isLoading,
  error,
  books,
  totalCount,
  isFetchingNextPage = false,
  isOwner = false,
  onAddBook,
  emptyTitle = 'No Books Found',
  emptyDescription = 'Try adjusting your filters',
}: BookListDisplayProps) {
  if (isLoading && books.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-background-surface rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card variant="default" className="border-0">
        <CardHeader>
          <CardTitle className="text-state-error">Error Loading Books</CardTitle>
          <CardDescription>{error?.message || 'Failed to load books'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.reload()} className="w-full" variant="default">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (books.length === 0) {
    return (
      <Card variant="default" className="text-center border-0">
        <CardHeader>
          <CardTitle>{emptyTitle}</CardTitle>
          <CardDescription>{emptyDescription}</CardDescription>
        </CardHeader>
        {isOwner && onAddBook && (
          <CardContent>
            <Button onClick={onAddBook} className="w-full" variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Book
            </Button>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <div className="mt-4 sm:mt-6 rounded-lg p-2 sm:p-4">
      <p className="text-sm text-text-secondary mb-4">
        Showing {books.length} of {totalCount} books
      </p>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin">⟳</div>
        </div>
      )}
    </div>
  )
}
