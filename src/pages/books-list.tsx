import { useListBooks } from '@/api/books'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { BookOpen, Plus } from 'lucide-react'

export function BooksListPage() {
  const { data, isLoading, error } = useListBooks({ limit: 20, page: 1 })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-base p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-background-surface rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-base flex items-center justify-center p-4">
        <Card variant="default" className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-state-error">Error Loading Books</CardTitle>
            <CardDescription>{error?.message || 'Failed to load your books'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()} className="w-full" variant="default">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const books = data?.docs || []
  const isEmpty = books.length === 0

  return (
    <div className="min-h-screen bg-background-base p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">My Books</h1>
            <p className="text-text-secondary">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
            </p>
          </div>
          <Link to="/books/add">
            <Button variant="default" className="flex gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Book
            </Button>
          </Link>
        </div>

        {isEmpty ? (
          <Card variant="outlined" className="w-full text-center p-8 md:p-12">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-16 h-16 text-text-secondary" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-2">
              No books yet
            </h2>
            <p className="text-text-secondary mb-6">
              Start building your collection by adding your first book
            </p>
            <Link to="/books/add">
              <Button variant="default">Add Your First Book</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {books.map(book => (
              <a
                key={book.id}
                href={`/books/${book.id}`}
                className="transition-all hover:transform hover:scale-105 no-underline"
              >
                <Card
                  variant="default"
                  className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="h-40 md:h-48 bg-gradient-to-br from-accent-primary-hover to-accent-primary rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white opacity-50" />
                  </div>

                  <CardHeader className="flex-1">
                    <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                    <CardDescription className="line-clamp-1">{book.author}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                      {book.genre && (
                        <div>
                          <span className="text-text-secondary">Genre</span>
                          <p className="text-text-primary font-medium">{book.genre}</p>
                        </div>
                      )}
                      {book.status && (
                        <div>
                          <span className="text-text-secondary">Status</span>
                          <Badge className="mt-1">{book.status}</Badge>
                        </div>
                      )}
                    </div>

                    {book.rating && (
                      <div className="flex items-center gap-2 pt-2 border-t border-input">
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < (book.rating || 0)
                                  ? 'text-accent-primary'
                                  : 'text-text-tertiary'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-text-secondary ml-auto">{book.rating}/5</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
