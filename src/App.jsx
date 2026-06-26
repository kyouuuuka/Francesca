import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Chapter from './components/Chapter.jsx'
import Portfolio from './components/Portfolio.jsx'
import Atmosphere from './components/Atmosphere.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import './App.css'

const NAME = 'Francesca Olarte'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Writing' },
  { href: '#publications', label: 'Publications' },
  { href: '#awards', label: 'Recognition' },
  { href: '#blog', label: 'Journal' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

// --- Content (tasteful placeholders, tailored to a creative-writing student) ---

const CATEGORIES = [
  {
    key: 'short-stories',
    label: 'Short Stories',
    pieces: [
      { title: 'Saltwater Hours', form: 'Short Fiction', year: '2025', excerpt: 'A daughter returns to the fishing town she swore she had outgrown, and finds the tide keeps better memory than she does.' },
      { title: 'The Inventory of Small Rooms', form: 'Flash Fiction', year: '2024', excerpt: 'Three hundred words on everything a boarding house remembers after its last tenant leaves the door unlocked.' },
      { title: 'Brownout', form: 'Short Fiction', year: '2024', excerpt: 'When the power goes, a family lights candles and, for one hot evening, finally says the things daylight never allowed.' },
    ],
  },
  {
    key: 'poetry',
    label: 'Poetry',
    pieces: [
      { title: 'Litany for the Rainy Season', form: 'Free Verse', year: '2025', excerpt: 'A naming of small floods — the gutter, the grief, the cup left out on the sill — and the patience it takes to wait them out.' },
      { title: 'Ars Poetica with Sampaguita', form: 'Lyric', year: '2024', excerpt: 'On writing in a borrowed language while the garden insists, all night, on its own stubborn vocabulary of scent.' },
      { title: 'Four Ways to Say Goodbye', form: 'Sequence', year: '2024', excerpt: 'A short sequence that tries, and politely fails, to leave a room without taking the whole house along with it.' },
    ],
  },
  {
    key: 'essays',
    label: 'Essays',
    pieces: [
      { title: 'On Keeping a Commonplace Book', form: 'Personal Essay', year: '2025', excerpt: 'What ten years of collected sentences taught me about attention, theft, and the slow making of a voice.' },
      { title: 'The Geography of a Jeepney', form: 'Lyric Essay', year: '2024', excerpt: 'A meditation on the commute as classroom — strangers, signage, and the choreography of paying it forward.' },
    ],
  },
  {
    key: 'screenplays',
    label: 'Screenplays',
    pieces: [
      { title: 'Last Trip', form: 'Short Screenplay', year: '2025', excerpt: 'INT. NIGHT BUS — 3 A.M. Two strangers, one shared armrest, and a city neither of them is ready to arrive in.' },
      { title: 'Understudy', form: 'Stage Play (One-Act)', year: '2024', excerpt: 'A backstage two-hander about the actress who never goes on, and the one who never asked to.' },
    ],
  },
]

const FEATURED_PUB = {
  title: 'Saltwater Hours',
  venue: 'Heights Literary Folio',
  detail: 'Fiction · Vol. 72',
  year: '2025',
  note: 'Selected for the anniversary issue and read at the folio’s launch — a story about tide, memory, and the houses we leave unlocked.',
}

const PUBLICATIONS = [
  { title: 'Litany for the Rainy Season', venue: 'Cha: An Asian Literary Journal', detail: 'Poetry', year: '2025' },
  { title: 'On Keeping a Commonplace Book', venue: 'The Manila Review', detail: 'Creative Nonfiction', year: '2024' },
  { title: 'Brownout', venue: 'Ani: The Working Anthology', detail: 'Fiction · Print', year: '2024' },
  { title: 'Four Ways to Say Goodbye', venue: 'Voice & Verse', detail: 'Poetry · Online', year: '2024' },
]

const AWARDS = [
  { title: 'Don Carlos Palanca Memorial Award', detail: 'Third Prize, Short Story for the Youth', year: '2025' },
  { title: 'Campus Writers’ Prize', detail: 'First Place, Poetry', year: '2024' },
  { title: 'Amelia Lapeña-Bonifacio Fellowship', detail: 'Fellow, National Writers Workshop', year: '2024' },
  { title: 'Dean’s Lister', detail: 'College of Arts & Letters · five consecutive terms', year: '2022–25' },
]

const POSTS = [
  { title: 'Drafting in the Margins', blurb: 'Notes on writing between class, work, and a commute — and why the small windows are where most of my work actually happens.', date: 'May 2025', read: '4 min' },
  { title: 'What a Rejection Slip Taught Me', blurb: 'I kept every “no” for a year. Here is what the stack looked like, and what it quietly fixed in my drafts.', date: 'Mar 2025', read: '6 min' },
  { title: 'Reading List: Filipino Women Essayists', blurb: 'The voices I keep returning to, and a few lines from each that still rearrange how I think about the sentence.', date: 'Feb 2025', read: '5 min' },
]

const RESUME = {
  education: [
    { line: 'BA Creative Writing', meta: 'University of the Philippines · expected 2026' },
    { line: 'Incoming fourth year', meta: 'College of Arts & Letters' },
  ],
  roles: [
    { line: 'Editor-in-Chief', meta: 'Campus literary folio · 2024–present' },
    { line: 'Workshop Fellow', meta: 'National Writers Workshop · 2024' },
    { line: 'Reader', meta: 'Undergraduate literary journal · 2023–24' },
  ],
  recognition: [
    { line: 'Palanca Award', meta: 'Short Story for the Youth · 2025' },
    { line: 'Campus Writers’ Prize', meta: 'Poetry, First Place · 2024' },
  ],
}

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Atmosphere />

      {/* Hero — the overture. Nav floats over it and scrolls away. */}
      <div id="top" className="hero-wrap">
        <Nav name={NAME} links={NAV_LINKS} />
        <Hero
          label="Creative Writer"
          name={NAME}
          tagline="Fiction, poetry, and essays from an incoming fourth-year Creative Writing student — stories that listen closely and leave the light on."
          idleSrc="/idle.mp4"
          scrubSrc="/hero.mp4"
        />
      </div>

      <main className="story">
        {/* Floral garland draped over the hero → Chapter One seam. Purely
            decorative and click-through; covers the transition line. Anchored to
            the top of .story; fine-tune with the CSS vars on .seam. */}
        <div className="seam" aria-hidden="true">
          <img className="seam__garland" src="/Garlands.png" alt="" />
        </div>

        {/* 01 — About: glass editorial card, offset left */}
        <Chapter id="about" index="01" kicker="Chapter One" title="The writer at her desk" align="left">
          <div className="about">
            <article className="about__card glass">
              <p className="about__lead">
                <span className="about__drop">I</span>’m Francesca — an incoming fourth-year
                Creative Writing student who works across fiction, poetry, and the essay. I’m drawn
                to quiet domestic dramas, the texture of ordinary places, and the small rituals
                people build to keep themselves company.
              </p>
              <p className="about__body">
                When I’m not drafting, I edit our campus literary folio, hoard sentences in a
                well-worn commonplace book, and read far past any reasonable bedtime. I’m looking for
                workshops, fellowships, and editorial work where careful language still matters.
              </p>
            </article>
            <aside className="about__aside">
              <p className="about__aside-label">Preoccupations</p>
              <ul className="about__list">
                {['Domestic fiction', 'Lyric essay', 'Filipino diaspora', 'The sea, repeatedly', 'Marginalia', 'Stage & screen'].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Chapter>

        {/* 02 — Selected Writing: masonry manuscript gallery */}
        <Chapter id="portfolio" index="02" kicker="Chapter Two" title="Selected writing" align="left" wide>
          <Portfolio categories={CATEGORIES} />
        </Chapter>

        {/* 03 — Publications: magazine spread */}
        <Chapter id="publications" index="03" kicker="Chapter Three" title="In print &amp; online" align="right">
          <div className="spread">
            <div className="spread__feature">
              <p className="spread__feature-form">{FEATURED_PUB.detail}</p>
              <h3 className="spread__feature-title">{FEATURED_PUB.title}</h3>
              <p className="spread__feature-venue">{FEATURED_PUB.venue}, {FEATURED_PUB.year}</p>
              <p className="spread__feature-note">{FEATURED_PUB.note}</p>
            </div>
            <ol className="spread__contents">
              {PUBLICATIONS.map((pub) => (
                <li key={pub.title} className="spread__entry">
                  <span className="spread__entry-title">{pub.title}</span>
                  <span className="spread__entry-dots" aria-hidden="true" />
                  <span className="spread__entry-venue">{pub.venue}</span>
                  <span className="spread__entry-year">{pub.year}</span>
                </li>
              ))}
            </ol>
          </div>
        </Chapter>

        {/* 04 — Recognition: timeline narrative */}
        <Chapter id="awards" index="04" kicker="Chapter Four" title="Honors &amp; recognition" align="left">
          <ol className="timeline">
            {AWARDS.map((award) => (
              <li key={award.title} className="timeline__item">
                <span className="timeline__year">{award.year}</span>
                <span className="timeline__node" aria-hidden="true" />
                <div className="timeline__body">
                  <h3 className="timeline__title">{award.title}</h3>
                  <p className="timeline__detail">{award.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Chapter>

        {/* 05 — Journal: dated entries */}
        <Chapter id="blog" index="05" kicker="Chapter Five" title="From the notebook" align="right">
          <div className="journal">
            {POSTS.map((post) => (
              <article key={post.title} className="entry">
                <div className="entry__meta">
                  <time>{post.date}</time>
                  <span>{post.read}</span>
                </div>
                <div className="entry__main">
                  <h3 className="entry__title">{post.title}</h3>
                  <p className="entry__blurb">{post.blurb}</p>
                  <a className="entry__link" href="#blog">Read entry →</a>
                </div>
              </article>
            ))}
          </div>
        </Chapter>

        {/* 06 — Resume: elegant document */}
        <Chapter id="resume" index="06" kicker="Chapter Six" title="The short version" align="left">
          <div className="resume-doc glass">
            <header className="resume-doc__head">
              <p className="resume-doc__name">{NAME}</p>
              <p className="resume-doc__role">Creative Writer · Fiction, Poetry &amp; Essay</p>
            </header>
            <div className="resume-doc__cols">
              <section>
                <h3 className="resume-doc__h">Education</h3>
                {RESUME.education.map((r) => (
                  <p key={r.line} className="resume-doc__row"><strong>{r.line}</strong><span>{r.meta}</span></p>
                ))}
              </section>
              <section>
                <h3 className="resume-doc__h">Roles</h3>
                {RESUME.roles.map((r) => (
                  <p key={r.line} className="resume-doc__row"><strong>{r.line}</strong><span>{r.meta}</span></p>
                ))}
              </section>
              <section>
                <h3 className="resume-doc__h">Recognition</h3>
                {RESUME.recognition.map((r) => (
                  <p key={r.line} className="resume-doc__row"><strong>{r.line}</strong><span>{r.meta}</span></p>
                ))}
              </section>
            </div>
            <a className="resume-doc__btn" href="/resume.pdf" download>Download full résumé (PDF)</a>
          </div>
        </Chapter>

        {/* 07 — Contact: editorial close */}
        <Chapter id="contact" index="07" kicker="Chapter Seven" title="Let’s talk words" align="right">
          <div className="closing">
            <p className="closing__lead">
              Have a commission, a publication, or a workshop in mind — or just a book you think I
              should read? Write to me.
            </p>
            <a className="closing__email" href="mailto:hello@francescaolarte.com">
              hello@francescaolarte.com
            </a>
            <ul className="closing__links">
              <li><a href="#top">Back to top</a></li>
              <li><a href="/resume.pdf" download>Résumé</a></li>
              <li><a href="#portfolio">Read the writing</a></li>
            </ul>
          </div>
        </Chapter>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {NAME}. Words &amp; stories.</p>
      </footer>
    </>
  )
}
