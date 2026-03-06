import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { VerifyEmailPage } from '@/pages'

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: z.object({ token: z.string() }),
  component: VerifyEmailPage,
})
