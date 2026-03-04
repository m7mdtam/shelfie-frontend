import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetBook, useUpdateBook } from '@/api/books'
import { useAuthContext } from '@/contexts/auth'
import { BookForm } from '@/components/pages/books/BookForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const GENRES = [
  'fiction', 'non-fiction', 'fantasy', 'science-fiction', 'mystery',
  'thriller', 'romance', 'historical-fiction', 'biography', 'self-help', 'other',
]
const STATUSES = ['want-to-read', 'reading', 'finished']

export function EditBookPage() {
  const params = useParams({ from: '/books/$bookId/edit' })
  const navigate = useNavigate()
  const auth = useAuthContext()

  const { data: book, isLoading, error } = useGetBook(params.bookId)
  const updateBook = useUpdateBook(params.bookId)

  const goBack = () => navigate({ to: '/books/$bookId', params: { bookId: params.bookId } })

  const handleSubmit = async (data: any) => {
    try {
      await updateBook.mutateAsync(data)
      goBack()
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background-base z-50 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto animate-pulse space-y-4">
          <div className="h-10 bg-background-surface rounded w-32" />
          <div className="h-64 bg-background-surface rounded-lg" />
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="fixed inset-0 bg-background-base z-50 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Button onClick={goBack} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Book
          </Button>
          <Card variant="default" className="text-center p-8">
            <CardTitle className="text-state-error">Book Not Found</CardTitle>
            <CardDescription className="mt-2">
              {error?.message || 'Unable to load book'}
            </CardDescription>
          </Card>
        </div>
      </div>
    )
  }

  if (String(auth.decodedToken?.id) !== String(book.owner.id)) {
    navigate({ to: '/books/$bookId', params: { bookId: params.bookId } })
    return null
  }

  return (
    <div className="fixed inset-0 bg-background-base z-50 overflow-y-auto p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Button onClick={goBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Book
        </Button>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Edit Book</CardTitle>
            <CardDescription>Update "{book.title}"</CardDescription>
          </CardHeader>
          <CardContent>
            <BookForm
              mode="edit"
              initialData={book}
              onSubmit={handleSubmit}
              isLoading={updateBook.isPending}
              genres={GENRES}
              statuses={STATUSES}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
