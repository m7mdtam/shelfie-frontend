import { Button } from '@/components/ui/button'
import { PageSection } from '@/components/common/page-section'
import { ArrowLeft } from 'lucide-react'

interface BookDetailErrorProps {
  onBack: () => void
  error?: Error | null
}

export function BookDetailError({ onBack, error }: BookDetailErrorProps) {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-fit flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <PageSection className="text-center py-10">
          <p className="text-state-error font-semibold text-lg">Book Not Found</p>
          <p className="text-text-secondary text-sm mt-1">
            {error?.message || 'Unable to load book details'}
          </p>
        </PageSection>
      </div>
    </div>
  )
}
