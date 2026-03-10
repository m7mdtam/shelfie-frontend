import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Trash, PencilLine, Upload, Loader } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAvatarSectionPreset, useAvatarPreset, fade, TWEEN_OPACITY } from '@/lib/animations'
import { useDeleteProfileImage, useUploadProfileImage } from '@/hooks/pages/profile'
import type { PayloadUser } from '@/@types/auth'

interface ProfileAvatarSectionProps {
  user: PayloadUser | undefined
  isOwner?: boolean
}

function getInitials(firstName: string, lastName: string): string {
  return ((firstName[0] || '') + (lastName[0] || '')).toUpperCase()
}

export function ProfileAvatarSection({ user, isOwner = true }: ProfileAvatarSectionProps) {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadImage, isPending: isUploading } = useUploadProfileImage()
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteProfileImage()
  const avatarSectionPreset = useAvatarSectionPreset()
  const avatarInteractivePreset = useAvatarPreset(isOwner)

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
    if (isOwner) fileInputRef.current?.click()
  }

  const handleDeleteAvatar = () => {
    deleteImage()
  }

  return (
    <motion.div className="flex flex-col items-center gap-4" {...avatarSectionPreset}>
      <div
        className={isOwner ? 'relative cursor-pointer' : 'relative'}
        onMouseEnter={() => isOwner && setIsHoveringAvatar(true)}
        onMouseLeave={() => isOwner && setIsHoveringAvatar(false)}
        onClick={handleAvatarClick}
      >
        <motion.div {...avatarInteractivePreset}>
          <Avatar className="h-32 w-32 ring-2 ring-accent-primary">
            <AvatarImage src={profileImageUrl} alt={displayName} />
            <AvatarFallback className="bg-background-tertiary dark:bg-accent-background text-accent-primary text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {isOwner && (isHoveringAvatar || isUploading) && (
          <motion.div
            className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={TWEEN_OPACITY}
          >
            {isUploading ? (
              <Loader className="w-6 h-6 text-white animate-spin" />
            ) : hasProfileImage ? (
              <PencilLine className="w-6 h-6 text-white" />
            ) : (
              <Upload className="w-6 h-6 text-white" />
            )}
          </motion.div>
        )}
      </div>

      {isOwner && (
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
          className="hidden"
        />
      )}

      {isOwner && (
        <div className="flex gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            size="icon"
            disabled={isUploading}
          >
            {hasProfileImage ? (
              <PencilLine className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
          </Button>
          {hasProfileImage && (
            <Button
              onClick={handleDeleteAvatar}
              variant="destructive"
              size="icon"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Trash className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  )
}
