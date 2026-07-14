# Amit Kumar — Portfolio

A premium, handcrafted personal portfolio for **Amit Kumar** — AI / ML Engineer, Data Scientist & Backend Developer.

Built to feel worthy of Awwwards: dark luxury theme, aurora gradients, animated grid, glassmorphism, cursor spotlight, magnetic buttons, tilt cards, scroll reveals, typing animation, counters, and live GitHub data.

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS** (custom design-token theme)
- **Framer Motion** (all animations)
- **Lenis** smooth scroll
- **Lucide** + **React Icons**
- **GitHub REST API** (live repos, stars, followers)
- Strict TS, code-split bundle, SEO + a11y optimized

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typechecks + production build to /dist
npm run preview    # preview the production build
```

## Project structure

```
src/
  components/
    effects/     AuroraBackground, CursorGlow, ScrollProgress, FloatingParticles
    sections/    Navbar, Hero, About, Skills, Projects, Experience,
                 Leadership, GitHubSection, Achievements, Education, Contact, Footer
    ui/          Section, Reveal, SpotlightCard, TiltCard, MagneticButton,
                 Chip, Counter, TypeCycle, Marquee
  data/portfolio.ts   ← single source of truth for ALL content
  hooks/              useLenis, useActiveSection, useGitHub, usePrefersReducedMotion
  lib/                utils (cn), motion variants
```

## Editing content

Everything (roles, projects, skills, links, education…) lives in **`src/data/portfolio.ts`**.
No content is hardcoded inside components — edit one file and the whole site updates.

## Customization notes

- **Design tokens** live in `tailwind.config.ts` (colors, fonts, animations) and `src/index.css` (glass, grid, noise, gradients).
- **Resume**: replace `public/Amit_Kumar_Resume.pdf` with your real resume (keep the filename, or update `PROFILE.resumeUrl`).
- **GitHub**: the GitHub section reads `PROFILE.githubUser` (`Progexer`) and calls the public REST API — no token needed for light traffic. If you hit rate limits, proxy the calls or add a token via a serverless function.

## Contact form (Web3Forms — already wired up)

The contact form is **fully integrated with Web3Forms** — it validates input, shows a loading state, disables the button while sending, resets on success, and displays success/error toast notifications.

To make it live you only need to **get a free Web3Forms access key and set one env var** — no account linking or OAuth authorization required.

### 1. Get a Web3Forms access key

Go to **[web3forms.com](https://web3forms.com)**, enter your email address (where you want to receive emails), and click **Create Access Key**. The key will be sent to your inbox instantly.

### 2. Add the environment variable

Create a `.env` file in the root directory (based on `.env.example`) and fill in your value:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Restart the dev server after editing `.env`. That's it — the form is now functional.
(The access key is browser-safe by design; the real `.env` file is gitignored. When deploying to Vercel/Netlify, add the same variable in the host's env settings.)

## Accessibility & performance

- Respects `prefers-reduced-motion` (animations, smooth scroll, particles all disable).
- Semantic HTML, skip-to-content link, visible focus rings, labelled inputs, ARIA where needed.
- Bundle is split (`vendor` / `motion` / app) and CSS-driven where possible.

## Deploy

Static output — deploy `/dist` to **Vercel**, **Netlify**, or any static host.

```bash
npm run build
# Vercel: framework = Vite, build = "npm run build", output = "dist"
```

---

Designed & Developed by **Amit Kumar** · © 2026
