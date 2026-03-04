import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/books')({
  component: BooksPage,
})

function BooksPage() {
  return (
    <div className="min-h-screen bg-background-base p-4">
      <h1 className="text-2xl font-bold text-text-primary">Books</h1>
      <p className="text-text-secondary mt-2">Coming soon...</p>
    </div>
  )
}
