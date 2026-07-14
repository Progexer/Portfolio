import { motion } from 'framer-motion'
import { Users, Sparkles } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { LEADERSHIP } from '@/data/portfolio'
import { fadeUp } from '@/lib/motion'

export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="Leadership"
      title={<>Building <span className="text-gradient">communities</span>, not just code</>}
      description="Leading outreach and partnerships beyond the terminal."
    >
      <div className="grid gap-6">
        {LEADERSHIP.map((item, i) => (
          <motion.div
            key={item.org}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <SpotlightCard className="p-7 sm:p-9" spotlightColor="rgba(139,92,246,0.14)">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-secondary">
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.org}</h3>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-gradient">
                      <Sparkles className="h-3.5 w-3.5" />
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70">
                {item.summary}
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {item.points.map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-white/75"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-secondary to-accent" />
                    {p}
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
