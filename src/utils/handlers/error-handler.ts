import { AxiosError } from 'axios'

export const handleError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

export const getErrorMessage = (error: unknown): string => {
  return handleError(error)
}
