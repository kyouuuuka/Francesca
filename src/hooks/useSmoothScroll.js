import { useEffect } from 'react'
import Lenis from 'lenis'

// Cinematic smooth scroll (Locomotive-style) via Lenis. We drive it from a
// single rAF loop and expose the instance on window so other effects (the hero
// scrub, parallax) keep reading real scroll position — Lenis moves the actual
// document scroll, so getBoundingClientRect math stays valid.
//
// Fully disabled under prefers-reduced-motion: the native scroll is returned
// untouched, so nothing about reading the page depends on the smoothing.
export function useSmoothScroll() {
  useEffect(() => {
    // Deep-link support: this is a client-rendered SPA, so the browser can't
    // honour an initial #hash on load (the target doesn't exist in the served
    // HTML yet). Jump to it once the tree has committed.
    const jumpToHash = (lenis) => {
      const hash = window.location.hash
      if (!hash || hash.length < 2) return
      // Retry across a few frames: the target may not be laid out yet, and
      // Lenis can reclaim scroll on its first ticks, so re-assert until it sticks.
      let tries = 0
      const tick = () => {
        const target = document.querySelector(hash)
        if (target) {
          if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
          else target.scrollIntoView()
        }
        if (++tries < 20) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      jumpToHash(null)
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out-quart, no bounce
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    window.__lenis = lenis

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    jumpToHash(lenis)

    // In-page anchor links: let Lenis own the animated scroll so jumps share the
    // same easing as wheel scroll instead of fighting it.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: 0, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
