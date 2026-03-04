import axios, { AxiosInstance } from 'axios'
import { getToken, setToken, clearToken } from '@/lib/cookies'
import { isTokenExpired } from '@/lib/jwt'
import { env } from '@/env'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token!)
  })
  failedQueue = []
}

const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}) as AxiosInstance

axiosInstance.interceptors.request.use(async (config) => {
  const token = getToken()

  if (token) {
    if (isTokenExpired(token) && !isRefreshing) {
      isRefreshing = true

      try {
        const { data } = await axios.post(
          `${env.API_BASE_URL}/api/users/refresh-token`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        setToken(data.refreshedToken)
        processQueue(null, data.refreshedToken)

        if (config.headers) {
          config.headers.Authorization = `Bearer ${data.refreshedToken}`
        }
      } catch (err) {
        processQueue(err, null)
        clearToken()
        window.location.href = '/sign-in'
      } finally {
        isRefreshing = false
      }
    } else if (!isTokenExpired(token)) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
      window.location.href = '/sign-in'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
