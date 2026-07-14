import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowUpRight, ArrowLeft, ArrowRight, Keyboard } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { ProjectVisual } from './ProjectVisual'
import { PROJECTS, type Project } from '@/data/portfolio'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { EASE } from '@/lib/motion'

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
    setScrollProgress(progress)

    // Calculate active slide index
    const child = scrollRef.current.children[0] as HTMLElement
    if (child) {
      const cardWidth = child.getBoundingClientRect().width
      const gap = 24 // gap-6 is 24px
      const index = Math.round(scrollLeft / (cardWidth + gap))
      setActiveIndex(Math.max(0, Math.min(index, PROJECTS.length - 1)))
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const child = scrollRef.current.children[0] as HTMLElement
    if (child) {
      const cardWidth = child.getBoundingClientRect().width
      const gap = 24
      const scrollAmount = cardWidth + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scroll('left')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scroll('right')
    }
  }

  // Hook scroll listener
  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true })
      // Initial calculation
      handleScroll()
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Section
      id="projects"
      number="02"
      eyebrow="Featured Work"
      title="Projects that ship"
      description="End-to-end AI platforms, ML pipelines, and production backends — each built from data to deployed product."
    >
      {/* Keyboard and Drag Guide */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-dim">
          <Keyboard className="h-4 w-4" />
          <span>[ ← / → keys or drag to navigate projects ]</span>
        </div>
        
        {/* Navigation Dots and Slide Counter */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted">
            <span className="text-white font-medium">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-dim"> / </span>
            <span>{String(PROJECTS.length).padStart(2, '0')}</span>
          </span>
          <div className="flex gap-1.5">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!scrollRef.current) return
                  const child = scrollRef.current.children[0] as HTMLElement
                  if (child) {
                    const cardWidth = child.getBoundingClientRect().width
                    const gap = 24
                    scrollRef.current.scrollTo({
                      left: i * (cardWidth + gap),
                      behavior: 'smooth',
                    })
                  }
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-border-hover'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Draggable Slider Frame */}
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="group/slider relative outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-3xl"
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 pt-2 cursor-grab active:cursor-grabbing px-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="w-[88vw] sm:w-[540px] shrink-0 snap-start snap-always"
            >
              <ProjectSliderCard project={project} index={i} isActive={activeIndex === i} />
            </div>
          ))}
          {/* Elegant Spacer to allow the last project card to scroll and snap to the left edge */}
          <div className="w-[12vw] sm:w-[calc(100%-540px-48px)] shrink-0 pointer-events-none" />
        </div>

        {/* Floating Navigation Chevrons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hidden md:block">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-darkbg/80 backdrop-blur-md text-white transition-all hover:border-accent hover:text-accent shadow-soft"
            aria-label="Previous Project"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hidden md:block">
          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-darkbg/80 backdrop-blur-md text-white transition-all hover:border-accent hover:text-accent shadow-soft"
            aria-label="Next Project"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="mt-8 relative h-[2px] w-full bg-border rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-accent origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>
    </Section>
  )
}

function ProjectSliderCard({
  project,
  index,
  isActive,
}: {
  project: Project
  index: number
  isActive: boolean
}) {
  return (
    <SpotlightCard
      radius={380}
      spotlightColor="rgba(200, 164, 97, 0.12)"
      className={`h-full border-border bg-card/25 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98]'
      }`}
    >
      <div className="space-y-6">
        
        {/* Project Visual wrapped in TiltCard */}
        <TiltCard intensity={4}>
          <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="h-full w-full transition-transform duration-700 ease-premium group-hover/avatar:scale-105">
              <ProjectVisual seed={index} title={project.title} />
            </div>
            
            <div className="absolute left-3 top-3 z-10">
              <span className="rounded bg-darkbg/95 border border-accent/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-accent backdrop-blur-sm">
                {project.category}
              </span>
            </div>
            
            <div className="absolute right-3 top-3 z-10">
              <span className="text-[10px] font-mono text-dim">0{index + 1}</span>
            </div>
          </div>
        </TiltCard>

        {/* Content Area */}
        <div>
          <h3 className="font-serif text-2xl text-white group-hover:text-accent transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-xs font-mono text-accent/80 tracking-wide">
            {project.tagline}
          </p>
          <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
            {project.description}
          </p>
        </div>

        {/* Dynamic Metric Badges */}
        {project.metrics && (
          <div className="flex gap-6 border-t border-border pt-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-base font-bold text-white font-mono">{m.value}</p>
                <p className="text-[10px] font-mono text-dim uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-surface/30 px-3 py-1 text-[10px] font-medium text-muted-light transition-colors hover:border-accent/40 hover:text-accent"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="text-[10px] font-mono text-dim self-center pl-1">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-4 border-t border-border/65 flex items-center justify-between">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Github className="h-3.5 w-3.5" />
          View Code
        </a>
        
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-accent"
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

    </SpotlightCard>
  )
}
