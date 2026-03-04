import { jwtDecode } from 'jwt-decode'

export interface DecodedTokenPayload {
  id: string
  email: string
  exp: number
  iat: number
}

export const decodeToken = (token: string): DecodedTokenPayload | null => {
  try {
    const decoded = jwtDecode<DecodedTokenPayload>(token)
    return decoded
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token)
  if (!decoded) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}
