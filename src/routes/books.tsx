import { createFileRoute, Outlet } from '@tanstack/react-router'

function BooksLayout() {
  return (
    <div className="min-h-screen bg-background-base flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/books')({
  component: BooksLayout,
})
