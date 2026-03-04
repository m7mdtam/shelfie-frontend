import { createFileRoute } from '@tanstack/react-router'
import { ShelfPage } from '@/pages/app/shelf'

export const Route = createFileRoute('/books/shelf')({
  component: ShelfPage,
})
