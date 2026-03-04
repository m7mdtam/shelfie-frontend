import { createFileRoute } from '@tanstack/react-router'
import { useAuthContext } from '@/contexts/auth'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/books')({
  component: BooksPage,
})

function BooksPage() {
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
