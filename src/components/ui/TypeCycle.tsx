import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type TypeCycleProps = {
  words: readonly string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  holdTime?: number
}

/** Types out each word, pauses, deletes, and moves to the next — looping. */
export function TypeCycle({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 38,
  holdTime = 1400,
}: TypeCycleProps) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (reduced) {
      setText(words[index] ?? '')
      return
    }
    const current = words[index] ?? ''

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout.current = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        )
      } else {
        timeout.current = setTimeout(() => setPhase('deleting'), holdTime)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout.current = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed,
        )
      } else {
        setIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout.current)
  }, [text, phase, index, words, typeSpeed, deleteSpeed, holdTime, reduced])

  return (
    <span className={className} aria-live="polite">
      <span className="text-accent">{text || ' '}</span>
      {!reduced && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent/80 align-middle" />
      )}
    </span>
  )
}
