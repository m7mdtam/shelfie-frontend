import { createFileRoute, redirect } from '@tanstack/react-router'
import { ShelfPage } from '@/pages/app/shelf'
import { getToken } from '@/lib/cookies'
import { isTokenExpired } from '@/lib/jwt'

export const Route = createFileRoute('/books/shelf')({
  beforeLoad: () => {
    const token = getToken()
    if (!token || isTokenExpired(token)) {
      throw redirect({
        to: '/sign-in',
      })
    }
  },
  component: ShelfPage,
})
