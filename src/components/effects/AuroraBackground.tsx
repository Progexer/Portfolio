/**
 * Fixed, full-page ambient background:
 *  - animated aurora blobs
 *  - moving grid
 *  - noise texture
 * Sits behind all content (z-[-1]) and is purely decorative.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base tint */}
      <div className="absolute inset-0 bg-base" />

      {/* aurora blobs */}
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-primary/25 blur-[130px] animate-aurora" />
      <div className="absolute -right-32 top-20 h-[34rem] w-[34rem] rounded-full bg-secondary/25 blur-[140px] animate-aurora-slow" />
      <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[150px] animate-aurora" />

      {/* animated grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade animate-grid-pan opacity-60" />

      {/* noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-soft-light" />

      {/* vignette to keep edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(9,9,11,0.85)_100%)]" />
    </div>
  )
}
