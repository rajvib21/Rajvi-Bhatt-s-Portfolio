import { useState, useEffect } from 'react'
import resume from '../assest/Rajvi_Bhatt_Resume.pdf'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenu] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const ids = LINKS.map(l => l.href.slice(1))
      let cur = 'home'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 90) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── theme tokens (mirrors Home.jsx CSS variables) ──────────────────────────
  // Light  → bg #fff,  text #000,  accent #000
  // Dark   → bg #0a0a0a, text #fff, accent #fff
  const bg = dark ? '#0a0a0a' : '#ffffff'
  const border = dark ? '#333' : '#e0e0e0'
  const text = dark ? '#ffffff' : '#000000'
  const accent = dark ? '#ffffff' : '#000000'   // active / resume fill
  const accentText = dark ? '#000000' : '#ffffff'   // text on accent bg

  const close = () => setMenu(false)

  return (
    <>
      <nav style={{ ...S.nav, background: bg, borderBottom: `2px solid ${border}` }}>
        <div style={S.inner}>

          {/* Logo */}
          <a href="#home" style={{ ...S.logo, color: text }}>RAJVI B.</a>

          {/* Desktop links */}
          <div style={S.links} className="nav-desktop">
            {LINKS.map(l => {
              const isActive = active === l.href.slice(1)
              return (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    ...S.link,
                    background: isActive ? accent : 'transparent',
                    color: isActive ? accentText : text,
                    borderColor: isActive ? accent : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = accent
                      e.currentTarget.style.color = accentText
                      e.currentTarget.style.borderColor = accent
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = text
                      e.currentTarget.style.borderColor = 'transparent'
                    }
                  }}
                >
                  {l.label}
                </a>
              )
            })}

            {/* Resume */}
            <a
              href={resume}
              target="_blank" rel="noreferrer"
              style={{ ...S.resume, background: accent, color: accentText, borderColor: accent }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = text
                e.currentTarget.style.borderColor = accent
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = accent
                e.currentTarget.style.color = accentText
                e.currentTarget.style.borderColor = accent
              }}
            >
              Resume ↗
            </a>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(d => !d)}
              style={{ ...S.themeBtn, background: accent, color: accentText, borderColor: accent }}
              aria-label="Toggle black/white theme"
              title={dark ? 'Switch to White' : 'Switch to Black'}
            >
              {dark ? '◑' : '◐'}
            </button>
          </div>

          {/* Mobile row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setDark(d => !d)}
              style={{ ...S.themeBtn, background: accent, color: accentText, borderColor: accent }}
              className="theme-btn-mobile"
              aria-label="Toggle theme"
            >
              {dark ? '◑' : '◐'}
            </button>
            <button
              style={{ ...S.ham, flexDirection: 'column' }}
              onClick={() => setMenu(o => !o)}
              aria-label="Toggle navigation"
              className="ham-btn"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  ...S.hamLine,
                  background: text,
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
                      : i === 2 ? 'rotate(-45deg) translate(4px,-4px)'
                        : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        ...S.drawer,
        display: menuOpen ? 'flex' : 'none',
        background: bg,
        borderBottom: `2px solid ${border}`,
      }}>
        {LINKS.map(l => (
          <a
            key={l.href} href={l.href}
            style={{ ...S.drawerLink, color: text, borderBottomColor: border }}
            onClick={close}
          >
            {l.label}
          </a>
        ))}
        <a
          href={resume} target="_blank" rel="noreferrer"
          style={{ ...S.drawerLink, color: text, borderBottomColor: border }}
          onClick={close}
        >
          Resume ↗
        </a>
      </div>

      <style>{`
        .ham-btn          { display: none !important; }
        .theme-btn-mobile { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop      { display: none !important; }
          .ham-btn          { display: flex !important; }
          .theme-btn-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}

const S = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    transition: 'background 0.25s ease, border-color 0.25s ease',
    padding: '0 2rem',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 58,
  },
  logo: {
    fontFamily: "'Space Mono',monospace", fontWeight: 700,
    fontSize: '1.05rem', letterSpacing: '-0.02em', textDecoration: 'none',
    transition: 'color 0.25s ease',
  },
  links: { display: 'flex', alignItems: 'center', gap: '0.2rem' },
  link: {
    textDecoration: 'none', fontSize: '0.78rem', fontWeight: 500,
    padding: '0.32rem 0.65rem',
    border: '1.5px solid transparent',
    transition: 'all 0.15s ease',
    letterSpacing: '0.03em', textTransform: 'uppercase',
  },
  resume: {
    border: '1.5px solid',
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.72rem', fontWeight: 700,
    textDecoration: 'none',
    padding: '0.32rem 0.65rem',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    transition: 'all 0.15s ease', marginLeft: '0.35rem',
  },
  themeBtn: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.75rem', fontWeight: 700,
    padding: '0.28rem 0.55rem',
    border: '1.5px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginLeft: '0.35rem',
    lineHeight: 1,
  },
  ham: {
    display: 'none', gap: 5,
    cursor: 'pointer', padding: 8,
    background: 'none', border: 'none',
  },
  hamLine: { display: 'block', width: 22, height: 2, transition: 'all 0.25s ease' },
  drawer: {
    position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
    flexDirection: 'column', padding: '0.75rem',
    transition: 'background 0.25s ease',
  },
  drawerLink: {
    textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500,
    padding: '0.65rem 1rem',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    borderBottom: '1px solid',
    transition: 'all 0.15s ease',
  },
}