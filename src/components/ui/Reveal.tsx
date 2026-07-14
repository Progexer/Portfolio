import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'header'
}

/** Scroll-reveal wrapper — fades/slides content into view once on scroll. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
