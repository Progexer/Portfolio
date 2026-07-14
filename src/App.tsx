import { useLenis } from '@/hooks/useLenis'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { AmbientGoldParticles } from '@/components/effects/AmbientGoldParticles'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function App() {
  useLenis()

  return (
    <>
      <AmbientGoldParticles />
      <CursorGlow />
      <ScrollProgress />

      <div className="relative z-10 overflow-x-hidden">
        {/* Skip link for keyboard / screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-card focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <GitHubSection />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
