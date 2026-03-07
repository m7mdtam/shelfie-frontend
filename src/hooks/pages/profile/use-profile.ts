import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '@/contexts/auth'
import { usersRequests, UpdateProfileRequest } from '../../../api/users/requests'
import { authKeys } from '@/api/auth/keys'
import { toast } from 'sonner'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersRequests.updateProfile(data),
    onSuccess: response => {
      // Sync user data to auth context for navbar updates
      if (response) {
        setUser(response)
      }

      // Invalidate and refetch the /api/users/me endpoint
      queryClient.invalidateQueries({ queryKey: authKeys.getMe() })
      queryClient.refetchQueries({ queryKey: authKeys.getMe() })
      toast.success('Profile updated successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update profile'
      toast.error(message)
    },
  })
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: (file: File) => usersRequests.uploadProfileImage(file),
    onSuccess: response => {
      // Sync user data to auth context for navbar updates
      if (response) {
        setUser(response)
      }

      // Invalidate and refetch the /api/users/me endpoint
      queryClient.invalidateQueries({ queryKey: authKeys.getMe() })
      queryClient.refetchQueries({ queryKey: authKeys.getMe() })
      toast.success('Profile image updated successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to upload image'
      toast.error(message)
    },
  })
}

export function useDeleteProfileImage() {
  const queryClient = useQueryClient()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: () => usersRequests.deleteProfileImage(),
    onSuccess: response => {
      // Sync user data to auth context for navbar updates
      if (response) {
        setUser(response)
      }

      // Invalidate and refetch the /api/users/me endpoint
      queryClient.invalidateQueries({ queryKey: authKeys.getMe() })
      queryClient.refetchQueries({ queryKey: authKeys.getMe() })
      toast.success('Profile image deleted')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete image'
      toast.error(message)
    },
  })
}
