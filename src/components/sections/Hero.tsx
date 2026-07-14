import { motion } from 'framer-motion'
import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react'
import { PROFILE } from '@/data/portfolio'
import { TypeCycle } from '@/components/ui/TypeCycle'
import { EASE, stagger, fadeUp } from '@/lib/motion'
import { InteractiveMesh } from '@/components/effects/InteractiveMesh'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { HeroPortrait } from '@/components/ui/HeroPortrait'


export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      {/* Interactive Neural Net Canvas Background */}
      <InteractiveMesh />

      {/* Subtle ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-darkbg/90" />
        <div className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-[100px]" />
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
      </div>

      <div className="section-container w-full">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-center">
          
          {/* Left Column: Title, Bios, CTAs, Socials */}
          <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="z-10">
            {/* Eyebrow Status Badge */}
            <motion.div variants={fadeUp} className="mb-6 inline-flex">
              <span className="eyebrow border border-accent/20 bg-accent/5 rounded-full px-4 py-1.5 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Data Science Intern · 2026
              </span>
            </motion.div>

            {/* Main title: Split-text, Blur-to-sharp */}
            <h1 className="font-serif text-display-hero text-white leading-[0.95] tracking-tight">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  }
                }}
                className="flex flex-wrap gap-x-[0.22em]"
              >
                {['Building', 'intelligent'].map((text, i) => (
                  <span key={text} className="inline-block overflow-hidden py-[0.08em] -my-[0.08em]">
                    <motion.span
                      variants={{
                        hidden: { y: '100%', filter: 'blur(8px)', opacity: 0 },
                        show: {
                          y: '0%',
                          filter: 'blur(0px)',
                          opacity: 1,
                          transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                      className={i === 1 ? 'italic text-accent' : ''}
                    >
                      {text}
                    </motion.span>
                  </span>
                ))}
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
                  }
                }}
                className="flex flex-wrap gap-x-[0.22em] mt-2 sm:mt-0"
              >
                {['systems', 'with', 'data'].map((text) => (
                  <span key={text} className="inline-block overflow-hidden py-[0.08em] -my-[0.08em]">
                    <motion.span
                      variants={{
                        hidden: { y: '100%', filter: 'blur(8px)', opacity: 0 },
                        show: {
                          y: '0%',
                          filter: 'blur(0px)',
                          opacity: 1,
                          transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                    >
                      {text}
                    </motion.span>
                  </span>
                ))}
              </motion.div>
            </h1>

            {/* Role dynamic cycling */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-baseline gap-3 text-lg text-muted sm:text-xl font-sans"
            >
              <span className="text-dim">I'm</span>
              <span className="font-medium text-white">{PROFILE.name}</span>
              <span className="text-dim">—</span>
              <TypeCycle words={PROFILE.roles} />
            </motion.div>

            {/* Introduction paragraph */}
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-body-lg text-muted leading-relaxed"
            >
              {PROFILE.intro}
            </motion.p>

            {/* Premium Magnetic CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="#projects" variant="primary">
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton href={PROFILE.resumeUrl} download variant="outline">
                <Download className="h-4 w-4" />
                Resume
              </MagneticButton>
            </motion.div>

            {/* Social profiles row */}
            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4">
              <span className="mono-label">Find me</span>
              <div className="h-px w-8 bg-border" />
              <div className="flex gap-2">
                <SocialIcon href={PROFILE.github} label="GitHub">
                  <Github className="h-4.5 w-4.5" />
                </SocialIcon>
                <SocialIcon href={PROFILE.linkedin} label="LinkedIn">
                  <Linkedin className="h-4.5 w-4.5" />
                </SocialIcon>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Interactive Portrait */}
          <div className="flex justify-center items-center relative w-full mt-8 lg:mt-0">
            <HeroPortrait />
          </div>

        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 lg:flex"
        >
          <motion.div
            className="h-12 w-px bg-gradient-to-b from-accent/60 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
            style={{ transformOrigin: 'top' }}
          />
          <span className="mono-label [writing-mode:vertical-lr] text-dim">scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/30 text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5"
    >
      {children}
    </a>
  )
}
