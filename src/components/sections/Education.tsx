import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { EDUCATION } from '@/data/portfolio'
import { fadeUp } from '@/lib/motion'

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={<>The <span className="text-gradient">path</span> so far</>}
      description="A steady climb from foundations to a data-science focused engineering degree."
    >
      <div className="relative">
        {/* vertical spine */}
        <div
          aria-hidden
          className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent md:left-1/2"
        />

        <ol className="space-y-8">
          {EDUCATION.map((edu, i) => {
            const alignRight = i % 2 === 1
            return (
              <motion.li
                key={edu.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-14 md:pl-0"
              >
                <div
                  className={`md:grid md:grid-cols-2 md:gap-10 ${
                    alignRight ? '' : ''
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-card text-secondary md:left-1/2 md:-translate-x-1/2">
                    <GraduationCap className="h-5 w-5" />
                  </span>

                  <div
                    className={`${
                      alignRight ? 'md:col-start-2' : 'md:col-start-1'
                    }`}
                  >
                    <SpotlightCard className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-secondary">
                          {edu.level}
                        </span>
                        <span className="text-xs font-medium text-muted">
                          {edu.period}
                        </span>
                      </div>
                      <h3 className="mt-3 font-bold text-white">{edu.title}</h3>
                      <p className="mt-1.5 text-sm text-muted">{edu.detail}</p>
                    </SpotlightCard>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
