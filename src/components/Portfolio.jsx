import { useMemo, useState } from 'react'

// Selected Writing as a masonry "manuscript gallery". Pieces flow in a CSS
// column masonry so excerpts of different lengths nest like clippings on a
// desk. An editorial filter rail (set as running text, not pill buttons) narrows
// by form. Each piece reads like a typed manuscript page.
//
// `categories` is the same shape used across the site: { key, label, pieces[] }.
export default function Portfolio({ categories }) {
  const [active, setActive] = useState('all')

  const filters = useMemo(
    () => [{ key: 'all', label: 'All' }, ...categories.map((c) => ({ key: c.key, label: c.label }))],
    [categories],
  )

  // Flatten with the category label attached, then filter.
  const pieces = useMemo(() => {
    const all = categories.flatMap((c) =>
      c.pieces.map((p) => ({ ...p, category: c.key, categoryLabel: c.label })),
    )
    return active === 'all' ? all : all.filter((p) => p.category === active)
  }, [categories, active])

  return (
    <div className="folio">
      <nav className="folio__filter" aria-label="Filter writing by form">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`folio__filter-link${f.key === active ? ' is-active' : ''}`}
            aria-pressed={f.key === active}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </nav>

      <div key={active} className="folio__masonry">
        {pieces.map((piece) => (
          <article key={piece.title} className="manuscript">
            <header className="manuscript__head">
              <span className="manuscript__form">{piece.form}</span>
              <span className="manuscript__year">{piece.year}</span>
            </header>
            <h3 className="manuscript__title">{piece.title}</h3>
            <p className="manuscript__excerpt">{piece.excerpt}</p>
            <a className="manuscript__link" href="#portfolio">
              <span>Read the piece</span>
              <span className="manuscript__rule" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
