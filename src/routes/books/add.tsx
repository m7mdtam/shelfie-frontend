import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/books/add')({
  beforeLoad: () => {
    throw redirect({ to: '/books/shelf' })
  },
  component: () => null,
})
