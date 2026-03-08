import { useIsMobile } from '@/hooks/use-is-mobile'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

interface DeleteBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookTitle: string
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteBookDialog({
  open,
  onOpenChange,
  bookTitle,
  onConfirm,
  isLoading,
}: DeleteBookDialogProps) {
  const isMobile = useIsMobile()

  const body = (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-14 h-14 rounded-full bg-state-error-bg flex items-center justify-center shrink-0">
        <Trash className="w-6 h-6 text-destructive" />
      </div>
      <div>
        <p className="font-semibold text-text-primary">Delete &ldquo;{bookTitle}&rdquo;?</p>
        <p className="text-sm text-text-secondary mt-1">This action cannot be undone.</p>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="sr-only">Delete Book</DrawerTitle>
            <DrawerDescription className="sr-only">Confirm deletion of {bookTitle}</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-2">{body}</div>
          <DrawerFooter className="justify-center">
            <DrawerClose asChild>
              <Button variant="outline" disabled={isLoading}>Cancel</Button>
            </DrawerClose>
            <Button variant="error" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[22vw]">
        <DialogHeader>
          <DialogTitle className="sr-only">Delete Book</DialogTitle>
          <DialogDescription className="sr-only">Confirm deletion of {bookTitle}</DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">{body}</div>
        <DialogFooter className="justify-center">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>Cancel</Button>
          </DialogClose>
          <Button variant="error" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
