import { useAuthContext } from '@/contexts/auth'
import { auth } from '@/api/auth/hooks'
import { useParams } from '@tanstack/react-router'
import type { PayloadUser } from '@/@types/auth'
import { PageSection } from '@/components/page-section'
import { ProfileAvatarSection } from '@/components/pages/profile/profile-avatar-section'
import { ProfilePersonalInfoSection } from '@/components/pages/profile/profile-personal-info-section'
import { ProfileAdditionalInfoSection } from '@/components/pages/profile/profile-additional-info-section'
import { ProfileSkeleton } from '@/components/pages/profile/profile-skeleton'

export function PublicProfilePage() {
  const { userId } = useParams({ strict: false }) as { userId: string }
  const authContext = useAuthContext()
  const { data: profileData, isLoading } = auth.useGetUserById(userId)
  const user: PayloadUser | undefined = profileData

  const isOwner = !!authContext.decodedToken && String(authContext.decodedToken.id) === String(userId)

  if (isLoading || !user) {
    return <ProfileSkeleton />
  }

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <div className="max-w-2xl mx-auto w-full">
        <PageSection>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            {isOwner ? 'Profile' : `${user.firstName} ${user.lastName}`}
          </h1>

          <ProfileAvatarSection user={user} isOwner={isOwner} />

          <div className="mt-8">
            <ProfilePersonalInfoSection user={user} isOwner={isOwner} />
          </div>

          <hr className="mt-8 border-text-border" />

          <div className="mt-8">
            <ProfileAdditionalInfoSection user={user} isOwner={isOwner} />
          </div>
        </PageSection>
      </div>
    </div>
  )
}

export default PublicProfilePage
