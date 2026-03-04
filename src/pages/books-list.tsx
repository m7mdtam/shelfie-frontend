import { useState } from 'react'
import { auth } from '@/api'
import { VirtualizedBooksList } from '@/components/pages/books/VirtualizedBooksList'
import { DeleteBookDialog } from '@/components/pages/books/DeleteBookDialog'
import { BookFilters } from '@/components/pages/books/BookFilters'
import { Book } from '@/@types/book'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
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

export function BooksListPage() {
  const { data: user } = auth.useGetMe()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleEdit = (book: Book) => {
    window.location.href = `/books/${book.id}/edit`
  }

  const handleDeleteConfirm = () => {
    if (selectedBook) {
      console.log('Delete book:', selectedBook.id)
      // TODO: Call delete mutation here
      setDeleteDialogOpen(false)
      setSelectedBook(null)
    }
  }

  const handleCardDelete = (book: Book) => {
    setSelectedBook(book)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background-base p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">My Books</h1>
            <p className="text-text-secondary">Manage your book collection</p>
          </div>
          <Link to="/books/add">
            <Button variant="default" className="flex gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Book
            </Button>
          </Link>
        </div>

        <BookFilters
          search={search}
          onSearchChange={setSearch}
          genre={genre}
          onGenreChange={setGenre}
          status={status}
          onStatusChange={setStatus}
          genres={GENRES}
          statuses={STATUSES}
        />

        <VirtualizedBooksList
          isOwner={!!user}
          onEdit={handleEdit}
          onDelete={handleCardDelete}
          limit={50}
        />

        {selectedBook && (
          <DeleteBookDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            bookTitle={selectedBook.title || 'Book'}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  )
}
