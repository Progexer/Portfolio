/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkbg: '#0A0A0B',
        surface: '#111113',
        card: '#161618',
        'card-hover': '#1C1C1F',
        border: 'rgba(255,255,255,0.08)',
        'border-hover': 'rgba(255,255,255,0.14)',
        primary: '#C8A461',
        secondary: '#505054',
        accent: {
          DEFAULT: '#C8A461',
          soft: 'rgba(200,164,97,0.12)',
          muted: '#A68B4B',
        },
        muted: '#8A8A8E',
        'muted-light': '#B0B0B4',
        dim: '#505054',
      },
      fontFamily: {
        sans: [
          'DM Sans',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        'section': 'clamp(6rem, 12vh, 10rem)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        container: '72rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(200,164,97,0.1), 0 20px 60px -20px rgba(200,164,97,0.15)',
        soft: '0 10px 40px -12px rgba(0,0,0,0.6)',
        'inner-top': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'line-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'subtle-float': 'subtle-float 6s ease-in-out infinite',
        'line-grow': 'line-grow 1.2s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
