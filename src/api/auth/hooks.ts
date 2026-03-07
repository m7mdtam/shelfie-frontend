import { useMutation, useQuery } from '@tanstack/react-query'
import { loginFn, registerFn, logoutFn, getMeFn, forgotPasswordFn, resetPasswordFn, verifyEmailFn, getUserByIdFn } from './requests'
import { authKeys } from './keys'
import { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest } from './types'

export const auth = {
  useSignIn: () => {
    return useMutation({
      mutationFn: (data: LoginRequest) => loginFn(data),
      mutationKey: authKeys.signIn(),
    })
  },

  useSignUp: () => {
    return useMutation({
      mutationFn: (data: RegisterRequest) => registerFn(data),
      mutationKey: authKeys.register(),
    })
  },

  useLogout: () => {
    return useMutation({
      mutationFn: () => logoutFn(),
      mutationKey: authKeys.logout(),
    })
  },

  useGetMe: (enabled: boolean = true) => {
    return useQuery({
      queryKey: authKeys.getMe(),
      queryFn: getMeFn,
      enabled,
    })
  },

  useForgotPassword: () => {
    return useMutation({
      mutationFn: (data: ForgotPasswordRequest) => forgotPasswordFn(data),
      mutationKey: authKeys.forgotPassword(),
    })
  },

  useResetPassword: () => {
    return useMutation({
      mutationFn: (data: ResetPasswordRequest) => resetPasswordFn(data),
      mutationKey: authKeys.resetPassword(),
    })
  },

  useVerifyEmail: () => {
    return useMutation({
      mutationFn: (data: VerifyEmailRequest) => verifyEmailFn(data),
      mutationKey: authKeys.verifyEmail(),
    })
  },

  useGetUserById: (id: string, enabled = true) => {
    return useQuery({
      queryKey: authKeys.getUserById(id),
      queryFn: () => getUserByIdFn(id),
      enabled: !!id && enabled,
    })
  },
}
