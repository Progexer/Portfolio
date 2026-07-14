import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, PROFILE } from '@/data/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'
import { Avatar } from '@/components/ui/Avatar'

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6 pt-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={cn(
          'flex w-full max-w-5xl items-center justify-between transition-all duration-500 ease-premium',
          scrolled
            ? 'rounded-full border border-border bg-darkbg/75 px-6 py-2.5 backdrop-blur-xl shadow-soft shadow-black/40'
            : 'rounded-none border-b border-transparent bg-transparent px-2 py-4',
        )}
      >
        {/* Logo with Avatar & Pulse Indicator */}
        <div className="relative">
          <a
            href="#home"
            aria-label="Amit Kumar — home"
            className="group flex items-center gap-3 relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="relative">
              <Avatar size={34} ring={true} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-darkbg bg-emerald-500">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-accent">
                {PROFILE.name}
              </span>
              <span className="text-[10px] font-mono text-dim leading-none hidden sm:block">
                DS / AI Intern
              </span>
            </div>
          </a>

          {/* Status Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute left-0 top-12 z-50 w-56 rounded-xl border border-border bg-card p-3 shadow-glow"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Online Status
                  </span>
                </div>
                <p className="text-xs text-white font-medium">Ready for Internships & Projects</p>
                <p className="text-[10px] text-muted mt-1">Available starting immediately for Summer/Winter roles.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop links - Soft Pill Slide Backing */}
        <ul className="hidden items-center gap-1.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.replace('#', '')
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={cn(
                    'relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 z-10',
                    isActive ? 'text-white' : 'text-muted hover:text-white',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-accent/25 bg-accent/5 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.resumeUrl}
            download
            className="hidden items-center gap-2 rounded-full border border-border bg-surface/50 px-5 py-2 text-[13px] font-medium text-white transition-all duration-300 hover:border-accent hover:text-accent sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center text-white lg:hidden hover:text-accent transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-darkbg/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-x-6 top-24 rounded-3xl border border-border bg-surface p-6 shadow-glow"
            >
              <ul className="grid gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-white/[0.02] hover:text-white"
                    >
                      {link.label}
                      <span className="mono-label">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={PROFILE.resumeUrl}
                download
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center rounded-full border border-accent px-4 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-darkbg"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
