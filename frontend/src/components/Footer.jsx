const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/rajvib21' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rajvibhatt21' },
  { label: 'Email',    href: 'mailto:rajvibhatt21@gmail.com' },
  { label: 'Portfolio',href: 'https://netai.netaihub.tech/' },
]

export default function Footer() {
  return (
    <footer style={S.footer}>
      <div className="container">
        {/* Top */}
        <div style={S.top}>
          <div>
            <div style={S.bigName}>
              RAJVI <span style={{ color: 'var(--accent)' }}>B.</span>
            </div>
            <div style={S.tagline}>
              Engineering AI with logic, balancing life with art,<br />
              and collecting stories along the way.
            </div>
          </div>
          <div style={S.ctaBlock}>
            <a href="#contact" className="btn btn-primary" style={{ fontSize: '0.75rem' }}>
              Get In Touch
            </a>
          </div>
        </div>

        <hr style={S.hr} />

        {/* Bottom */}
        <div style={S.bottom}>
          <span style={S.copy}>© 2025 Rajvi B. · Made with care in Gandhinagar, India</span>
          <div style={S.socials}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank" rel="noreferrer"
                style={S.sLink}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent)'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.borderColor = 'var(--border2)'
                }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

const S = {
  footer: {
    background: 'var(--bg-primary)',
    borderTop: '1px solid var(--border2)',
    padding: '3.5rem 2rem 2rem',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '2rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
  },
  bigName: {
    fontSize: 'clamp(2.5rem,6vw,4.5rem)',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    color: 'var(--text-primary)',
    lineHeight: 1,
    marginBottom: '0.75rem',
  },
  tagline: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.68rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    letterSpacing: '0.02em',
  },
  ctaBlock: { flexShrink: 0 },
  hr: { border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copy: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
  },
  socials: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' },
  sLink: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '0.28rem 0.6rem',
    border: '1px solid var(--border2)',
    transition: 'all 0.2s ease',
  },
}
