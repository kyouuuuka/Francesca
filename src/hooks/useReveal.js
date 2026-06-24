import { useEffect, useRef } from 'react'

// Adds `is-visible` to an element the first time it scrolls into view, so CSS
// can fade/slide it in. Respects prefers-reduced-motion by revealing instantly.
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return ref
}
