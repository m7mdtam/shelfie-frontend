import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { auth } from '@/api/auth/hooks'
import { getErrorMessage } from '@/utils'

export const useVerifyEmail = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const token = (search as Record<string, string>).token

  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { mutate: verifyEmail } = auth.useVerifyEmail()

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      setIsError(true)
      setErrorMessage('No verification token found')
      return
    }

    verifyEmail(
      { token },
      {
        onSuccess: () => {
          setIsLoading(false)
          setIsSuccess(true)
          setTimeout(() => {
            navigate({ to: '/sign-in' })
          }, 3000)
        },
        onError: (error: Error) => {
          setIsLoading(false)
          setIsError(true)
          setErrorMessage(getErrorMessage(error))
        },
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLoading,
    isSuccess,
    isError,
    errorMessage,
  }
}
