import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  /** radius of the spotlight glow in px */
  radius?: number
  spotlightColor?: string
}

/**
 * Card with a cursor-following radial spotlight + a subtle gradient border
 * that lights up on hover. Core "premium" surface used across the site.
 */
export function SpotlightCard({
  children,
  className,
  radius = 380,
  spotlightColor = 'rgba(59,130,246,0.14)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(-radius)
  const my = useMotionValue(-radius)

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, ${spotlightColor}, transparent 70%)`

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md transition-colors duration-500',
        'hover:border-white/15',
        className,
      )}
    >
      {/* spotlight layer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {/* top inner highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
