import { env } from '@/env'

export const useEmailVerificationEnabled = () => {
  return !env.SKIP_EMAIL_VERIFICATION
}
