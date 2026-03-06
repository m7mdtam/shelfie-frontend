import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { loginFn } from '@/api/auth/requests'
import { setToken } from '@/lib/cookies'

export const useVerificationPolling = () => {
  const navigate = useNavigate()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const email = sessionStorage.getItem('pending_verification_email')
    const password = sessionStorage.getItem('pending_verification_password')

    if (!email || !password) return

    const check = async () => {
      try {
        const response = await loginFn({ email, password })
        if (response.token) {
          setToken(response.token)
          sessionStorage.removeItem('pending_verification_email')
          sessionStorage.removeItem('pending_verification_password')
          setIsVerified(true)
          navigate({ to: '/books/shelf' })
        }
      } catch {
        // login failed — not verified yet, will retry
      }
    }

    const interval = setInterval(check, 4000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isVerified }
}
