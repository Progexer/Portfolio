import { motion } from 'framer-motion'
import { Trophy, Rocket, Cpu, Layers, BarChart3 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { ACHIEVEMENTS } from '@/data/portfolio'
import { fadeUp, stagger } from '@/lib/motion'

const ICONS = [Trophy, Rocket, Cpu, Layers, BarChart3]

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={<>Milestones <span className="text-gradient">worth shipping</span></>}
      description="Hackathons, deployments and end-to-end builds that turned learning into outcomes."
    >
      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ACHIEVEMENTS.map((item, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div key={item.title} variants={fadeUp}>
              <SpotlightCard className="group flex h-full flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 text-white transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </SpotlightCard>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
