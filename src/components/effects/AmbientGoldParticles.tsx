import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  parallax: number
  depth: number
  phase: number
  phaseSpeed: number
  wanderFactor: number
  dispX: number
  dispY: number
}

/**
 * AmbientGoldParticles
 * 
 * An ultra-premium, cinematic background particle system.
 * - Scattered, tiny floating dust particles (1px–3px).
 * - Multi-layer depth system (Background, Middle, Foreground).
 * - Multi-stage soft circular glow rendering (no sharp edges, no harsh dots).
 * - Elegant palette: Soft Gold, Warm Amber, and Soft White.
 * - Tab-inactive rendering pause to optimize resource usage.
 * - Responsive density adjustment for Desktop vs. Mobile viewports.
 * - Spring-damped cursor repulsion and smooth scroll-linked parallax delta wrapping.
 */
export function AmbientGoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let particles: Particle[] = []

    // Track scroll coordinates and calculate scroll delta
    let lastScrollY = window.scrollY
    let currentScrollY = window.scrollY
    
    const handleScroll = () => {
      currentScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Track mouse coordinates
    const mouse = { x: -1000, y: -1000 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // Setup and resize handler (supports sharp rendering on high-DPI screens)
    const setupCanvas = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      const oldWidth = width
      const oldHeight = height
      
      width = rect.width
      height = rect.height
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      const isMobile = width < 768

      // If particles already exist, scale their positions to keep distribution uniform
      if (particles.length > 0) {
        const scaleX = width / (oldWidth || width)
        const scaleY = height / (oldHeight || height)
        particles.forEach((p) => {
          p.x *= scaleX
          p.y *= scaleY
        })
        return
      }

      // Responsive density: 30-60 on Desktop, 15-30 on Mobile
      const densityCount = isMobile
        ? Math.min(30, Math.max(15, Math.floor((width * height) / 25000)))
        : Math.min(60, Math.max(30, Math.floor((width * height) / 30000)))

      // Curated elegant palette matching portfolio theme
      const colors = [
        'rgba(200, 164, 97, ALPHA)', // Soft Gold (#c8a461)
        'rgba(215, 150, 75, ALPHA)', // Warm Amber
        'rgba(240, 238, 233, ALPHA)', // Soft White
      ]

      for (let i = 0; i < densityCount; i++) {
        // Depth Layering: 
        // - Background (0.3 - 0.5 depth): tiny, slow, faint
        // - Middle (0.5 - 0.8 depth): medium, normal speed, slightly brighter
        // - Foreground (0.8 - 1.0 depth): slightly larger, faster, soft blur, very few
        const depth = Math.random() * 0.7 + 0.3
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Independent base velocities scaled by depth (slower far layers, faster near layers)
          vx: (Math.random() * 0.03 + 0.015) * depth, // gentle rightward drift
          vy: -(Math.random() * 0.04 + 0.02) * depth, // gentle upward float
          radius: (Math.random() * 0.9 + 0.6) * depth, // diameters between 0.6px and 1.5px based on depth
          color,
          alpha: (Math.random() * 0.15 + 0.08) * (depth * 0.6 + 0.4), // low opacity (10% to 25%)
          parallax: 0.008 + depth * 0.035, // scroll parallax between 0.008 and 0.043
          depth,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.004 + 0.002, // slow breathing frequency
          wanderFactor: Math.random() * 0.04 + 0.02, // organic wandering strength
          dispX: 0,
          dispY: 0,
        })
      }
    }

    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    // Handle tab focus / page visibility to pause rendering
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Reset scroll baseline to prevent large coordinate jumps upon return
        lastScrollY = window.scrollY
        currentScrollY = window.scrollY
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Render loop
    const draw = () => {
      // Pause drawing if tab is hidden to save battery & system resources
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Calculate scroll delta since the last animation frame
      const scrollDelta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update phase for breathing and wandering
        p.phase += p.phaseSpeed

        // Organic wander deltas (sinusoidal wind simulation)
        const wanderX = Math.sin(p.phase) * p.wanderFactor
        const wanderY = Math.cos(p.phase * 0.8) * p.wanderFactor

        // Apply base velocities + wandering + scroll parallax displacement
        p.x += p.vx + wanderX * 0.05
        p.y += p.vy + wanderY * 0.05 - scrollDelta * p.parallax

        // Wrap coordinates with a safe 30px boundary margin to prevent edge clipping/pop-in
        if (p.x < -30) p.x += width + 60
        if (p.x > width + 30) p.x -= width + 60
        if (p.y < -30) p.y += height + 60
        if (p.y > height + 30) p.y -= height + 60

        // Mouse interaction (gentle spring-like repulsion displacement)
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        let targetDispX = 0
        let targetDispY = 0

        const reactionRadius = 150
        if (distance < reactionRadius && mouse.x > 0 && mouse.y > 0) {
          const force = (reactionRadius - distance) / reactionRadius
          const maxRepulsion = 12 * p.depth // near layers react more dynamically
          targetDispX = (dx / (distance || 1)) * force * maxRepulsion
          targetDispY = (dy / (distance || 1)) * force * maxRepulsion
        }

        // Interpolate displacement smoothly (damped ease-out spring effect)
        p.dispX += (targetDispX - p.dispX) * 0.06
        p.dispY += (targetDispY - p.dispY) * 0.06

        // Compute final drawing coordinate
        const rx = p.x + p.dispX
        const ry = p.y + p.dispY

        // Compute breath alpha variation (cinematic breathing vibe)
        const breathingAlpha = p.alpha * (0.65 + 0.35 * Math.sin(p.phase))
        
        // Multi-stage glow rendering to prevent sharp dots and create soft circular embers:
        // 1. Soft outer halo
        ctx.beginPath()
        ctx.arc(rx, ry, p.radius * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('ALPHA', (breathingAlpha * 0.08).toFixed(3))
        ctx.fill()

        // 2. Soft mid blur layer
        ctx.beginPath()
        ctx.arc(rx, ry, p.radius * 2.0, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('ALPHA', (breathingAlpha * 0.28).toFixed(3))
        ctx.fill()

        // 3. Main core (soft, translucent)
        ctx.beginPath()
        ctx.arc(rx, ry, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('ALPHA', (breathingAlpha * 0.65).toFixed(3))
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', setupCanvas)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-transparent"
    />
  )
}
