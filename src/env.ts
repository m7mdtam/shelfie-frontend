export const env = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'https://shelfie-backend-production.up.railway.app',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  IS_DEV: import.meta.env.VITE_ENVIRONMENT === 'development',
  SKIP_EMAIL_VERIFICATION: import.meta.env.VITE_SKIP_EMAIL_VERIFICATION === 'true',
}
