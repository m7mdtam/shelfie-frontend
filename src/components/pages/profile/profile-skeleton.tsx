import { Skeleton } from '@/components/ui/skeleton'
import { PageSection } from '@/components/common/page-section'

export function ProfileSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-background-base p-4 md:p-6">
      <div className="max-w-2xl mx-auto w-full">
        <PageSection>
          <Skeleton className="h-10 w-32 mb-6" />

          <div className="flex flex-col items-center gap-4 mb-12">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-9 w-20" />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-9 w-20" />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-3 w-12 mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </div>
  )
}
