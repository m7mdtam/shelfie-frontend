import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'

import { signInSchema, SignInFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getErrorMessage } from '@/utils'
import { ROUTES } from '@/utils/api/routes'

export const useSignInForm = () => {
  const navigate = useNavigate()
  const { mutate: signIn, isPending } = auth.useSignIn()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    signIn(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate({ to: ROUTES.BOOKS })
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
