export const authKeys = {
  all: () => ['auth'] as const,
  signIn: () => [...authKeys.all(), 'sign-in'] as const,
  register: () => [...authKeys.all(), 'register'] as const,
  logout: () => [...authKeys.all(), 'logout'] as const,
  getMe: () => [...authKeys.all(), 'me'] as const,
  refreshToken: () => [...authKeys.all(), 'refresh-token'] as const,
  forgotPassword: () => [...authKeys.all(), 'forgot-password'] as const,
  resetPassword: () => [...authKeys.all(), 'reset-password'] as const,
  verifyEmail: () => [...authKeys.all(), 'verify-email'] as const,
  getUserById: (id: string) => [...authKeys.all(), 'user', id] as const,
}
