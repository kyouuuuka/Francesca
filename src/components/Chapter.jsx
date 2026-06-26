import { useReveal } from '../hooks/useReveal.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import './Chapter.css'

// A narrative chapter. This is the site's structural device — instead of a tiny
// uppercase eyebrow above every heading, each chapter opens like a magazine
// chapter: an oversized background folio numeral that parallaxes as you pass,
// the chapter title set against it, then the section's own layout.
//
// - useReveal gates an entrance flourish on an already-visible default (content
//   is fully readable even if the reveal never fires).
// - useScrollProgress feeds --progress for the folio's parallax drift.
//
// `align` ('left' | 'right') sets the asymmetric side the folio anchors to, so
// consecutive chapters alternate weight across the page rather than centring.
export default function Chapter({
  id,
  index,
  kicker,
  title,
  align = 'left',
  wide = false,
  children,
}) {
  const reveal = useReveal()
  const progress = useScrollProgress()

  return (
    <section
      id={id}
      ref={progress}
      className={`chapter chapter--${align}${wide ? ' chapter--wide' : ''}`}
    >
      {/* Oversized chapter folio — decorative, drifts with scroll */}
      <span className="chapter__folio" aria-hidden="true">
        {index}
      </span>

      <div ref={reveal} className="chapter__inner reveal-chapter">
        <header className="chapter__head">
          <span className="chapter__kicker">{kicker}</span>
          <h2 className="chapter__title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
