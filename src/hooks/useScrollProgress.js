import { useEffect, useRef } from 'react'

// Writes a 0..1 scroll-progress value to a CSS custom property on the element
// as it travels through the viewport, so CSS can drive parallax / morphing
// without a React re-render per frame (mirrors the hand-rolled rAF approach in
// Hero.jsx). The work is gated by an IntersectionObserver — the rAF only runs
// while the element is on screen.
//
// progress = 0 when the element's top hits the bottom of the viewport,
//            1 when the element's bottom leaves the top. The default resting
// layout corresponds to mid-progress, so disabling motion (below) leaves the
// page perfectly legible.
//
// Options:
//   varName   custom property to set (default '--progress')
//   clamp     clamp to [0,1] (default true)
export function useScrollProgress({ varName = '--progress', clamp = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion: pin to the neutral midpoint and never animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty(varName, '0.5')
      return
    }

    let frame = 0
    let visible = false

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      let p = (vh - rect.top) / total
      if (clamp) p = Math.min(Math.max(p, 0), 1)
      el.style.setProperty(varName, p.toFixed(4))
    }

    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(measure)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) schedule()
      },
      { threshold: 0, rootMargin: '0px' },
    )
    io.observe(el)

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [varName, clamp])

  return ref
}

// Tracks whole-page scroll progress (0 at top, 1 at bottom) and writes it to
// --page-progress on <html>, so the persistent atmosphere can evolve across the
// entire journey. One listener for the whole document.
export function usePageProgress() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.style.setProperty('--page-progress', '0')
      return
    }

    let frame = 0
    const measure = () => {
      frame = 0
      const max = root.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      root.style.setProperty('--page-progress', p.toFixed(4))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}
