import { motion } from 'framer-motion'
import {
  Github,
  Star,
  GitFork,
  Users,
  BookMarked,
  ArrowUpRight,
  Circle,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { useGitHub } from '@/hooks/useGitHub'
import { PROFILE } from '@/data/portfolio'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { fadeUp, stagger, EASE } from '@/lib/motion'

// Approximate brand colors for common languages.
const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
}

export function GitHubSection() {
  const { user, repos, totalStars, loading, error } = useGitHub(PROFILE.githubUser)

  const stats = [
    { icon: BookMarked, label: 'Repositories', value: user?.public_repos ?? '—' },
    { icon: Star, label: 'Total Stars', value: error ? '—' : totalStars },
    { icon: Users, label: 'Followers', value: user?.followers ?? '—' },
  ]

  return (
    <Section
      id="github"
      number="05"
      eyebrow="Open Source"
      title="Live from GitHub"
      description="Repositories and activity pulled straight from the GitHub API."
    >
      {/* Premium Stat Grid */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12"
      >
        {stats.map((s) => (
          <TiltCard key={s.label} intensity={4}>
            <SpotlightCard
              radius={180}
              spotlightColor="rgba(200, 164, 97, 0.1)"
              className="bg-card/25 border-border p-5 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-surface/80 border border-border text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white leading-none">
                  {loading ? (
                    <span className="inline-block h-6 w-12 animate-pulse rounded bg-surface" />
                  ) : (
                    s.value
                  )}
                </p>
                <p className="text-[10px] font-mono text-dim uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            </SpotlightCard>
          </TiltCard>
        ))}
      </motion.div>

      {/* Repo Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-3xl border border-border bg-card/20 p-6 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 w-5 rounded bg-surface animate-pulse" />
                <div className="h-4 w-4 rounded bg-surface animate-pulse" />
              </div>
              <div className="space-y-2 mt-4 flex-1">
                <div className="h-4 w-3/4 rounded bg-surface animate-pulse" />
                <div className="h-3 w-5/6 rounded bg-surface/60 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-surface/60 animate-pulse" />
              </div>
              <div className="flex gap-4 mt-4">
                <div className="h-3 w-12 rounded bg-surface animate-pulse" />
                <div className="h-3 w-8 rounded bg-surface animate-pulse" />
                <div className="h-3 w-8 rounded bg-surface animate-pulse" />
              </div>
            </div>
          ))}

        {!loading &&
          repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05, ease: EASE }}
              className="group block"
            >
              <SpotlightCard
                radius={280}
                spotlightColor="rgba(200, 164, 97, 0.08)"
                className="bg-card/25 border-border p-6 h-48 flex flex-col justify-between hover:border-accent/35 transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <Github className="h-4 w-4 text-dim transition-colors duration-300 group-hover:text-accent" />
                    <ArrowUpRight className="h-4 w-4 text-dim transition-transform duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  
                  <h3 className="mt-4 truncate text-sm font-semibold font-mono text-white group-hover:text-accent transition-colors duration-300">
                    {repo.name}
                  </h3>
                  
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted leading-relaxed">
                    {repo.description ?? 'No description provided.'}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4 text-[11px] font-mono text-dim">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <Circle
                        className="h-2 w-2"
                        style={{
                          color: LANG_COLORS[repo.language] ?? '#C8A461',
                          fill: LANG_COLORS[repo.language] ?? '#C8A461',
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 hover:text-white transition-colors">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1 hover:text-white transition-colors">
                    <GitFork className="h-3.5 w-3.5" />
                    {repo.forks_count}
                  </span>
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
      </div>

      {/* Error fallback */}
      {error && (
        <p className="mt-8 text-sm font-mono text-red-400">
          // Couldn&apos;t reach the GitHub API — explore everything directly on my profile.
        </p>
      )}

      {/* CTA Button */}
      <div className="mt-10">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/45 px-5 py-2.5 text-xs font-semibold text-muted transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Github className="h-4 w-4" />
          View full profile
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </Section>
  )
}
