import { useState } from 'react'

const CONTACT_LINKS = [
  { icon: '@', label: 'rajvibhatt21@gmail.com', href: 'mailto:rajvibhatt21@gmail.com' },
  { icon: 'in', label: 'linkedin.com/in/rajvibhatt21', href: 'https://linkedin.com/in/rajvibhatt21' },
  { icon: 'gh', label: 'github.com/rajvib21', href: 'https://github.com/rajvib21' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [toast, setToast] = useState({ show: false, msg: '', ok: true })

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4500)
  }

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    const { name, email, message } = form
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in all fields.', false)
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address.', false)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        showToast('✦ Message sent! I\'ll get back to you soon.')
      } else {
        throw new Error(data.detail || 'Something went wrong.')
      }
    } catch (err) {
      setStatus('error')
      showToast(err.message || 'Failed to send. Try emailing directly.', false)
    } finally {
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <>
      <section id="contact" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <span className="section-tag">// 05 — Contact</span>
          <h2 className="section-title">Let's Connect</h2>

          <div style={S.grid}>
            {/* Info col */}
            <div>
              <h3 style={S.subHeading}>Got an idea?<br />Let's build it.</h3>
              <p style={S.subText}>
                I'm open to full-time roles and internship opportunities in AI/ML and
                backend development from August 2026. Whether you have a project, a question,
                or just want to say hello — my inbox is open.
              </p>

              <div style={S.linkList}>
                {CONTACT_LINKS.map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={S.cLink}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.paddingLeft = '1.15rem'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border2)'
                      e.currentTarget.style.paddingLeft = '0.75rem'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }}
                  >
                    <span style={S.cIcon}>{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form col */}
            <div style={S.formWrap}>
              {['name', 'email'].map(field => (
                <div key={field} style={S.field}>
                  <label style={S.label}>{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                    style={S.input}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = 'var(--shadow-sm)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}
              <div style={S.field}>
                <label style={S.label}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  style={{ ...S.input, resize: 'none' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = 'var(--shadow-sm)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{
                  ...S.submit,
                  opacity: status === 'loading' ? 0.7 : 1,
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                }}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message ✦'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div style={{
        ...S.toast,
        transform: toast.show ? 'translateY(0)' : 'translateY(120px)',
        opacity: toast.show ? 1 : 0,
        background: toast.ok ? 'var(--accent)' : '#ff6b6b',
        color: toast.ok ? '#000' : '#fff',
        borderColor: toast.ok ? '#000' : '#c0392b',
      }}>
        {toast.msg}
      </div>
    </>
  )
}

const S = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  subHeading: {
    fontSize: '1.35rem', fontWeight: 700,
    color: 'var(--text-primary)',
    lineHeight: 1.3, marginBottom: '1rem',
  },
  subText: {
    fontSize: '0.88rem', color: 'var(--text-secondary)',
    lineHeight: 1.8, marginBottom: '1.75rem',
  },
  linkList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  cLink: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none', fontSize: '0.83rem',
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--border2)',
    transition: 'all 0.2s ease',
  },
  cIcon: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.65rem',
    background: 'var(--accent)', color: '#000',
    padding: '0.18rem 0.4rem', fontWeight: 700,
  },
  formWrap: { display: 'flex', flexDirection: 'column', gap: '0.85rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  label: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.65rem', color: 'var(--accent)',
    letterSpacing: '0.12em', textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    background: 'var(--bg-tertiary)',
    border: '1.5px solid var(--border2)',
    color: 'var(--text-primary)',
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: '0.88rem',
    padding: '0.7rem 0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  submit: {
    width: '100%', padding: '0.85rem',
    background: 'var(--accent)', color: '#000',
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.78rem', fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    border: '2px solid var(--accent)',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem',
    padding: '1rem 1.5rem',
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.78rem', fontWeight: 700,
    border: '2px solid',
    zIndex: 999,
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
    maxWidth: 340,
  },
}
