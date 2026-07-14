import { motion } from 'framer-motion'
import { MapPin, GraduationCap, CalendarDays } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Counter } from '@/components/ui/Counter'
import { ABOUT, STATS } from '@/data/portfolio'
import { fadeUp, stagger } from '@/lib/motion'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'

export function About() {
  return (
    <Section
      id="about"
      number="01"
      eyebrow="About"
      title="Turning data into deployed products"
    >
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        
        {/* Left: Bio & Facts */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {ABOUT.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="mt-0 first:mt-0 [&+&]:mt-5 text-body-lg leading-relaxed text-muted-light"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Quick facts — dynamic spotlight cards */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Fact icon={MapPin} label="Location" value={ABOUT.location} />
            <Fact icon={GraduationCap} label="Education" value={ABOUT.degree} />
            <Fact icon={CalendarDays} label="Graduating" value={ABOUT.graduation} />
          </motion.div>

          {/* Open to roles */}
          <motion.div variants={fadeUp} className="mt-10">
            <p className="mono-label mb-4">Open to</p>
            <div className="flex flex-wrap gap-2">
              {ABOUT.openTo.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="border border-border bg-card/30 px-4 py-2 text-xs font-medium text-muted-light transition-colors duration-300 hover:border-accent hover:text-accent rounded-full cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Interactive Stats Dashboard */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <TiltCard key={stat.label} intensity={5}>
                <SpotlightCard
                  radius={200}
                  spotlightColor="rgba(200, 164, 97, 0.15)"
                  className="bg-card/40 border-border p-6 text-center flex flex-col items-center justify-center min-h-[140px]"
                >
                  <p className="font-serif text-4xl text-white sm:text-5xl">
                    <Counter
                      value={stat.value}
                      decimals={'decimals' in stat ? (stat.decimals as number) : 0}
                      suffix={'suffix' in stat ? (stat.suffix as string) : ''}
                      grouping={'grouping' in stat ? (stat.grouping as boolean) : true}
                    />
                  </p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-dim">
                    {stat.label}
                  </p>
                </SpotlightCard>
              </TiltCard>
            ))}
          </div>

          {/* Real-time Status Badge */}
          <div className="mt-8 flex items-center gap-3 border border-border bg-card/10 rounded-2xl p-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-emerald-400/90">
              Actively seeking AI / ML & Data Science Internships
            </span>
          </div>
        </motion.div>

      </div>
    </Section>
  )
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin
  label: string
  value: string
}) {
  return (
    <SpotlightCard
      radius={150}
      spotlightColor="rgba(200, 164, 97, 0.08)"
      className="border-border bg-card/20 p-4 min-h-[100px] flex flex-col justify-between"
    >
      <div className="flex items-center gap-1.5 text-dim">
        <Icon className="h-4 w-4 text-accent" />
        <span className="mono-label text-[10px]">{label}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-white leading-snug">{value}</p>
    </SpotlightCard>
  )
}
