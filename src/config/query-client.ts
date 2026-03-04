import { DefaultOptions, QueryClient } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  },
  mutations: {
    retry: 0,
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})
