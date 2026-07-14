import { motion } from 'framer-motion'

/**
 * Generates a distinct, on-brand abstract visual for each project.
 * No external images — fully themed with the new editorial palette.
 * `seed` selects the layout so each card looks different.
 */
export function ProjectVisual({ seed, title }: { seed: number; title: string }) {
  const variant = seed % 4

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-accent/[0.04]" />

      {/* Faux dashboard chrome */}
      <div className="absolute inset-4 border border-border bg-darkbg/80 p-4 transition-transform duration-700 ease-premium group-hover:scale-[1.02]">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <span className="h-1.5 w-1.5 rounded-full bg-dim" />
          <span className="h-1.5 w-1.5 rounded-full bg-dim" />
          <span className="h-1.5 w-1.5 rounded-full bg-dim" />
          <span className="ml-auto truncate text-[9px] font-mono text-dim">
            {title}
          </span>
        </div>

        <div className="mt-3">
          {variant === 0 && <ChartLayout />}
          {variant === 1 && <NetworkLayout />}
          {variant === 2 && <ListLayout />}
          {variant === 3 && <GaugeLayout />}
        </div>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
    </div>
  )
}

function ChartLayout() {
  const bars = [45, 70, 38, 88, 60, 76, 52]
  return (
    <div className="grid h-[calc(100%-1rem)] grid-cols-3 gap-2">
      <div className="col-span-2 flex items-end gap-1.5 border border-border p-2.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 bg-accent/60"
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex-1 border border-border p-2">
          <div className="h-1.5 w-8 bg-accent/40" />
          <div className="mt-1.5 h-3 w-10 bg-dim/30" />
        </div>
        <div className="flex-1 border border-border p-2">
          <div className="h-1.5 w-6 bg-accent/30" />
          <div className="mt-1.5 h-3 w-9 bg-dim/30" />
        </div>
      </div>
    </div>
  )
}

function NetworkLayout() {
  const nodes = [
    { x: 20, y: 30 }, { x: 55, y: 20 }, { x: 80, y: 45 },
    { x: 35, y: 65 }, { x: 68, y: 72 }, { x: 48, y: 45 },
  ]
  return (
    <div className="relative h-[calc(100%-1rem)] border border-border">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => (
            <line
              key={`${i}-${j}`}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="rgba(200,164,97,0.15)" strokeWidth="0.4"
            />
          )),
        )}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y}
            r={i === 5 ? 3 : 2}
            fill={i === 5 ? '#C8A461' : 'rgba(200,164,97,0.5)'}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  )
}

function ListLayout() {
  return (
    <div className="grid h-[calc(100%-1rem)] gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="flex items-center gap-2 border border-border px-2.5"
        >
          <span className="h-6 w-6 bg-accent/20" />
          <div className="flex-1">
            <div className="h-1.5 w-2/3 bg-dim/40" />
            <div className="mt-1 h-1.5 w-1/3 bg-dim/20" />
          </div>
          <span className="h-4 w-8 bg-accent/30" />
        </motion.div>
      ))}
    </div>
  )
}

function GaugeLayout() {
  return (
    <div className="flex h-[calc(100%-1rem)] items-center justify-center border border-border">
      <svg viewBox="0 0 100 60" className="h-24 w-40">
        <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" strokeLinecap="round" />
        <motion.path
          d="M10 55 A40 40 0 0 1 90 55"
          fill="none"
          stroke="#C8A461"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="126"
          initial={{ strokeDashoffset: 126 }}
          whileInView={{ strokeDashoffset: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <text x="50" y="48" textAnchor="middle" className="fill-white text-[13px] font-mono font-medium">
          92%
        </text>
      </svg>
    </div>
  )
}
