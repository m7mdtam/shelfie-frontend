export const booksQueryKeys = {
  all: ['books'] as const,
  lists: () => [...booksQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...booksQueryKeys.lists(), { ...filters }] as const,
  details: () => [...booksQueryKeys.all, 'details'] as const,
  detail: (id: string) => [...booksQueryKeys.details(), id] as const,
}
