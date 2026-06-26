import { useEffect, useMemo, useRef, useState } from 'react'
import './Hero.css'

// Hard switch (no fade): show the scrub video the instant you leave the very
// top, show the idle loop when you're back at the top. The tiny epsilon just
// defines "the very top" and avoids jitter right at the boundary.
const TOP_EPSILON = 0.003

const PETAL_COUNT = 14

export default function Hero({ label, name, tagline, idleSrc, scrubSrc }) {
  const sectionRef = useRef(null)
  const idleRef = useRef(null)
  const scrubRef = useRef(null)

  // null until measured (avoids a wrong first paint). true = desktop scrubbing,
  // false = idle-loop only (mobile / reduced-motion).
  const [scrub, setScrub] = useState(null)

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        x: (i * 37 + 8) % 100,
        size: 8 + (i % 5) * 5,
        dur: 16 + (i % 6) * 4,
        delay: -((i * 2.6) % 22),
        drift: (i % 2 ? 1 : -1) * (24 + (i % 4) * 22),
        opacity: 0.3 + (i % 4) * 0.14,
        tone: ['#ffd9e2', '#fde8c8', '#ffffff', '#f3dcff'][i % 4],
      })),
    [],
  )

  // Decide whether to scroll-scrub or show idle loop only. We now scrub on
  // mobile too (the scrub clip is encoded all-intra, so phone seeking is fast).
  // Only prefers-reduced-motion falls back to the plain idle loop.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const decide = () => setScrub(!reduceMotion.matches)

    decide()
    reduceMotion.addEventListener('change', decide)
    return () => reduceMotion.removeEventListener('change', decide)
  }, [])

  // The idle video always autoplay-loops. Setting the autoPlay attribute after
  // mount isn't reliable, so kick playback explicitly here.
  useEffect(() => {
    const video = idleRef.current
    if (!video) return
    video.muted = true
    const p = video.play()
    if (p) p.catch(() => {})
  }, [])

  // Paint the scrub video's first frame so the cross-fade target isn't blank.
  useEffect(() => {
    const video = scrubRef.current
    if (!video) return
    const showFirstFrame = () => {
      try {
        video.currentTime = 0
      } catch {
        /* not seekable yet */
      }
    }
    if (video.readyState >= 1) showFirstFrame()
    else video.addEventListener('loadedmetadata', showFirstFrame, { once: true })
    return () => video.removeEventListener('loadedmetadata', showFirstFrame)
  }, [])

  // iOS unlock: mobile Safari won't repaint a seeked frame on a video that has
  // never played. A play()->pause() inside the first touch gesture primes it so
  // scroll-scrubbing actually updates the picture on phones.
  useEffect(() => {
    if (scrub !== true) return
    const video = scrubRef.current
    if (!video) return

    let primed = false
    const prime = () => {
      if (primed) return
      primed = true
      video.muted = true
      const p = video.play()
      if (p) p.then(() => video.pause()).catch(() => {})
    }
    window.addEventListener('touchstart', prime, { once: true, passive: true })
    return () => window.removeEventListener('touchstart', prime)
  }, [scrub])

  // Scroll-scrub: map scroll progress through the hero to the scrub video's
  // currentTime, hard-switch idle <-> scrub, and publish progress as --p so the
  // content can slide out sideways.
  useEffect(() => {
    if (scrub !== true) return

    const section = sectionRef.current
    const video = scrubRef.current
    if (!section || !video) return

    video.pause()

    let frame = 0
    let duration = video.duration || 0
    let targetTime = 0
    let shownTime = video.currentTime || 0

    const onMeta = () => {
      duration = video.duration || 0
    }
    if (!duration) video.addEventListener('loadedmetadata', onMeta)

    const readTarget = () => {
      if (!duration) return
      const rect = section.getBoundingClientRect()
      const scrubDistance = section.offsetHeight - window.innerHeight
      if (scrubDistance <= 0) return
      const progress = Math.min(Math.max(-rect.top / scrubDistance, 0), 1)
      section.style.setProperty('--p', progress.toFixed(4))
      targetTime = progress * duration

      // Hard switch: scrub fully on once scrolled, fully off at the very top.
      video.style.opacity = progress > TOP_EPSILON ? '1' : '0'
    }

    // Continuous rAF loop: ease shown time toward target so bursty scroll events
    // become smooth motion; idles itself once caught up.
    //
    // The smoothness fix: Chrome has no fastSeek() and runs currentTime seeks
    // asynchronously. Assigning currentTime every frame queues seeks faster than
    // the decoder can satisfy them, so the picture lurches and lags. Instead we
    // gate on the 'seeked' event — issue the next seek only once the previous one
    // has landed, always to the LATEST eased position. Seeks then self-pace to
    // the decoder's real throughput and the footage flows instead of stuttering.
    const SMOOTHING = 0.2
    const hasFastSeek = typeof video.fastSeek === 'function'
    let seeking = false

    const seekTo = (t) => {
      if (hasFastSeek) {
        video.fastSeek(t)
      } else {
        seeking = true
        video.currentTime = t
      }
    }
    const onSeeked = () => {
      seeking = false
    }
    video.addEventListener('seeked', onSeeked)

    const tick = () => {
      const diff = targetTime - shownTime
      if (Math.abs(diff) < 0.004) {
        shownTime = targetTime
        if (!seeking) seekTo(shownTime) // settle exactly on the final frame
        frame = 0
        return
      }
      shownTime += diff * SMOOTHING
      // Skip the assignment while a seek is still in flight; the next frame will
      // seek to the newer position, dropping the intermediate ones we couldn't
      // have painted anyway.
      if (!seeking) seekTo(shownTime)
      frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    readTarget()
    shownTime = targetTime
    video.currentTime = targetTime
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('seeked', onSeeked)
      video.style.opacity = ''
    }
  }, [scrub])

  // Cursor parallax (desktop, non-reduced-motion only).
  useEffect(() => {
    if (scrub !== true) return
    const section = sectionRef.current
    if (!section || !window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let mx = 0
    let my = 0
    const apply = () => {
      frame = 0
      section.style.setProperty('--mx', mx.toFixed(3))
      section.style.setProperty('--my', my.toFixed(3))
    }
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
      if (!frame) frame = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [scrub])

  return (
    <section ref={sectionRef} className={`hero${scrub === true ? '' : ' hero--static'}`}>
      <div className="hero__sticky">
        {/* Layer 1a — idle loop (visible at the top of the page) */}
        <video
          ref={idleRef}
          className="hero__video hero__video--idle"
          src={idleSrc}
          poster="/idle-poster.jpg"
          muted
          playsInline
          preload="auto"
          autoPlay
          loop
          aria-hidden="true"
        />
        {/* Layer 1b — scrub video (driven by scroll; does NOT autoplay) */}
        <video
          ref={scrubRef}
          className="hero__video hero__video--scrub"
          src={scrubSrc}
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Layer 2 — editorial gradient scrim for readability + warmth */}
        <div className="hero__scrim" aria-hidden="true" />

        {/* Layer 4 — cursor-reactive light bloom */}
        <div className="hero__glow" aria-hidden="true" />

        {/* Layer 3/5 — drifting petals */}
        <div className="hero__petals" aria-hidden="true">
          {petals.map((p, i) => (
            <span
              key={i}
              className="petal"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--petal-c': p.tone,
                '--petal-o': p.opacity,
                '--drift': `${p.drift}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Layer 6 — content, asymmetric to the left */}
        <div className="hero__content">
          <div className="hero__inner">
            <p className="hero__label">{label}</p>
            <h1 className="hero__name">
              {name.split(' ').map((word, i) => (
                <span key={i} className="hero__name-line" style={{ '--i': i }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="hero__tagline">{tagline}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">
                <span>View Work</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="btn__arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="btn btn--ghost" href="#contact">
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
        </div>

        {/* Editorial side label + scroll cue */}
        <span className="hero__side" aria-hidden="true">
          Portfolio — {new Date().getFullYear()}
        </span>
        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  )
}
