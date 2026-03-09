import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { forgotPasswordSchema, ForgotPasswordFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getForgotPasswordError } from '@/api/auth/error-handler'

export const useForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { mutate: forgotPassword, isPending } = auth.useForgotPassword()

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    forgotPassword(
      { email: data.email },
      {
        onSuccess: () => {
          sessionStorage.setItem('reset_password_email', data.email)
          setIsSuccess(true)
        },
        onError: (error: Error) => {
          const { field, message } = getForgotPasswordError(error)
          form.setError(field as 'root' | 'email', { type: 'manual', message })
        },
      }
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    isSuccess,
  }
}
