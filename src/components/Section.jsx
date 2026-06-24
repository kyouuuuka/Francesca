import { useReveal } from '../hooks/useReveal.js'

// A page section that fades/slides in when scrolled into view.
export default function Section({ id, eyebrow, title, children, className = '' }) {
  const ref = useReveal()

  return (
    <section id={id} ref={ref} className={`section reveal ${className}`}>
      <div className="section__inner">
        {(eyebrow || title) && (
          <header className="section__head">
            {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
            {title && <h2 className="section__title">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
