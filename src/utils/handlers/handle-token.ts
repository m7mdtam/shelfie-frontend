import { clearToken, getToken, setToken } from '@/lib/cookies'
import { isTokenExpired } from '@/lib/jwt'

export const isAutoLogoutNeeded = (): boolean => {
  const token = getToken()
  if (!token) return false
  return isTokenExpired(token)
}

export const handleTokenRefresh = (newToken: string): void => {
  setToken(newToken)
}

export const handleTokenClear = (): void => {
  clearToken()
  window.location.href = '/sign-in'
}
