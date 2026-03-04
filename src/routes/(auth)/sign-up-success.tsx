import { createFileRoute } from '@tanstack/react-router'
import { SignUpSuccessPage } from '@/pages'

export const Route = createFileRoute('/(auth)/sign-up-success')({
  component: SignUpSuccessPage,
})
