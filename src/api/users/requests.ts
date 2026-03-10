import axiosInstance from '../axios-instance'
import { uploadMedia } from '../media/requests'
import type { PayloadUser } from '@/@types/auth'

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  gender?: string
  birthDate?: string
  profileImageId?: string
}

export const usersRequests = {
  updateProfile: async (data: UpdateProfileRequest): Promise<PayloadUser> => {
    const response = await axiosInstance.patch('/api/users/me', data)
    return response.data
  },

  /**
   * Upload profile image using 2-step flow:
   * 1. Upload file to /api/media (existing endpoint)
   * 2. Update user profile with media ID via PATCH /api/users/me (existing endpoint)
   *
   * Flow:
   * - File uploaded to Vercel Blob via /api/media
   * - Returns BookMedia with id, url, sizes
   * - User profile updated with profileImageId
   * - Returns updated PayloadUser with profileImage populated
   *
   * Benefits:
   * ✅ No new backend endpoints needed
   * ✅ Reuses existing /api/media and /api/users/me endpoints
   * ✅ Syncs auth context for navbar avatar updates
   * ✅ Shows loading state during upload
   */
  uploadProfileImage: async (file: File): Promise<PayloadUser> => {
    // Step 1: Upload file to /api/media
    const media = await uploadMedia(file, 'Profile Image')

    // Step 2: Update user profile with media object (not just ID)
    const response = await axiosInstance.patch('/api/users/me', {
      profileImage: media,
    })

    return response.data
  },

  deleteProfileImage: async (): Promise<PayloadUser> => {
    const response = await axiosInstance.patch('/api/users/me', {
      profileImage: null,
    })

    return response.data
  },
}
