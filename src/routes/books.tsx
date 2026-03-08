import { createFileRoute, Outlet } from '@tanstack/react-router'

function BooksLayout() {
  return <Outlet />
}

export const Route = createFileRoute('/books')({
  component: BooksLayout,
})
