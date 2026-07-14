import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Lightweight floating particle field (deterministic positions so it renders
 * identically on every load — no Math.random at module scope needed).
 */
export function FloatingParticles({ count = 26 }: { count?: number }) {
  const reduced = usePrefersReducedMotion()

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic pseudo-scatter using trig — stable across renders.
      const left = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1
      const top = ((Math.sin(i * 78.233) * 12543.129) % 1 + 1) % 1
      const size = 1.5 + ((i * 37) % 5) * 0.7
      const duration = 6 + ((i * 53) % 8)
      const delay = (i % 10) * 0.4
      return { left, top, size, duration, delay }
    })
  }, [count])

  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{
            left: `${p.left * 100}%`,
            top: `${p.top * 100}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
