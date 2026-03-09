import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getToken, clearToken, setToken as setCookie } from '@/lib/cookies'
import { decodeToken, isTokenExpired, DecodedTokenPayload } from '@/lib/jwt'
import type { PayloadUser } from '@/@types/auth'

interface AuthStore {
  decodedToken: DecodedTokenPayload | null
  user: PayloadUser | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  setUser: (user: PayloadUser) => void
  logout: () => void
  checkToken: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      decodedToken: null,
      user: null,
      isAuthenticated: false,

      setToken: (token: string) => {
        setCookie(token)
        const decoded = decodeToken(token)
        set({
          decodedToken: decoded,
          isAuthenticated: true,
        })
      },

      setUser: (user: PayloadUser) => {
        set({ user })
      },

      logout: () => {
        clearToken()
        set({
          decodedToken: null,
          user: null,
          isAuthenticated: false,
        })
      },

      checkToken: () => {
        const token = getToken()
        if (token && !isTokenExpired(token)) {
          const decoded = decodeToken(token)
          set({
            decodedToken: decoded,
            isAuthenticated: true,
          })
        } else {
          clearToken()
          set({
            decodedToken: null,
            user: null,
            isAuthenticated: false,
          })
        }
      },

      initAuth: () => {
        const token = getToken()
        if (token && !isTokenExpired(token)) {
          const decoded = decodeToken(token)
          set({
            decodedToken: decoded,
            isAuthenticated: true,
          })
        } else {
          set({
            decodedToken: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: state => ({
        decodedToken: state.decodedToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
