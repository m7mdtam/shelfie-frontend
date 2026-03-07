import axiosInstance from '../axios-instance'
import { uploadMedia } from '../media/requests'
import type { PayloadUser } from '@/@types/auth'

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  sex?: string
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
    try {
      console.log('📤 Uploading profile image to /api/media...')

      // Step 1: Upload file to /api/media
      const media = await uploadMedia(file, 'Profile Image')
      console.log('✅ Media uploaded:', media)

      console.log('📝 Updating user profile with media object...')

      // Step 2: Update user profile with media object (not just ID)
      const response = await axiosInstance.patch('/api/users/me', {
        profileImage: media,
      })
      console.log('✅ Profile updated with image:', response.data.profileImage)

      return response.data
    } catch (error) {
      console.error('❌ Profile image upload failed:', error)
      throw error
    }
  },

  deleteProfileImage: async (): Promise<PayloadUser> => {
    try {
      console.log('🗑️ Deleting profile image...')

      const response = await axiosInstance.patch('/api/users/me', {
        profileImage: null,
      })
      console.log('✅ Profile image deleted')

      return response.data
    } catch (error) {
      console.error('❌ Profile image delete failed:', error)
      throw error
    }
  },
}
