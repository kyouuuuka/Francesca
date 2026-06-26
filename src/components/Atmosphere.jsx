import { useMemo } from 'react'
import { usePageProgress } from '../hooks/useScrollProgress.js'
import './Atmosphere.css'

// The persistent floral world. A single fixed layer that lives behind the whole
// page (below the hero, above the page background) and EVOLVES with scroll:
// --page-progress shifts the gradient field from soft morning rose toward a
// deeper violet dusk, and a field of petals drifts continuously. This is what
// keeps the floral motif from being a hero-only gimmick — it breathes through
// every chapter.
//
// Decorative only: aria-hidden, and under reduced motion --page-progress is
// pinned to 0 so the field is static.
const FIELD_PETALS = 22

export default function Atmosphere() {
  usePageProgress()

  const petals = useMemo(
    () =>
      Array.from({ length: FIELD_PETALS }, (_, i) => ({
        x: (i * 41 + 11) % 100,
        size: 7 + (i % 6) * 6,
        dur: 22 + (i % 7) * 5,
        delay: -((i * 3.3) % 30),
        drift: (i % 2 ? 1 : -1) * (30 + (i % 5) * 26),
        opacity: 0.12 + (i % 4) * 0.06,
        tone: ['#ffd9e2', '#fde8c8', '#f3dcff', '#ffe9f0'][i % 4],
      })),
    [],
  )

  return (
    <div className="atmos" aria-hidden="true">
      <div className="atmos__wash" />
      <div className="atmos__petals">
        {petals.map((p, i) => (
          <span
            key={i}
            className="atmos__petal"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--c': p.tone,
              '--o': p.opacity,
              '--drift': `${p.drift}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
