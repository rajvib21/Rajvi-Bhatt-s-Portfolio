import { useEffect, useRef } from 'react'
import HeroImg from '../assets/p.jpeg'   // ← put hero_photo.png in src/assets/

const MARQUEE = [
  'React', 'Python', 'FastAPI', 'LangChain', 'LangGraph', 'RAG',
  'MCP Agents', 'A2A', 'Multi-Agent', 'PostgreSQL', 'Docker', 'GCP',
  'Machine Learning', 'Bharatnatyam',
]

const STICKERS = ['CREATE', 'BUILD', 'AI', 'LEARN', 'DANCE']

export default function Home() {
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" style={S.section}>
        <div className="container">
          <div style={S.grid} ref={nameRef} className="hero-grid">

            {/* LEFT */}
            <div style={S.left}>
              <div style={S.badge}>
                <span style={S.dot} />
                Available from August 2026
              </div>

              <h1 style={S.name}>
                RAJVI<br />
                <span style={{ color: 'var(--accent)' }}>B.</span>
              </h1>

              <div style={S.roles} className="hero-roles">
                {['Computer Engineer', 'AI Explorer', 'Creative Builder', 'Classical Artist']
                  .map(r => <span key={r} style={S.roleChip}>{r}</span>)}
              </div>

              <p style={S.tagline}>
                Building AI products, solving real-world problems,<br />
                and collecting stories along the way.
              </p>

              <div style={S.cta} className="hero-cta">
                <a href="#about" className="btn btn-primary">About Me</a>
                <a href="#projects" className="btn btn-outline">View Projects</a>
              </div>

              <div style={S.badges} className="hero-badges">
                {['AI', 'ML', 'React', 'Python', 'FastAPI', 'RAG', 'LangChain', 'MCP', 'Bharatnatyam']
                  .map(b => <span key={b} className="badge">{b}</span>)}
              </div>
            </div>

            {/* RIGHT */}
            <div style={S.right} className="hero-right">
              <div style={{ position: 'relative' }}>
                {/* accent corners */}
                <div style={S.cornerTL} />
                <div style={S.cornerBR} />

                {/* photo frame */}
                <div style={S.frame} className="hero-float">
                  <img
                    src={HeroImg}
                    alt="Rajvi B."
                    style={S.photo}
                  />
                </div>

                {/* stickers */}
                {STICKERS.map((st, i) => (
                  <div key={st} style={{ ...S.stickerBase, ...STICKER_POS[i] }}
                    className={`hero-sticker s${i}`}>{st}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={S.marqueeWrap}>
        <div style={S.marqueeTrack} className="mq-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={S.marqueeItem}>
              {item}&nbsp;<span style={{ opacity: 0.35 }}>✦</span>&nbsp;
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float    { 0%,100%{transform:rotate(2deg) translateY(0)} 50%{transform:rotate(2deg) translateY(-11px)} }
        @keyframes marquee  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes stFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .hero-float  { animation: float 6s ease-in-out infinite; }
        .mq-track    { animation: marquee 24s linear infinite; }
        .hero-sticker{ animation: stFloat 4s ease-in-out infinite; }
        .s0{animation-delay:0s} .s1{animation-delay:.5s} .s2{animation-delay:.9s}
        .s3{animation-delay:1.3s} .s4{animation-delay:.7s}

        @media(max-width:768px){
          .hero-sticker { display: none; }
          .hero-grid    { grid-template-columns: 1fr !important; text-align: center; }
          .hero-right   { display: none !important; }
          .hero-cta     { justify-content: center !important; }
          .hero-roles   { justify-content: center !important; }
          .hero-badges  { justify-content: center !important; }
        }
      `}</style>
    </>
  )
}

const STICKER_POS = [
  { top: '8%', right: '-16%' },
  { top: '30%', right: '-20%' },
  { bottom: '34%', right: '-11%' },
  { bottom: '10%', right: '-17%' },
  { top: '60%', left: '-11%' },
]

const S = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: '2rem',
    background: 'var(--bg-primary)',
    overflow: 'hidden',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    width: '100%',
  },
  left: {},
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: 'var(--bg-tertiary)',
    border: '1.5px solid var(--accent)',
    padding: '0.28rem 0.8rem',
    fontSize: '0.72rem',
    fontFamily: "'Space Mono',monospace",
    color: 'var(--accent)',
    letterSpacing: '0.04em',
    marginBottom: '1.4rem',
  },
  dot: {
    width: 7, height: 7,
    background: '#4ade80', borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  name: {
    fontSize: 'clamp(3rem,8vw,5.5rem)',
    fontWeight: 700,
    lineHeight: 0.93,
    letterSpacing: '-0.04em',
    color: 'var(--text-primary)',
    marginBottom: '0.8rem',
  },
  roles: {
    display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
    marginBottom: '1.4rem',
  },
  roleChip: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.72rem',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border2)',
    padding: '0.18rem 0.55rem',
  },
  tagline: {
    fontSize: 'clamp(0.95rem,2.2vw,1.1rem)',
    color: 'var(--text-secondary)',
    lineHeight: 1.75,
    marginBottom: '1.75rem',
    maxWidth: 460,
  },
  cta: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' },
  badges: { display: 'flex', flexWrap: 'wrap', gap: '0.35rem' },
  right: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  frame: {
    width: 320, height: 400,
    border: '3px solid var(--accent)',
    boxShadow: '8px 8px 0 var(--accent)',
    background: 'var(--bg-tertiary)',
    overflow: 'hidden',
    position: 'relative',
  },
  // ── real photo fills the frame ──────────────────────────────────────────────
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',   // keeps face visible
    display: 'block',
  },
  cornerTL: {
    position: 'absolute', top: -12, left: -12,
    width: 55, height: 55,
    border: '2px solid var(--accent)',
    opacity: 0.25, zIndex: -1,
  },
  cornerBR: {
    position: 'absolute', bottom: -12, right: -12,
    width: 38, height: 38,
    background: 'var(--accent)',
    opacity: 0.15, zIndex: -1,
  },
  stickerBase: {
    position: 'absolute',
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.6rem', fontWeight: 700,
    background: 'var(--accent)', color: 'var(--bg-primary)',
    padding: '0.18rem 0.45rem',
    letterSpacing: '0.1em',
  },
  marqueeWrap: {
    background: 'var(--accent)',
    borderTop: '2px solid var(--text-primary)',
    borderBottom: '2px solid var(--text-primary)',
    overflow: 'hidden',
    padding: '0.65rem 0',
  },
  marqueeTrack: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  marqueeItem: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.72rem', fontWeight: 700,
    color: 'var(--bg-primary)',
    padding: '0 1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
}