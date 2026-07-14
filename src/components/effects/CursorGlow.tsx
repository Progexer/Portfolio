import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * A subtle warm glow that follows the cursor across the whole page (desktop only).
 * Very restrained — just enough to add warmth without distraction.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (reduced) return
    // Skip on touch / coarse pointers.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(closest-side, rgba(200,164,97,0.04), rgba(200,164,97,0.02), transparent 75%)',
      }}
    />
  )
}
