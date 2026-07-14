import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { EASE } from '@/lib/motion'

export type ToastKind = 'success' | 'error'

export type ToastState = {
  kind: ToastKind
  message: string
} | null

const STYLES = {
  success: {
    icon: CheckCircle2,
    border: 'border-emerald-400/25',
    accent: 'text-emerald-300',
  },
  error: {
    icon: XCircle,
    border: 'border-red-400/25',
    accent: 'text-red-300',
  },
} as const

/**
 * Fixed, accessible toast notification. Matches the editorial design language.
 */
export function Toast({
  toast,
  onClose,
}: {
  toast: ToastState
  onClose: () => void
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 sm:bottom-8"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`pointer-events-auto relative flex max-w-md items-start gap-3 border ${STYLES[toast.kind].border} bg-card px-4 py-3.5 shadow-soft backdrop-blur-xl`}
          >
            <ToastIcon kind={toast.kind} />
            <p className="relative z-10 pt-0.5 text-sm font-medium text-white/90">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="relative z-10 -mr-1 ml-1 grid h-6 w-6 shrink-0 place-items-center text-dim transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ToastIcon({ kind }: { kind: ToastKind }) {
  const Icon = STYLES[kind].icon
  return (
    <span className={`relative z-10 shrink-0 ${STYLES[kind].accent}`}>
      <Icon className="h-5 w-5" />
    </span>
  )
}
