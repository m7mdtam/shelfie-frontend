import { useRef, useState } from 'react'
import { Trash2, Upload, Loader } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDeleteProfileImage, useUploadProfileImage } from '@/hooks/pages/profile'
import type { PayloadUser } from '@/@types/auth'

interface ProfileAvatarSectionProps {
  user: PayloadUser | undefined
}

function getInitials(firstName: string, lastName: string): string {
  return ((firstName[0] || '') + (lastName[0] || '')).toUpperCase()
}

export function ProfileAvatarSection({ user }: ProfileAvatarSectionProps) {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadImage, isPending: isUploading } = useUploadProfileImage()
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteProfileImage()

  if (!user) return null

  const displayName = `${user.firstName || ''} ${user.lastName || ''}`.trim()
  const initials = getInitials(user.firstName || '', user.lastName || '')
  const profileImageUrl = user.profileImage?.sizes?.[0]?.url || user.profileImage?.url
  const hasProfileImage = !!profileImageUrl

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImage(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleDeleteAvatar = () => {
    deleteImage()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHoveringAvatar(true)}
        onMouseLeave={() => setIsHoveringAvatar(false)}
        onClick={handleAvatarClick}
      >
        <Avatar className="h-32 w-32 ring-2 ring-accent-primary">
          <AvatarImage src={profileImageUrl} alt={displayName} />
          <AvatarFallback className="bg-background-tertiary dark:bg-accent-background text-accent-primary text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {(isHoveringAvatar || isUploading) && (
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
            {isUploading ? (
              <Loader className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-white" />
            )}
          </div>
        )}
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
        className="hidden"
      />

      {hasProfileImage && (
        <Button
          onClick={handleDeleteAvatar}
          variant="destructive"
          className="gap-2 text-white"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
          {isDeleting ? 'Deleting...' : 'Delete Avatar'}
        </Button>
      )}
    </div>
  )
}
