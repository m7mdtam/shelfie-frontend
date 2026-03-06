import { AxiosError } from 'axios'

export interface AuthErrorResult {
  field: string
  message: string
}

const parsePayloadError = (data: unknown): AuthErrorResult | null => {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  const errors = d.errors
  if (!Array.isArray(errors) || errors.length === 0) return null
  const first = errors[0] as Record<string, unknown>
  const nested = first?.data as Record<string, unknown> | undefined
  const nestedErrors = nested?.errors
  if (Array.isArray(nestedErrors) && nestedErrors.length > 0) {
    const fieldError = nestedErrors[0] as Record<string, unknown>
    const path = typeof fieldError.path === 'string' ? fieldError.path : 'root'
    const message = typeof fieldError.message === 'string' ? fieldError.message : ''
    if (message) return { field: path, message }
  }
  const topMessage = typeof first.message === 'string' ? first.message : ''
  return topMessage ? { field: 'root', message: topMessage } : null
}

const getStatusMessage = (status: number | undefined): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.'
    case 401:
      return 'Invalid email or password.'
    case 403:
      return 'Access denied.'
    case 404:
      return 'Not found.'
    case 409:
      return 'A conflict occurred.'
    case 500:
      return 'Server error. Please try again later.'
    default:
      return 'An unexpected error occurred.'
  }
}

export const getAuthError = (error: unknown): AuthErrorResult => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const payload = parsePayloadError(error.response?.data)
    if (payload) return payload
    const serverMessage: string = error.response?.data?.message ?? ''
    const msg = serverMessage.toLowerCase()
    if (msg.includes('email')) return { field: 'email', message: serverMessage }
    if (msg.includes('password')) return { field: 'password', message: serverMessage }
    switch (status) {
      case 400: return { field: 'root', message: serverMessage || 'Invalid request. Please check your input.' }
      case 401: return { field: 'root', message: 'Invalid email or password.' }
      case 403: return { field: 'root', message: serverMessage || 'Your account is not verified or access is denied.' }
      case 404: return { field: 'email', message: serverMessage || 'No account found with this email.' }
      case 409: return { field: 'email', message: serverMessage || 'An account with this email already exists.' }
      case 500: return { field: 'root', message: 'Server error. Please try again later.' }
      default: return { field: 'root', message: serverMessage || getStatusMessage(status) }
    }
  }
  if (error instanceof Error) return { field: 'root', message: error.message }
  return { field: 'root', message: 'An unexpected error occurred.' }
}

export const getSignInError = (error: unknown): AuthErrorResult => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const payload = parsePayloadError(error.response?.data)
    if (payload) return payload
    const serverMessage: string = error.response?.data?.message ?? ''
    switch (status) {
      case 400: return { field: 'root', message: serverMessage || 'Please enter a valid email and password.' }
      case 401: return { field: 'root', message: 'Invalid email or password.' }
      case 403: return { field: 'root', message: 'Your account is not verified. Please check your email.' }
      case 404: return { field: 'email', message: 'No account found with this email.' }
      case 500: return { field: 'root', message: 'Server error. Please try again later.' }
      default: return { field: 'root', message: serverMessage || getStatusMessage(status) }
    }
  }
  if (error instanceof Error) return { field: 'root', message: error.message }
  return { field: 'root', message: 'An unexpected error occurred.' }
}

export const getSignUpError = (error: unknown): AuthErrorResult => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const payload = parsePayloadError(error.response?.data)
    if (payload) return payload
    const serverMessage: string = error.response?.data?.message ?? ''
    const msg = serverMessage.toLowerCase()
    if (msg.includes('email')) return { field: 'email', message: serverMessage }
    if (msg.includes('password')) return { field: 'password', message: serverMessage }
    switch (status) {
      case 400: return { field: 'root', message: serverMessage || 'Please check your input and try again.' }
      case 409: return { field: 'email', message: serverMessage || 'An account with this email already exists.' }
      case 500: return { field: 'root', message: 'Server error. Please try again later.' }
      default: return { field: 'root', message: serverMessage || getStatusMessage(status) }
    }
  }
  if (error instanceof Error) return { field: 'root', message: error.message }
  return { field: 'root', message: 'An unexpected error occurred.' }
}

export const getForgotPasswordError = (error: unknown): AuthErrorResult => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const payload = parsePayloadError(error.response?.data)
    if (payload) return payload
    const serverMessage: string = error.response?.data?.message ?? ''
    switch (status) {
      case 400: return { field: 'email', message: serverMessage || 'Please enter a valid email address.' }
      case 404: return { field: 'email', message: serverMessage || 'No account found with this email.' }
      case 500: return { field: 'root', message: 'Server error. Please try again later.' }
      default: return { field: 'root', message: serverMessage || getStatusMessage(status) }
    }
  }
  if (error instanceof Error) return { field: 'root', message: error.message }
  return { field: 'root', message: 'An unexpected error occurred.' }
}

export const getResetPasswordError = (error: unknown): AuthErrorResult => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const payload = parsePayloadError(error.response?.data)
    if (payload) return payload
    const serverMessage: string = error.response?.data?.message ?? ''
    switch (status) {
      case 400: return { field: 'root', message: serverMessage || 'Invalid or expired reset link.' }
      case 401: return { field: 'root', message: 'This reset link has expired. Please request a new one.' }
      case 404: return { field: 'root', message: 'Invalid reset link.' }
      case 500: return { field: 'root', message: 'Server error. Please try again later.' }
      default: return { field: 'root', message: serverMessage || getStatusMessage(status) }
    }
  }
  if (error instanceof Error) return { field: 'root', message: error.message }
  return { field: 'root', message: 'An unexpected error occurred.' }
}
