import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuthContext } from '@/contexts/auth'
import { useEffect } from 'react'

export const Route = createFileRoute('/books/')({
  component: BooksIndexPage,
})

function BooksIndexPage() {
  const auth = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({ to: '/books/shelf' })
    } else {
      navigate({ to: '/books/explore' })
    }
  }, [auth.isAuthenticated, navigate])

  return null
}
