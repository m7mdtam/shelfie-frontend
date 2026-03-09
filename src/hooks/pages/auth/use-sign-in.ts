import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'

import { signInSchema, SignInFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getSignInError } from '@/api/auth/error-handler'
import { ROUTES } from '@/utils/api/routes'
import { setToken } from '@/lib/cookies'

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
        onSuccess: data => {
          setToken(data.token)
          navigate({ to: ROUTES.BOOKS })
        },
        onError: (error: Error) => {
          const { field, message } = getSignInError(error)
          form.setError(field as 'root' | 'email' | 'password', { type: 'manual', message })
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
