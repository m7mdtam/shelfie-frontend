import { useMutation, useQuery } from '@tanstack/react-query'
import { loginFn, registerFn, logoutFn, getMeFn, forgotPasswordFn } from './requests'
import { authKeys } from './keys'
import { LoginRequest, RegisterRequest, ForgotPasswordRequest } from './types'

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
}
