const SOCIALS = [
  { icon: 'GH', label: 'GitHub',   href: 'https://github.com/rajvib21' },
  { icon: 'in', label: 'LinkedIn', href: 'https://linkedin.com/in/rajvibhatt21' },
  { icon: '@',  label: 'Email',    href: 'mailto:rajvibhatt21@gmail.com' },
]

export default function SocialLinks() {
  return (
    <>
      <div style={S.wrap}>
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.href}
            target={s.icon !== '@' ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={s.label}
            style={S.btn}
            className="social-float-btn"
          >
            <span style={S.icon}>{s.icon}</span>
            <span style={S.label} className="social-label">{s.label}</span>
          </a>
        ))}
      </div>

      <style>{`
        .social-float-btn {
          display: flex;
          align-items: center;
          gap: 0;
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border2);
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: width 0.3s ease, border-color 0.2s ease, color 0.2s ease;
          width: 36px; height: 36px;
        }
        .social-float-btn:hover {
          width: 108px;
          border-color: var(--accent);
          color: var(--accent);
        }
        .social-label {
          white-space: nowrap;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.25s ease 0.1s;
        }
        .social-float-btn:hover .social-label { opacity: 1; }
        @media (max-width: 768px) {
          #social-float { display: none !important; }
        }
      `}</style>
    </>
  )
}

const S = {
  wrap: {
    position: 'fixed',
    left: '1.25rem',
    bottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
    zIndex: 50,
  },
  btn: {},
  icon: {
    minWidth: 34, height: 34,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.72rem', flexShrink: 0,
  },
  label: {
    paddingRight: '0.6rem',
  },
}
