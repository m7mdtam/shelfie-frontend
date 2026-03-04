import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/books/$bookId')({
  component: () => (
    <div className="min-h-screen bg-background-base flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary">Book Details</h1>
        <p className="text-text-secondary mt-2">Coming soon...</p>
      </div>
    </div>
  ),
})
