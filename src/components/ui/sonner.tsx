import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "!bg-background-surface !text-text-primary !border !border-text-border !shadow-md !rounded-lg !font-sans",
          title: "!text-text-primary !font-semibold !text-sm",
          description: "!text-text-secondary !text-xs",
          actionButton:
            "!bg-accent-primary !text-primary-foreground !rounded-md !text-xs !font-medium",
          cancelButton:
            "!bg-background-tertiary !text-text-secondary !rounded-md !text-xs !font-medium",
          closeButton:
            "!bg-background-tertiary !border-text-border !text-text-secondary hover:!text-text-primary",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
