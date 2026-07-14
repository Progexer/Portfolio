import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  className?: string
  reverse?: boolean
  /** seconds per loop */
  speed?: number
}

/** Infinite horizontal marquee (pauses on hover). CSS-driven for perf. */
export function Marquee({ children, className, reverse, speed = 40 }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-4 pr-4 will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
