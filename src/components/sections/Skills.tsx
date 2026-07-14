import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Marquee } from '@/components/ui/Marquee'
import { SKILLS } from '@/data/portfolio'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { fadeUp, stagger, EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const ALL_TECH = SKILLS.flatMap((s) => s.items)

// Quick summary details matching his identity
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  All: 'A comprehensive view of my developer and data science toolkit.',
  Languages: 'Core programming languages for scripting, modeling, and system design.',
  'Machine Learning': 'Libraries and frameworks for statistical modeling, pipeline architecture, and predictive analytics.',
  Backend: 'Tech for building fast, secure, and production-ready APIs and data stores.',
  Frontend: 'Client craft tools to present data structures through interactive dashboards.',
  Visualization: 'Platforms for designing intuitive insights from complex telemetry.',
  'Tools & Infra': 'Environment utilities, containerization, and version control infrastructure.',
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', ...SKILLS.map((s) => s.name)]

  const filteredSkills =
    activeCategory === 'All'
      ? SKILLS
      : SKILLS.filter((cat) => cat.name === activeCategory)

  return (
    <Section
      id="skills"
      number="04"
      eyebrow="Tech Stack"
      title="Tools I use to ship"
      description="A complete toolkit spanning machine learning, backend engineering, frontend craft, and data visualization."
    >
      {/* Category Navigation Tabs */}
      <div className="mb-12 flex flex-wrap gap-2 justify-start items-center border-b border-border/40 pb-6 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'relative rounded-full px-4 py-2 text-xs font-mono tracking-wider transition-colors duration-300',
                isActive ? 'text-darkbg font-semibold' : 'text-muted hover:text-white',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-skill-tab"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          )
        })}
      </div>

      {/* active category description */}
      <div className="mb-10 text-sm text-muted max-w-xl font-mono">
        <span>// {CATEGORY_DESCRIPTIONS[activeCategory]}</span>
      </div>

      {/* Grid Content with Staggered Entrance */}
      <div className="relative min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={cn(
              'grid gap-6',
              activeCategory === 'All'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            )}
          >
            {filteredSkills.map((category) => (
              <SpotlightCard
                key={category.name}
                radius={240}
                spotlightColor="rgba(200, 164, 97, 0.08)"
                className="bg-card/25 border-border p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/60">
                    <h3 className="text-base font-semibold text-white font-mono">{category.name}</h3>
                    <span className="text-xs font-mono text-dim">[{category.items.length}]</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, idx) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.03, ease: EASE }}
                        whileHover={{ y: -2, scale: 1.06, borderColor: 'rgba(200, 164, 97, 0.5)', color: '#fff' }}
                        className="rounded border border-border bg-surface/50 px-3.5 py-2 text-xs font-medium text-muted-light transition-all cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tech marquee — subtle, editorial */}
      <div className="mt-20 border-t border-border/40 pt-10">
        <Marquee speed={30} className="py-2 opacity-50 hover:opacity-80 transition-opacity duration-300">
          {ALL_TECH.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-6 text-sm font-semibold tracking-wider font-mono text-dim"
            >
              {tech.toUpperCase()}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
