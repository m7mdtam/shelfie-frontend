import axiosInstance from '../axios-instance'
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RefreshTokenResponse, GetMeResponse, LogoutResponse } from './types'

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
  const response = await axiosInstance.get('/api/users/me')
  return response.data
}
