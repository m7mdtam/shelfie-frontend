import { createFileRoute, redirect } from '@tanstack/react-router'
import { ProfilePage } from '@/pages/app/profile'
import { getToken } from '@/lib/cookies'
import { isTokenExpired } from '@/lib/jwt'

export const Route = createFileRoute('/profile/')({
  beforeLoad: () => {
    const token = getToken()
    if (!token || isTokenExpired(token)) {
      throw redirect({
        to: '/sign-in',
      })
    }
  },
  component: ProfilePage,
})
