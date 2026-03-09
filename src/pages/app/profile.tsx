import { useEffect } from 'react'
import { useAuthContext } from '@/contexts/auth'
import { auth } from '@/api/auth/hooks'
import type { PayloadUser } from '@/@types/auth'
import { PageSection } from '@/components/common/page-section'
import { ProfileAvatarSection } from '@/components/pages/profile/profile-avatar-section'
import { ProfilePersonalInfoSection } from '@/components/pages/profile/profile-personal-info-section'
import { ProfileAdditionalInfoSection } from '@/components/pages/profile/profile-additional-info-section'
import { ProfileSkeleton } from '@/components/pages/profile/profile-skeleton'

export function ProfilePage() {
  const authContext = useAuthContext()
  const { data: meData, isLoading } = auth.useGetMe(authContext.isAuthenticated)
  const user: PayloadUser | undefined = meData

  useEffect(() => {
    if (user && !isLoading) {
      authContext.setUser(user)
    }
  }, [user, isLoading, authContext])

  if (isLoading || !user) {
    return <ProfileSkeleton />
  }

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <div className="max-w-2xl mx-auto w-full">
        <PageSection>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Profile</h1>

          <ProfileAvatarSection user={user} />

          <div className="mt-8">
            <ProfilePersonalInfoSection user={user} />
          </div>

          <hr className="mt-8 border-text-border" />

          <div className="mt-8">
            <ProfileAdditionalInfoSection user={user} />
          </div>
        </PageSection>
      </div>
    </div>
  )
}

export default ProfilePage
