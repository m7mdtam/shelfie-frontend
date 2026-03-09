interface HeroBadgeProps {
  text: string
}

export function HeroBadge(props: HeroBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-primary/40 bg-accent-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-primary">
      {props.text}
    </span>
  )
}
