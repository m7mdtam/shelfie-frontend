import axiosInstance from '../axios-instance'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
  GetMeResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from './types'

export const loginFn = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/api/users/login', data)
  return response.data
}

export const registerFn = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axiosInstance.post('/api/users', data)
  return response.data
}

export const logoutFn = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post('/api/users/logout')
  return response.data
}

export const refreshTokenFn = async (): Promise<RefreshTokenResponse> => {
  const response = await axiosInstance.post('/api/users/refresh-token')
  return response.data
}

export const getMeFn = async (): Promise<GetMeResponse> => {
  try {
    console.log('📡 Fetching /api/users/me...')
    const response = await axiosInstance.get('/api/users/me')
    console.log('✅ /api/users/me response:', response.data)
    return response.data
  } catch (error: any) {
    console.error('❌ /api/users/me error:', error?.response?.data || error.message)
    throw error
  }
}

export const forgotPasswordFn = async (
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await axiosInstance.post('/api/users/forgot-password', data)
  return response.data
}

export const resetPasswordFn = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await axiosInstance.post('/api/users/reset-password', data)
  return response.data
}

export const verifyEmailFn = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const response = await axiosInstance.post('/api/users/verify-email', data)
  return response.data
}

export const getUserByIdFn = async (id: string): Promise<GetMeResponse> => {
  const response = await axiosInstance.get(`/api/users/${id}`)
  return response.data
}
