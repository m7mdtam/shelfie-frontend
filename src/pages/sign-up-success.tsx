import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useIsMobile } from '@/hooks'
import { useAuthContext } from '@/contexts/auth'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export function SignUpSuccessPage() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate({ to: '/books/shelf' })
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, navigate])

  return (
    <div
      className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Card variant="elevated" className="w-full">
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.9,
                    type: 'spring',
                    stiffness: 80,
                    damping: 12,
                  }}
                >
                  <CheckCircle2 className="w-16 h-16 text-state-success" />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <CardTitle>Account Created!</CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <CardDescription>Your account has been successfully created.</CardDescription>
              </motion.div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
