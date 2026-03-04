import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { getToken, clearToken } from '@/lib/cookies'
import { decodeToken, isTokenExpired, DecodedTokenPayload } from '@/lib/jwt'
import { auth } from '@/api/auth/hooks'

interface AuthContextProps {
  isAuthenticated: boolean
  decodedToken: DecodedTokenPayload | null
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [decodedToken, setDecodedToken] = useState<DecodedTokenPayload | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const logoutMutation = auth.useLogout()

  const checkToken = useCallback(() => {
    const token = getToken()
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token)
      setDecodedToken(decoded)
      setIsAuthenticated(true)
    } else {
      setDecodedToken(null)
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    checkToken()
    const interval = setInterval(checkToken, 1000)
    window.addEventListener('storage', checkToken)
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', checkToken)
    }
  }, [checkToken])

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } finally {
      clearToken()
      setDecodedToken(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, decodedToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider')
  return ctx
}
