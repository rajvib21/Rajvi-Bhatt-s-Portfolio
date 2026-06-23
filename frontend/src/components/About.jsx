import { useEffect, useRef } from 'react'

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delay)
      }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} style={style}>{children}</div>
}

export default function About({ onOpenBeyondTech }) {
  return (
    <section id="about" style={{ background: 'var(--bg-primary)', padding: '5rem 2rem' }}>
      <div className="container">
        <span className="section-tag">// 01 — About</span>
        <h2 className="section-title">About Me</h2>

        <div style={S.grid}>
          {/* LEFT */}
          <FadeIn delay={0}>
            <p style={S.para}>
              I'm a <strong style={S.strong}>Computer Engineering graduate</strong> and AI
              enthusiast currently gaining industry experience at{' '}
              <strong style={S.strong}>NetAI, Gandhinagar</strong>. What excites me most about
              technology is its ability to solve everyday problems — whether that's reducing food
              waste, building smarter AI assistants, or creating experiences people genuinely enjoy.
            </p>
            <p style={S.para}>
              Beyond engineering, I hold a{' '}
              <strong style={S.strong}>Bachelor's degree in Bharatnatyam</strong> — making me a
              double-degree holder across Computer Engineering and Classical Arts. I've been
              dancing for over <strong style={S.strong}>15 years</strong>, completed my Arangetram
              at age 13, and was ranked at{' '}
              <strong style={S.strong}>state level in 2018</strong>. I also have four years of
              classical vocal training. I believe this discipline and creativity directly shapes
              how I approach engineering.
            </p>
            <p style={S.para}>
              I love connecting with curious, passionate people and building things that matter.
            </p>

            <div style={S.statsRow}>
              {[
                { n: '8.5', l: 'CGPA' },
                { n: '6+', l: 'Months @ NetAI' },
                { n: '7+', l: 'Projects Built' },
                { n: '3', l: 'Bachelor Degrees' },
              ].map((st, i) => (
                <div key={i} style={S.stat}>
                  <span style={S.statNum}>{st.n}</span>
                  <span style={S.statLabel}>{st.l}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={onOpenBeyondTech}
                style={S.beyondBtn}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent)'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'translate(-2px,-2px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                🎭 Beyond Tech  →
              </button>
            </div>
          </FadeIn>

          {/* RIGHT: quick facts panel */}
          <FadeIn delay={120}>
            <div style={S.factsPanel}>
              <div style={S.factsPanelHead}>
                <span style={S.factsPanelTag}>Quick Facts</span>
              </div>
              {[
                { label: 'Degree', value: 'B.E. Computer Engineering', sub: 'GEC Gandhinagar · CGPA 8.5' },
                { label: 'Arts', value: 'B.A. Bharatnatyam', sub: 'Double degree — Engineering + Classical Dance' },
                { label: 'Interning', value: 'NetAI · AI/Backend', sub: 'Jan 2026 – Present · Ahmedabad' },
              ].map(f => (
                <div key={f.label} style={S.factRow}>
                  <div style={S.factLabel}>{f.label}</div>
                  <div style={S.factRight}>
                    <span style={S.factValue}>{f.value}</span>
                    <span style={S.factSub}>{f.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

const S = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  para: { fontSize: '0.97rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.2rem' },
  strong: { color: 'var(--text-primary)', fontWeight: 600 },
  statsRow: {
    display: 'flex', gap: '1.75rem', flexWrap: 'wrap',
    marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
  },
  stat: { display: 'flex', flexDirection: 'column', gap: '0.15rem' },
  statNum: { fontFamily: "'Space Mono',monospace", fontSize: '1.55rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 },
  statLabel: { fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' },
  beyondBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.65rem 1.25rem',
    border: '2px solid var(--accent)',
    color: 'var(--accent)', background: 'transparent',
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.75rem', fontWeight: 700,
    letterSpacing: '0.04em', textDecoration: 'none',
    textTransform: 'uppercase', transition: 'all 0.2s ease', 
    cursor: 'pointer',
    outline: 'none',
  },
  factsPanel: {
    background: 'var(--bg-secondary)', border: '1.5px solid var(--border2)',
    borderLeft: '3px solid var(--accent)', overflow: 'hidden',
  },
  factsPanelHead: { padding: '0.85rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-tertiary)' },
  factsPanelTag: { fontFamily: "'Space Mono',monospace", fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 },
  factRow: { display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.85rem 1.1rem', borderBottom: '1px solid var(--border)' },
  factLabel: { fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', minWidth: '62px', paddingTop: '0.12rem' },
  factRight: { display: 'flex', flexDirection: 'column', gap: '0.12rem' },
  factValue: { fontFamily: "'Space Mono',monospace", fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' },
  factSub: { fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.5 },
}
