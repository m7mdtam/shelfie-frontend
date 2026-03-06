import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { ResetPasswordPage } from '@/pages'

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: z.object({ token: z.string() }),
  component: ResetPasswordPage,
})
