export const authKeys = {
  all: () => ['auth'] as const,
  signIn: () => [...authKeys.all(), 'sign-in'] as const,
  register: () => [...authKeys.all(), 'register'] as const,
  logout: () => [...authKeys.all(), 'logout'] as const,
  getMe: () => [...authKeys.all(), 'me'] as const,
  refreshToken: () => [...authKeys.all(), 'refresh-token'] as const,
  forgotPassword: () => [...authKeys.all(), 'forgot-password'] as const,
}
