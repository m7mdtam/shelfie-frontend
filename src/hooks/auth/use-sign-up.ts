import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { setToken } from '@/lib/cookies'
import { signUpSchema, SignUpFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getErrorMessage } from '@/utils'
import { ROUTES } from '@/utils/api/routes'

export const useSignUpForm = () => {
  const navigate = useNavigate()
  const { mutate: signUp, isPending: isSignUpPending } = auth.useSignUp()
  const { mutate: signIn, isPending: isSignInPending } = auth.useSignIn()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    signUp(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          // After signup, automatically sign in with the same credentials
          signIn(
            {
              email: data.email,
              password: data.password,
            },
            {
              onSuccess: (loginResponse: any) => {
                if (loginResponse.token) {
                  setToken(loginResponse.token)
                }
                navigate({ to: ROUTES.SIGN_UP_SUCCESS })
              },
              onError: (error: Error) => {
                const errorMessage = getErrorMessage(error)
                form.setError('root', {
                  type: 'manual',
                  message: `Account created but auto-login failed: ${errorMessage}`,
                })
              },
            }
          )
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
    isPending: isSignUpPending || isSignInPending,
  }
}
