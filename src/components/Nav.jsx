// Non-sticky editorial nav: a small custom flower mark + wordmark on the left,
// indexed links with an animated underline on the right. Sits over the hero
// and scrolls away (no fixed/sticky bar following the user — per request).
export default function Nav({ name, links }) {
  return (
    <nav className="nav">
      <a className="nav__brand" href="#top" aria-label={`${name} — home`}>
        <svg className="nav__mark" viewBox="0 0 24 24" aria-hidden="true">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="12"
              cy="6.5"
              rx="2.6"
              ry="5"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
          <circle cx="12" cy="12" r="2.3" className="nav__mark-center" />
        </svg>
        <span className="nav__wordmark">{name}</span>
      </a>

      <ul className="nav__links">
        {links.map((link, i) => (
          <li key={link.href}>
            <a href={link.href}>
              <span className="nav__index">0{i + 1}</span>
              <span className="nav__label">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
