import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { getToken, clearToken } from '@/lib/cookies'
import { decodeToken, isTokenExpired, DecodedTokenPayload } from '@/lib/jwt'
import { auth } from '@/api/auth/hooks'
import type { PayloadUser } from '@/@types/auth'

interface AuthContextProps {
  isAuthenticated: boolean
  decodedToken: DecodedTokenPayload | null
  user: PayloadUser | null
  setUser: (user: PayloadUser) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [decodedToken, setDecodedToken] = useState<DecodedTokenPayload | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUserState] = useState<PayloadUser | null>(null)
  const logoutMutation = auth.useLogout()
  const { data: meData } = auth.useGetMe(isAuthenticated && !user)

  const checkToken = useCallback(() => {
    const token = getToken()
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token)
      setDecodedToken(decoded)
      setIsAuthenticated(true)
    } else {
      setDecodedToken(null)
      setIsAuthenticated(false)
      setUserState(null)
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

  useEffect(() => {
    if (meData && isAuthenticated) {
      setUserState(meData)
    }
  }, [meData, isAuthenticated])

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } finally {
      clearToken()
      setDecodedToken(null)
      setIsAuthenticated(false)
      setUserState(null)
    }
  }

  const setUser = (updatedUser: PayloadUser) => {
    setUserState(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, decodedToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider')
  return ctx
}
