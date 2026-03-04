import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/books/$bookId/edit')({
  beforeLoad: ({ params }) => {
    throw redirect({ to: '/books/$bookId', params: { bookId: params.bookId } })
  },
  component: () => null,
})
