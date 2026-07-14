import { type ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  /** Number displayed beside the eyebrow for editorial section numbering. */
  number?: string
}

/** Standard section shell: consistent spacing, editorial heading hierarchy. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  number,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-section', className)}
    >
      <div className="section-container">
        {(eyebrow || title || description) && (
          <div className="mb-16 sm:mb-20">
            {eyebrow && (
              <Reveal>
                <div className="flex items-center gap-4 mb-6">
                  {number && (
                    <span className="mono-label">{number}</span>
                  )}
                  <span className="eyebrow">{eyebrow}</span>
                </div>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="font-serif text-display-lg text-white">{title}</h2>
              </Reveal>
            )}
            {description && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-body-lg text-muted">
                  {description}
                </p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
