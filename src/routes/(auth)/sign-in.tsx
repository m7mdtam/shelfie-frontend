import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignInPage } from '@/pages'
import { getToken } from '@/lib/cookies'
import { isTokenExpired } from '@/lib/jwt'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: () => {
    const token = getToken()
    if (token && !isTokenExpired(token)) throw redirect({ to: '/books' })
  },
  component: SignInPage,
})
