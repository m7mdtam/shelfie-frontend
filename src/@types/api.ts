import { AxiosError } from 'axios'

export type ApiError = AxiosError<{
  message?: string
  error?: string
  statusCode?: number
}>

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
