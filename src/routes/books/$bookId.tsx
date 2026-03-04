import { createFileRoute } from '@tanstack/react-router'
import { BookDetailPage } from '@/pages/book-detail'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetailPage,
})
