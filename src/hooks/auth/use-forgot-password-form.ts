import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { forgotPasswordSchema, ForgotPasswordFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getErrorMessage } from '@/utils'

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
          setIsSuccess(true)
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
    isSuccess,
  }
}
