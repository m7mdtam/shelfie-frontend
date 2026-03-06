import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { signUpSchema, SignUpFormData } from '@/schemas'
import { auth } from '@/api/auth/hooks'
import { getSignUpError } from '@/api/auth/error-handler'
import { ROUTES } from '@/utils/api/routes'

export const useSignUpForm = () => {
  const navigate = useNavigate()
  const { mutate: signUp, isPending } = auth.useSignUp()

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
          sessionStorage.setItem('pending_verification_email', data.email)
          sessionStorage.setItem('pending_verification_password', data.password)
          navigate({ to: ROUTES.SIGN_UP_SUCCESS })
        },
        onError: (error: Error) => {
          const { field, message } = getSignUpError(error)
          form.setError(field as 'root' | 'email' | 'password' | 'firstName' | 'lastName', { type: 'manual', message })
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
