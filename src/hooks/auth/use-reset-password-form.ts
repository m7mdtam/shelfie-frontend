import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { resetPasswordSchema, ResetPasswordFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getErrorMessage } from '@/utils'
import { ROUTES } from '@/utils/api/routes'

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
        onSuccess: () => {
          navigate({ to: ROUTES.SIGN_IN })
        },
        onError: (error: Error) => {
          const errorMessage = getErrorMessage(error)
          form.setError('root', {
            type: 'manual',
            message: errorMessage,
          })
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
