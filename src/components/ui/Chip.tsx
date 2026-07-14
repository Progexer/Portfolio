import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ChipProps = {
  children: ReactNode
  className?: string
  accent?: 'primary' | 'secondary' | 'accent' | 'neutral'
}

const accents = {
  primary: 'border-primary/25 bg-primary-soft text-blue-200',
  secondary: 'border-secondary/25 bg-secondary-soft text-violet-200',
  accent: 'border-accent/25 bg-accent-soft text-cyan-200',
  neutral: 'border-border bg-white/[0.04] text-muted',
} as const

/** Small technology / label pill. */
export function Chip({ children, className, accent = 'neutral' }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300',
        accents[accent],
        className,
      )}
    >
      {children}
    </span>
  )
}
