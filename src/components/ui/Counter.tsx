import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type CounterProps = {
  value: number
  decimals?: number
  suffix?: string
  duration?: number
  /** Group thousands with commas (e.g. 1,200). Off for years/IDs. Default true. */
  grouping?: boolean
}

/** Counts from 0 → value when scrolled into view. */
export function Counter({
  value,
  decimals = 0,
  suffix = '',
  duration = 1600,
  grouping = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    let frame = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduced])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : grouping
        ? Math.round(display).toLocaleString('en-US')
        : String(Math.round(display))

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}
