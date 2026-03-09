export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_UP_SUCCESS: '/sign-up-success',
  BOOKS: '/books/shelf',
  BOOKS_DETAIL: (id: string) => `/books/${id}`,
  BOOKS_EDIT: (id: string) => `/books/${id}/edit`,
  PROFILE: '/profile',
} as const
