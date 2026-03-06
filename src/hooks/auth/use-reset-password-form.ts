import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { resetPasswordSchema, ResetPasswordFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getResetPasswordError } from '@/api/auth/error-handler'
import { loginFn } from '@/api/auth/requests'
import { setToken } from '@/lib/cookies'


export const useResetPasswordForm = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const { mutate: resetPassword, isPending } = auth.useResetPassword()

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    resetPassword(
      { token: (search as Record<string, string>).token, password: data.password },
      {
        onSuccess: async () => {
          const email = sessionStorage.getItem('reset_password_email')
          if (email) {
            try {
              const response = await loginFn({ email, password: data.password })
              if (response.token) {
                setToken(response.token)
                sessionStorage.removeItem('reset_password_email')
                navigate({ to: '/books/shelf' })
                return
              }
            } catch {
              // fall through to sign-in
            }
          }
          navigate({ to: '/sign-in' })
        },
        onError: (error: Error) => {
          const { field, message } = getResetPasswordError(error)
          form.setError(field as 'root' | 'password' | 'confirmPassword', { type: 'manual', message })
        },
      }
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  }
}
