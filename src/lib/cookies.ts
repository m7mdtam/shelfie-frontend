import Cookies from 'js-cookie'
import { env } from '@/env'

const TOKEN_KEY = 'bookshelf_token'

export const getToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null
}

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    secure: !env.IS_DEV,
    sameSite: env.IS_DEV ? 'lax' : 'strict',
  })
}

export const clearToken = (): void => {
  Cookies.remove(TOKEN_KEY)
}
