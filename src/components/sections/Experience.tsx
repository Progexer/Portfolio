import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { BriefcaseBusiness, GraduationCap, Users, Trophy } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { EXPERIENCE, LEADERSHIP, ACHIEVEMENTS, EDUCATION } from '@/data/portfolio'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { fadeUp, stagger, EASE } from '@/lib/motion'

export function Experience() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  // Refs for tracking height of last items and parent columns
  const lastLeftItemRef = useRef<HTMLDivElement>(null)
  const lastRightItemRef = useRef<HTMLDivElement>(null)
  const [leftHeights, setLeftHeights] = useState({ column: 600, lastItem: 150 })
  const [rightHeights, setRightHeights] = useState({ column: 600, lastItem: 300 })

  useEffect(() => {
    const measure = () => {
      if (leftRef.current && lastLeftItemRef.current) {
        setLeftHeights({
          column: leftRef.current.clientHeight,
          lastItem: lastLeftItemRef.current.clientHeight,
        })
      }
      if (rightRef.current && lastRightItemRef.current) {
        setRightHeights({
          column: rightRef.current.clientHeight,
          lastItem: lastRightItemRef.current.clientHeight,
        })
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Calculate dynamic threshold where scroll progress hits the last node's vertical center
  // Left: last node is at column height - last item height + 24px (icon center is 24px from top)
  const leftNode2Threshold = leftHeights.column > 48
    ? (leftHeights.column - leftHeights.lastItem) / (leftHeights.column - 48)
    : 0.8

  // Right: last node is at column height - last item height + 24px (icon center is 24px from top)
  const rightNode2Threshold = rightHeights.column > 48
    ? (rightHeights.column - rightHeights.lastItem) / (rightHeights.column - 48)
    : 0.8

  const { scrollYProgress: leftScroll } = useScroll({
    target: leftRef,
    offset: ['start center', 'end center'],
  })

  const { scrollYProgress: rightScroll } = useScroll({
    target: rightRef,
    offset: ['start center', 'end center'],
  })

  // Smooth springs for scroll interpolation
  const leftScaleY = useSpring(leftScroll, { stiffness: 80, damping: 25, restDelta: 0.001 })
  const rightScaleY = useSpring(rightScroll, { stiffness: 80, damping: 25, restDelta: 0.001 })

  // Bulb travels smoothly from top-6 (24px) to bottom-6 (24px from container bottom)
  const leftBulbY = useTransform(leftScaleY, [0, 1], ['24px', 'calc(100% - 24px)'])
  const rightBulbY = useTransform(rightScaleY, [0, 1], ['24px', 'calc(100% - 24px)'])

  // Active state states for nodes (driven by scroll progress thresholds)
  const [leftNode1Active, setLeftNode1Active] = useState(false)
  const [leftNode2Active, setLeftNode2Active] = useState(false)
  const [rightNode1Active, setRightNode1Active] = useState(false)
  const [rightNode2Active, setRightNode2Active] = useState(false)

  useEffect(() => {
    const unsub1 = leftScaleY.onChange((v) => {
      setLeftNode1Active(v >= 0.01)
      setLeftNode2Active(v >= leftNode2Threshold - 0.02)
    })
    const unsub2 = rightScaleY.onChange((v) => {
      setRightNode1Active(v >= 0.01)
      setRightNode2Active(v >= rightNode2Threshold - 0.02)
    })
    return () => {
      unsub1()
      unsub2()
    }
  }, [leftScaleY, rightScaleY, leftNode2Threshold, rightNode2Threshold])

  return (
    <Section
      id="experience"
      number="03"
      eyebrow="Experience & Background"
      title="From foundations to shipping products"
      description="Education, internship, leadership, and milestones — the full picture."
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20 items-start">
        
        {/* Left Column: Work + Education */}
        <motion.div
          ref={leftRef}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Static background trace line (goes to bottom-6) */}
          <div className="absolute left-[19px] top-6 bottom-6 w-[1.5px] bg-border" />
          
          {/* Animated active fill line (goes to bottom-6) */}
          <motion.div
            className="absolute left-[19px] top-6 bottom-6 w-[1.5px] bg-accent origin-top"
            style={{ scaleY: leftScaleY }}
          />

          {/* Traveling Glowing Bulb */}
          <motion.div
            className="absolute left-[19px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(200,164,97,0.8)] z-20 pointer-events-none"
            style={{ top: leftBulbY }}
          />

          {/* Work Experience mapping */}
          {EXPERIENCE.map((exp) => (
            <motion.div key={exp.role} variants={fadeUp} className="mb-12 relative group">
              <div className="flex items-start gap-4">
                
                {/* Interactive spring icon marker */}
                <motion.span
                  animate={{
                    borderColor: leftNode1Active ? '#c8a461' : 'rgba(255,255,255,0.1)',
                    color: leftNode1Active ? '#c8a461' : 'rgba(255,255,255,0.4)',
                    boxShadow: leftNode1Active ? '0 0 12px rgba(200, 164, 97, 0.3)' : 'none',
                    scale: leftNode1Active ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-card transition-colors duration-300 z-10 cursor-default"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                </motion.span>

                {/* Info block */}
                <div className="flex-1 rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-border/50 hover:bg-card/10">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-muted font-mono">{exp.org}</p>
                    </div>
                    <span className="mono-label shrink-0 mt-1 text-[10px] border border-border/80 px-2 py-0.5 rounded bg-surface/50">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-light">
                    {exp.summary}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {exp.points.map((p) => (
                      <span key={p} className="flex items-center gap-2 text-xs text-muted">
                        <span className="h-px w-3 bg-accent/50" />
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-border bg-surface/40 px-2 py-0.5 text-[10px] font-mono text-dim hover:text-muted-light transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}

          {/* Education mapping */}
          {EDUCATION.map((edu, idx) => (
            <motion.div 
              ref={idx === EDUCATION.length - 1 ? lastLeftItemRef : undefined}
              key={edu.title} 
              variants={fadeUp} 
              className="relative group"
            >
              <div className="flex items-start gap-4">
                <motion.span
                  animate={{
                    borderColor: leftNode2Active ? '#c8a461' : 'rgba(255,255,255,0.1)',
                    color: leftNode2Active ? '#c8a461' : 'rgba(255,255,255,0.4)',
                    boxShadow: leftNode2Active ? '0 0 12px rgba(200, 164, 97, 0.3)' : 'none',
                    scale: leftNode2Active ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-card transition-colors duration-300 z-10 cursor-default"
                >
                  <GraduationCap className="h-4 w-4" />
                </motion.span>
                
                <div className="flex-1 rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-border/50 hover:bg-card/10">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300">
                        {edu.title}
                      </h3>
                      <p className="text-sm text-muted font-mono">{edu.detail}</p>
                    </div>
                    <span className="mono-label shrink-0 mt-1 text-[10px] border border-border/80 px-2 py-0.5 rounded bg-surface/50">
                      {edu.period}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column: Leadership + Achievements */}
        <motion.div
          ref={rightRef}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative animate-timeline-reveal"
        >
          {/* Static background trace line (goes to bottom-6) */}
          <div className="absolute left-[19px] top-6 bottom-6 w-[1.5px] bg-border" />
          
          {/* Animated active fill line (goes to bottom-6) */}
          <motion.div
            className="absolute left-[19px] top-6 bottom-6 w-[1.5px] bg-accent origin-top"
            style={{ scaleY: rightScaleY }}
          />

          {/* Traveling Glowing Bulb */}
          <motion.div
            className="absolute left-[19px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(200,164,97,0.8)] z-20 pointer-events-none"
            style={{ top: rightBulbY }}
          />

          {/* Leadership mapping */}
          {LEADERSHIP.map((item) => (
            <motion.div key={item.org} variants={fadeUp} className="mb-12 relative group">
              <div className="flex items-start gap-4">
                <motion.span
                  animate={{
                    borderColor: rightNode1Active ? '#c8a461' : 'rgba(255,255,255,0.1)',
                    color: rightNode1Active ? '#c8a461' : 'rgba(255,255,255,0.4)',
                    boxShadow: rightNode1Active ? '0 0 12px rgba(200, 164, 97, 0.3)' : 'none',
                    scale: rightNode1Active ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-card transition-colors duration-300 z-10 cursor-default"
                >
                  <Users className="h-4 w-4" />
                </motion.span>
                
                <div className="flex-1 rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-border/50 hover:bg-card/10">
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    {item.org}
                  </h3>
                  <p className="text-xs font-mono text-accent mt-0.5">{item.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-light">
                    {item.summary}
                  </p>
                  <div className="mt-3 grid gap-1.5">
                    {item.points.map((p) => (
                      <span key={p} className="flex items-center gap-2 text-xs text-muted">
                        <span className="h-px w-3 bg-border" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Achievements & Milestones */}
          {ACHIEVEMENTS.length > 0 && (
            <motion.div 
              ref={lastRightItemRef}
              variants={fadeUp} 
              className="relative group"
            >
              <div className="flex items-start gap-4">
                <motion.span
                  animate={{
                    borderColor: rightNode2Active ? '#c8a461' : 'rgba(255,255,255,0.1)',
                    color: rightNode2Active ? '#c8a461' : 'rgba(255,255,255,0.4)',
                    boxShadow: rightNode2Active ? '0 0 12px rgba(200, 164, 97, 0.3)' : 'none',
                    scale: rightNode2Active ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-card transition-colors duration-300 z-10 cursor-default"
                >
                  <Trophy className="h-4 w-4" />
                </motion.span>
                
                <div className="flex-1">
                  <SpotlightCard
                    radius={240}
                    spotlightColor="rgba(200, 164, 97, 0.1)"
                    className="bg-card/25 border-border p-6 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="mono-label text-[10px]">Milestones</span>
                    </div>
                    <div className="space-y-4">
                      {ACHIEVEMENTS.map((item) => (
                        <div
                          key={item.title}
                          className="border-l border-border/80 pl-4 transition-colors duration-500 hover:border-accent group/milestone cursor-default"
                        >
                          <p className="text-sm font-semibold text-white group-hover/milestone:text-accent transition-colors duration-300">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted mt-0.5">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </Section>
  )
}
