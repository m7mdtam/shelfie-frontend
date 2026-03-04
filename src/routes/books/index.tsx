import { createFileRoute } from '@tanstack/react-router'
import { BooksListPage } from '@/pages/books-list'

export const Route = createFileRoute('/books/')({
  component: BooksListPage,
})
