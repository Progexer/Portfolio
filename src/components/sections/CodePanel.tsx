import { motion } from 'framer-motion'
import { Braces, Cpu, Database, Sparkles } from 'lucide-react'
import { EASE } from '@/lib/motion'

// Syntax-highlighted-looking lines (static, styled spans — no runtime highlighter).
const LINES: { indent?: number; content: React.ReactNode }[] = [
  { content: (<><span className="text-secondary">class</span> <span className="text-accent">Engineer</span>:</>) },
  { indent: 1, content: (<><span className="text-primary">name</span> = <span className="text-emerald-300">&quot;Amit Kumar&quot;</span></>) },
  { indent: 1, content: (<><span className="text-primary">focus</span> = [<span className="text-emerald-300">&quot;AI&quot;</span>, <span className="text-emerald-300">&quot;ML&quot;</span>, <span className="text-emerald-300">&quot;Backend&quot;</span>]</>) },
  { indent: 1, content: (<><span className="text-secondary">def</span> <span className="text-accent">build</span>(<span className="text-primary">self</span>, idea):</>) },
  { indent: 2, content: (<><span className="text-secondary">return</span> ship(idea, <span className="text-primary">production</span>=<span className="text-orange-300">True</span>)</>) },
  { indent: 1, content: (<><span className="text-white/30"># data → model → API → UI</span></>) },
  { indent: 1, content: (<><span className="text-primary">stack</span> = FastAPI + React + Postgres</>) },
]

const FLOAT_ICONS = [
  { Icon: Cpu, label: 'AI', className: '-left-5 top-10', color: 'text-primary', delay: 0 },
  { Icon: Database, label: 'Data', className: '-right-4 top-24', color: 'text-accent', delay: 0.6 },
  { Icon: Braces, label: 'API', className: '-left-6 bottom-16', color: 'text-secondary', delay: 1.1 },
]

export function CodePanel() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* glow behind */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/25 opacity-70 blur-2xl" />

      {/* floating badges */}
      {FLOAT_ICONS.map(({ Icon, label, className, color, delay }) => (
        <motion.div
          key={label}
          className={`absolute z-20 hidden items-center gap-2 rounded-2xl border border-white/10 bg-card/80 px-3 py-2 backdrop-blur-xl sm:flex ${className}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className={`h-4 w-4 ${color}`} />
          <span className="text-xs font-medium text-white/80">{label}</span>
        </motion.div>
      ))}

      {/* window */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d14]/90 shadow-glow backdrop-blur-xl">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex items-center gap-1.5 text-xs text-white/40">
            <Sparkles className="h-3 w-3 text-secondary" />
            engineer.py
          </span>
        </div>

        {/* code */}
        <div className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed">
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.14, ease: EASE }}
              className="flex gap-4"
            >
              <span className="w-4 select-none text-right text-white/20">{i + 1}</span>
              <span style={{ paddingLeft: `${(line.indent ?? 0) * 1.25}rem` }} className="text-white/85">
                {line.content}
              </span>
            </motion.div>
          ))}

          {/* blinking prompt line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex gap-4 pt-1"
          >
            <span className="w-4 select-none text-right text-white/20">8</span>
            <span className="flex items-center gap-2 text-emerald-300">
              <span className="text-white/40">$</span> deploy
              <span className="inline-block h-4 w-2 animate-pulse bg-emerald-300/80" />
            </span>
          </motion.div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-[11px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            build passing
          </span>
          <span>python · fastapi · react</span>
        </div>
      </div>
    </div>
  )
}
