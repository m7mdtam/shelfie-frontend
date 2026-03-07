import { createFileRoute } from '@tanstack/react-router'
import { PublicProfilePage } from '@/pages/app/public-profile'

export const Route = createFileRoute('/profile/$userId')({
  component: PublicProfilePage,
})
