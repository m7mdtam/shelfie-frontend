import { createFileRoute } from '@tanstack/react-router'
import { ExplorePage } from '@/pages/app/explore'

export const Route = createFileRoute('/books/explore')({
  component: ExplorePage,
})
