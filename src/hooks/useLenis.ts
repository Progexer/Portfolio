import { useEffect } from 'react'

/**
 * Smooth-scroll anchor handler using native browser scrolling.
 * Intercepts in-page `#anchor` clicks and scrolls to them smoothly
 * via `Element.scrollIntoView()`, respecting `scroll-behavior: smooth`
 * set on `<html>`.
 *
 * Replaces Lenis which hijacked the scroll wheel and caused
 * auto-scrolling / loss-of-control issues.
 */
export function useLenis() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]') as
        | HTMLAnchorElement
        | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', id)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
