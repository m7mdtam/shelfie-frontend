import { useNavigate } from '@tanstack/react-router'
import { useCreateBook } from '@/api/books'
import { BookForm } from '@/components/pages/books/BookForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useAuthContext } from '@/contexts/auth'

const GENRES = [
  'fiction', 'non-fiction', 'fantasy', 'science-fiction', 'mystery',
  'thriller', 'romance', 'historical-fiction', 'biography', 'self-help', 'other',
]
const STATUSES = ['want-to-read', 'reading', 'finished']

export function AddBookPage() {
  const navigate = useNavigate()
  const auth = useAuthContext()
  const createBook = useCreateBook()

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-base p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Card variant="default" className="text-center p-8">
            <CardTitle>Sign in Required</CardTitle>
            <CardDescription className="mt-2">You need to be signed in to add books</CardDescription>
          </Card>
        </div>
      </div>
    )
  }

  const handleSubmit = async (data: any) => {
    try {
      const book = await createBook.mutateAsync(data)
      navigate({ to: '/books/$bookId', params: { bookId: book.id } })
    } catch (err) {
      console.error('Create failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background-base p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Button onClick={() => navigate({ to: '/books/shelf' })} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shelf
        </Button>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Add Book</CardTitle>
            <CardDescription>Add a new book to your shelf</CardDescription>
          </CardHeader>
          <CardContent>
            <BookForm
              mode="create"
              onSubmit={handleSubmit}
              isLoading={createBook.isPending}
              genres={GENRES}
              statuses={STATUSES}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
