import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import './App.css'

const NAME = 'Francesca Olarte'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

const PROJECTS = [
  { title: 'Project One', tag: 'Web App', blurb: 'Short description of the project, the problem it solved, and your role.' },
  { title: 'Project Two', tag: 'Branding', blurb: 'Short description of the project, the problem it solved, and your role.' },
  { title: 'Project Three', tag: 'Mobile', blurb: 'Short description of the project, the problem it solved, and your role.' },
  { title: 'Project Four', tag: 'Design System', blurb: 'Short description of the project, the problem it solved, and your role.' },
]

const SKILLS = ['React', 'TypeScript', 'Node.js', 'UI / UX', 'Figma', 'Motion', 'Vite', 'CSS']

export default function App() {
  return (
    <>
      {/* Hero with the scroll-scrubbed video; nav floats over it and scrolls away. */}
      <div id="top" className="hero-wrap">
        <Nav name={NAME} links={NAV_LINKS} />
        <Hero
          label="Full Stack Developer"
          name={NAME}
          tagline="Crafting beautiful digital experiences through thoughtful design and modern engineering."
          idleSrc="/idle.mp4"
          scrubSrc="/hero.mp4"
        />
      </div>

      <main className="page">
        <Section id="about" eyebrow="About" title="A bit about me">
          <div className="about glass">
            <p>
              This is placeholder copy. Introduce yourself here — what you do, what you care
              about, and the kind of work you want more of. Keep it to a few warm, concrete
              sentences so visitors get a feel for you fast.
            </p>
            <ul className="skills">
              {SKILLS.map((skill) => (
                <li key={skill} className="skills__chip glass">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="work" eyebrow="Work" title="Selected projects">
          <div className="work-grid">
            {PROJECTS.map((project) => (
              <article key={project.title} className="card glass">
                <div className="card__thumb" aria-hidden="true" />
                <div className="card__body">
                  <span className="card__tag">{project.tag}</span>
                  <h3 className="card__title">{project.title}</h3>
                  <p className="card__blurb">{project.blurb}</p>
                  <a className="card__link" href="#work">
                    View project →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's work together">
          <div className="contact glass">
            <p className="contact__lead">
              Have a project in mind, or just want to say hello? I'd love to hear from you.
            </p>
            <a className="contact__btn" href="mailto:hello@example.com">
              Get in touch
            </a>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {NAME}. All rights reserved.</p>
      </footer>
    </>
  )
}
