import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Variant = 'primary' | 'ghost' | 'outline'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  className?: string
  download?: boolean
  external?: boolean
  ariaLabel?: string
  type?: 'button' | 'submit'
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 ease-premium focus-visible:outline-none'

const variants: Record<Variant, string> = {
  primary:
    'text-white shadow-glow bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-accent',
  outline:
    'text-white border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md',
  ghost: 'text-muted hover:text-white',
}

/** Button/link that subtly follows the cursor (magnetic effect). */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  download,
  external,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.3)
    y.set(relY * 0.3)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  )

  const cls = cn(base, variants[variant], className)
  const style = { x: sx, y: sy }

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={style}
        className={cls}
        aria-label={ariaLabel}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className={cls}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  )
}
