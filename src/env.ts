export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  IS_DEV: import.meta.env.VITE_ENVIRONMENT === 'development',
}
