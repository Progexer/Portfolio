import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { NAV_LINKS, PROFILE } from '@/data/portfolio'

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="section-container">
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="text-sm font-semibold text-white hover:text-accent transition-colors duration-300" aria-label="Home">
              {PROFILE.name}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {PROFILE.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              <FooterIcon href={PROFILE.github} label="GitHub"><Github className="h-4 w-4" /></FooterIcon>
              <FooterIcon href={PROFILE.linkedin} label="LinkedIn"><Linkedin className="h-4 w-4" /></FooterIcon>
              <FooterIcon href={`mailto:${PROFILE.email}`} label="Email"><Mail className="h-4 w-4" /></FooterIcon>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <p className="mono-label mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mono-label mb-4">Get in touch</p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${PROFILE.email}`} className="transition-colors hover:text-white">
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${PROFILE.phone}`} className="transition-colors hover:text-white">
                  {PROFILE.phone}
                </a>
              </li>
              <li>{PROFILE.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-sm text-muted">
            Designed & Built by{' '}
            <span className="font-medium text-white">{PROFILE.name}</span>
          </p>
          <p className="text-sm text-dim">© 2026</p>
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="group inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-accent hover:text-accent rounded-full"
          >
            Top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}

function FooterIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const external = href.startsWith('http')
  return (
    <motion.a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.08, rotate: 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface/30 text-muted transition-colors duration-300 hover:border-accent hover:text-accent hover:bg-accent/5"
    >
      {children}
    </motion.a>
  )
}
