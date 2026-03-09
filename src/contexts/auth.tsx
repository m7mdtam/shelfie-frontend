import { useEffect, ReactNode } from 'react'
import { useAuthStore } from '@/stores/auth'
import { auth } from '@/api/auth/hooks'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { initAuth, isAuthenticated, user, setUser } = useAuthStore()
  const { data: meData } = auth.useGetMe(isAuthenticated && !user)

  useEffect(() => {
    initAuth()
    const interval = setInterval(() => {
      useAuthStore.getState().checkToken()
    }, 1000)

    const handleStorageChange = () => {
      useAuthStore.getState().checkToken()
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [initAuth])

  useEffect(() => {
    if (meData && isAuthenticated) {
      setUser(meData)
    }
  }, [meData, isAuthenticated, setUser])

  return <>{children}</>
}

export const useAuthContext = () => {
  const { decodedToken, isAuthenticated, user, setUser } = useAuthStore()
  const logoutMutation = auth.useLogout()

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } finally {
      useAuthStore.getState().logout()
    }
  }

  return {
    isAuthenticated,
    decodedToken,
    user,
    setUser,
    logout,
  }
}
