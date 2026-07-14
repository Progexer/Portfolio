import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function HeroPortrait() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const reduced = usePrefersReducedMotion()

  // Track scroll for vertical parallax
  const { scrollY } = useScroll()
  const portraitY = useTransform(scrollY, [0, 600], [0, 50])
  const glowYOffset = useTransform(scrollY, [0, 600], [0, 25])
  const gridY = useTransform(scrollY, [0, 600], [0, 15])

  // Track mouse coordinates for interactive 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Butter-smooth physics springs
  const springConfig = { stiffness: 90, damping: 22 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  // 3D rotations based on springs
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-5, 5])

  // Parallax translation offsets based on springs
  const pTranslateX = useTransform(xSpring, [-0.5, 0.5], [8, -8])
  const pTranslateY = useTransform(ySpring, [-0.5, 0.5], [8, -8])

  // Glow position shift
  const glowX = useTransform(xSpring, [-0.5, 0.5], [-15, 15])
  const glowY = useTransform(ySpring, [-0.5, 0.5], [-15, 15])

  // Dynamic light overlay position (shine/glint effect)
  const shineX = useTransform(xSpring, [-0.5, 0.5], ['-20%', '120%'])
  const shineY = useTransform(ySpring, [-0.5, 0.5], ['-20%', '120%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
    >
      {/* 1. Ambient Background Glow (Rim Light Backdrop) */}
      <motion.div
        className="absolute w-[110%] aspect-square rounded-full blur-[90px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(200, 164, 97, 0.14) 0%, rgba(200, 164, 97, 0.02) 60%, transparent 80%)',
          x: reduced ? 0 : glowX,
          y: reduced ? 0 : useTransform(() => glowY.get() + glowYOffset.get()),
        }}
      />

      {/* 2. Latent Space Vector Grid (Floating behind the photo) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          y: reduced ? 0 : gridY,
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg className="w-full h-full opacity-[0.25]" viewBox="0 0 500 500" fill="none">
          <defs>
            <linearGradient id="latentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(200, 164, 97, 0.3)" />
              <stop offset="60%" stopColor="rgba(200, 164, 97, 0.08)" />
              <stop offset="100%" stopColor="rgba(200, 164, 97, 0.0)" />
            </linearGradient>
          </defs>

          {/* Manifold coordinate lines */}
          <path d="M 50,280 Q 250,180 450,280" stroke="url(#latentGrad)" strokeWidth="1" />
          <path d="M 50,340 Q 250,240 450,340" stroke="url(#latentGrad)" strokeWidth="1" />
          <path d="M 50,400 Q 250,300 450,400" stroke="url(#latentGrad)" strokeWidth="1" />

          <path d="M 150,100 Q 200,300 150,450" stroke="url(#latentGrad)" strokeWidth="1" />
          <path d="M 250,80 Q 300,300 250,450" stroke="url(#latentGrad)" strokeWidth="1" />
          <path d="M 350,100 Q 400,300 350,450" stroke="url(#latentGrad)" strokeWidth="1" />

          {/* Coordinate markers */}
          <circle cx="250" cy="240" r="4.5" fill="#c8a461" className="animate-pulse" style={{ transformOrigin: '250px 240px' }} />
          <circle cx="250" cy="240" r="2" fill="#c8a461" />
          
          <circle cx="160" cy="345" r="2.5" fill="#c8a461" opacity="0.6" />
          <text x="170" y="348" fill="rgba(200,164,97,0.4)" fontSize="8.5" fontFamily="monospace">x_t: [0.82, 0.14, 0.95]</text>
          
          <circle cx="330" cy="405" r="2.5" fill="#c8a461" opacity="0.6" />
          <text x="340" y="408" fill="rgba(200,164,97,0.4)" fontSize="8.5" fontFamily="monospace">loss: 0.0042</text>
        </svg>
      </motion.div>

      {/* 3. Outer Abstract Geometric Wireframe (Editorial Parallax offset) */}
      <motion.div
        className="absolute w-[88%] aspect-square border border-accent/10 rounded-2xl pointer-events-none z-15"
        style={{
          x: reduced ? 0 : useTransform(() => pTranslateX.get() * -0.5),
          y: reduced ? 0 : useTransform(() => (portraitY.get() + pTranslateY.get()) * 0.8),
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      />

      {/* 4. Fine Corner Accents / Technical Markers */}
      <motion.div
        className="absolute w-[92%] aspect-square pointer-events-none z-35"
        style={{
          x: reduced ? 0 : useTransform(() => pTranslateX.get() * 0.4),
          y: reduced ? 0 : useTransform(() => (portraitY.get() + pTranslateY.get()) * 0.9),
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
        }}
      >
        {/* Top-Left Bracket */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
        
        {/* Metadata display */}
        <span className="absolute -top-6 left-2 font-mono text-[9px] text-accent/30 tracking-wider whitespace-nowrap">
          SRC_SYS: [AMIT_KUMAR.DS]
        </span>
        <span className="absolute -bottom-6 right-2 font-mono text-[9px] text-accent/30 tracking-wider whitespace-nowrap">
          DIM_SPACE: 512D // SEED_42
        </span>
      </motion.div>

      {/* 5. Main Photograph Container */}
      <motion.div
        className="relative w-[85%] aspect-square z-20 rounded-2xl overflow-hidden cursor-pointer bg-darkbg border border-white/5"
        style={{
          y: reduced ? 0 : useTransform(() => portraitY.get() + pTranslateY.get()),
          x: reduced ? 0 : pTranslateX,
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9)',
        }}
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The Original Image (Scaled and translated to focus on upper body/folded arms) */}
        <img
          src="/profile_original.jpg"
          alt="Amit Kumar"
          className="w-full h-full object-cover select-none pointer-events-none scale-[1.3] translate-y-[3.5%]"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Cinematic Vignette Overlay (Blends the photo's background to darkbg at the edges) */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle at 50% 46%, transparent 25%, rgba(10, 10, 11, 0.15) 50%, rgba(10, 10, 11, 0.7) 75%, rgba(10, 10, 11, 0.98) 95%, #0A0A0B 100%)',
          }}
        />

        {/* Ambient Color Grading Overlay (Simulates warm amber rim/ambient light on the subject) */}
        <div
          className="absolute inset-0 pointer-events-none z-15 mix-blend-color-burn opacity-35"
          style={{
            background: 'linear-gradient(135deg, rgba(200, 164, 97, 0.15) 0%, transparent 60%, rgba(200, 164, 97, 0.08) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-15 mix-blend-screen opacity-[0.12]"
          style={{
            background: 'linear-gradient(210deg, rgba(200, 164, 97, 0.25) 0%, transparent 50%)',
          }}
        />

        {/* Dynamic Light Sheet/Shine Overlay (moves with mouse cursor) */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-30"
            style={{
              background: useTransform(
                () => `radial-gradient(circle 250px at ${shineX.get()} ${shineY.get()}, rgba(255, 255, 255, 0.35), transparent 80%)`
              ),
            }}
          />
        )}

        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-darkbg text-accent/30 font-mono text-xs animate-pulse">
            [INITIALIZING_PORTRAIT...]
          </div>
        )}
      </motion.div>

      {/* 6. Integrated soft ground shadow below the image */}
      <motion.div
        className="absolute bottom-2 w-[85%] h-[15px] pointer-events-none z-10 blur-md opacity-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 75%)',
          x: reduced ? 0 : pTranslateX,
        }}
      />
    </div>
  )
}
