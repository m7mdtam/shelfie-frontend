import { useGetBook, useDeleteBook, useUpdateBook } from '@/api/books'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BookForm } from '@/components/pages/books/BookForm'
import { BookOpen, Edit2, Trash2, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useAuthContext } from '@/contexts/auth'

const GENRES = [
  'fiction', 'non-fiction', 'fantasy', 'science-fiction', 'mystery',
  'thriller', 'romance', 'historical-fiction', 'biography', 'self-help', 'other',
]
const STATUSES = ['want-to-read', 'reading', 'finished']

const formatLabel = (value: string) =>
  value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

export function BookDetailPage() {
  const params = useParams({ from: '/books/$bookId' })
  const navigate = useNavigate()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const auth = useAuthContext()
  const { data: book, isLoading, error } = useGetBook(params.bookId)
  const deleteBook = useDeleteBook()
  const updateBook = useUpdateBook(params.bookId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-base p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-background-surface rounded w-32" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64 h-96 bg-background-surface rounded-lg" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-background-surface rounded w-3/4" />
                <div className="h-6 bg-background-surface rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-background-surface rounded w-full" />
                  <div className="h-4 bg-background-surface rounded w-full" />
                  <div className="h-4 bg-background-surface rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background-base p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => navigate({ to: '/books' })} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Button>
          <Card variant="default" className="text-center p-8">
            <CardTitle className="text-state-error">Book Not Found</CardTitle>
            <CardDescription className="mt-2">
              {error?.message || 'Unable to load book details'}
            </CardDescription>
          </Card>
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

  return (
    <>
      <div className="min-h-screen bg-background-base p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => navigate({ to: '/books' })} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 md:col-span-1">
              <div className="w-full bg-gradient-to-br from-accent-primary-hover to-accent-primary rounded-lg h-80 flex items-center justify-center sticky top-4 overflow-hidden">
                {book.coverImage?.url ? (
                  <img src={book.coverImage.url} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen className="w-24 h-24 text-white opacity-50" />
                )}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <Card variant="default" className="mb-6">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl md:text-3xl mb-2">{book.title}</CardTitle>
                      <CardDescription className="text-base">{book.author}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {book.notes && (
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary mb-2">Notes</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{book.notes}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {book.genre && (
                      <div>
                        <span className="text-xs text-text-secondary">Genre</span>
                        <p className="text-sm font-medium text-text-primary mt-1">{formatLabel(book.genre)}</p>
                      </div>
                    )}

                    {book.status && (
                      <div>
                        <span className="text-xs text-text-secondary">Status</span>
                        <Badge className="mt-2">{formatLabel(book.status)}</Badge>
                      </div>
                    )}

                    {book.rating && (
                      <div>
                        <span className="text-xs text-text-secondary">Rating</span>
                        <div className="flex gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < (book.rating || 0) ? 'text-accent-primary' : 'text-text-tertiary'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {book.isPublic !== undefined && (
                      <div>
                        <span className="text-xs text-text-secondary">Visibility</span>
                        <p className="text-sm font-medium text-text-primary mt-1">
                          {book.isPublic ? 'Public' : 'Private'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {isOwner && (
                <div className="flex gap-2">
                  <Button onClick={() => setEditOpen(true)} variant="default" className="flex gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>

                  {!showDeleteConfirm ? (
                    <Button
                      onClick={() => setShowDeleteConfirm(true)}
                      variant="error"
                      className="flex gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleDelete} variant="error" disabled={deleteBook.isPending}>
                        {deleteBook.isPending ? 'Deleting...' : 'Confirm Delete'}
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        variant="outline"
                        disabled={deleteBook.isPending}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update "{book.title}"</DialogDescription>
          </DialogHeader>
          <BookForm
            mode="edit"
            initialData={book}
            onSubmit={handleEdit}
            isLoading={updateBook.isPending}
            genres={GENRES}
            statuses={STATUSES}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
