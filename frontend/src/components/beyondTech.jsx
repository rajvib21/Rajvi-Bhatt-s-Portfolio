import { useEffect, useRef } from 'react'

const ARTS = [
    { label: 'Dance Journey', value: '15+ Years', sub: 'Practising Bharatnatyam and teaching' },
    { label: 'Degree', value: 'B.A. Bharatnatyam', sub: 'Double Bachelor\'s in  Classical Dance' },
    { label: 'Arangetram', value: 'Age 13 · 2018', sub: 'Completed full Arangetram — the formal graduation of a classical dancer' },
    { label: 'State Rank', value: '3rd · 2018', sub: 'Ranked at state level in Bharatnatyam, category 13–22 yrs' },
    { label: 'Classical Music', value: '4 Years', sub: 'Classical vocal training in Hindustani Music' },
]



function FadeIn({ children, delay = 0 }) {
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
        }, { threshold: 0.1 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return <div ref={ref}>{children}</div>
}
export default function BeyondTech({ onClose }) {
    return (
        <section
            id="beyond-tech"
            style={{ background: 'var(--bg-primary)', padding: '5rem 2rem' }}
        >
            <div className="container">
                <button
                    onClick={onClose}
                    style={{
                        marginBottom: '2rem',
                        padding: '0.7rem 1.2rem',
                        border: '2px solid var(--accent)',
                        background: 'transparent',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700,
                    }}
                >
                    ← Back
                </button>
                <span className="section-tag">// 06 — Beyond Tech</span>
                <h2 className="section-title">Classical Art</h2>


                <div style={S.grid}>
                    {/* Arts Panel */}
                    <FadeIn delay={0}>
                        <div style={S.panel}>
                            <div style={S.panelHead}>
                                <span style={S.panelTag}>
                                    Bharatnatyam & Music
                                </span>
                                <span style={{ fontSize: '1.2rem' }}>🎭</span>
                            </div>

                            {ARTS.map(a => (
                                <div key={a.label} style={S.artRow}>
                                    <div style={S.artLabel}>{a.label}</div>

                                    <div style={S.artRight}>
                                        <span style={S.artValue}>
                                            {a.value}
                                        </span>
                                        <span style={S.artSub}>
                                            {a.sub}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Why Both */}
                    <FadeIn delay={200}>
                        <div style={S.extraNote}>
                            <div style={S.noteHead}>
                                Why both?
                            </div>

                            <p style={S.notePara}>
                                <p style={S.notePara}>
                                    Through Bharatnatyam, I've learned that growth comes from the right
                                    guidance, dedication, and continuous practice. From performing and
                                    teaching to collaborating with others, many of those experiences have
                                    influenced how I learn, work, and build things today.
                                </p>
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}

const S = {
    quote: {
        fontSize: 'clamp(1rem,2.5vw,1.25rem)',
        color: 'var(--accent)',
        fontStyle: 'italic',
        lineHeight: 1.65,
        borderLeft: '3px solid var(--accent)',
        paddingLeft: '1.25rem',
        marginBottom: '3rem',
        maxWidth: 620,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start',
    },
    panel: {
        background: 'var(--bg-secondary)', border: '1.5px solid var(--border2)',
        borderLeft: '3px solid var(--accent)', overflow: 'hidden',
    },
    panelHead: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.9rem 1.1rem', borderBottom: '1px solid var(--border)',
        background: 'var(--bg-tertiary)',
    },
    panelTag: { fontFamily: "'Space Mono',monospace", fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 },
    artRow: { display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.85rem 1.1rem', borderBottom: '1px solid var(--border)' },
    artLabel: { fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', minWidth: '72px', paddingTop: '0.12rem' },
    artRight: { display: 'flex', flexDirection: 'column', gap: '0.12rem' },
    artValue: { fontFamily: "'Space Mono',monospace", fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' },
    artSub: { fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.55 },
    lifeGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1.25rem' },
    lifeCard: {
        background: 'var(--bg-secondary)', border: '1.5px solid var(--border2)',
        padding: '1.1rem 0.9rem', textAlign: 'center',
        transition: 'all 0.2s ease', cursor: 'default',
    },
    lifeTitle: { fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' },
    lifeDesc: { fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5 },
    extraNote: {
        background: 'var(--bg-secondary)', border: '1.5px solid var(--border2)',
        borderLeft: '3px solid var(--accent)', padding: '1.25rem',
    },
    noteHead: { fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' },
    notePara: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75 },
}