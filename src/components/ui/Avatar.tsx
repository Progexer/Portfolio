import { useState } from 'react'
import { PROFILE } from '@/data/portfolio'
import { cn } from '@/lib/utils'

type AvatarProps = {
  size?: number
  className?: string
  /** Show the gradient ring + hover glow. */
  ring?: boolean
}

/**
 * Circular profile avatar. Uses the photo at `PROFILE.avatar`; if it fails to
 * load (e.g. not added yet) it falls back to the initials monogram so the
 * navbar never shows a broken image.
 */
export function Avatar({ size = 40, className, ring = true }: AvatarProps) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className={cn(
        'group/avatar relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        ring &&
          'ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/30',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* hover glow */}
      {ring && (
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {failed ? (
        <span className="relative grid h-full w-full place-items-center rounded-full border border-white/10 bg-card text-[0.7em] font-extrabold text-gradient">
          {PROFILE.initials}
        </span>
      ) : (
        <img
          src={PROFILE.avatar}
          alt={`${PROFILE.name} — profile photo`}
          width={size}
          height={size}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className="relative h-full w-full rounded-full object-cover"
        />
      )}
    </span>
  )
}
