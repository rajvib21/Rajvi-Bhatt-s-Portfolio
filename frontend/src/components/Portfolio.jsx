import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    num: '01', type: 'AI · Productivity',
    name: 'AI Habit Tracker & Productivity Coach',
    desc: 'Productivity dashboard with progress heatmaps, mood tracking, completion trends, and AI-generated weekly performance summaries.',
    stack: ['Python','React.js','LangChain','PostgreSQL'],
    github: 'https://github.com/rajvib21/AI-HABIT_COACH',
    live: null,
  },
  {
    num: '02', type: 'AI · NLP',
    name: 'AI RAG Chatbot',
    desc: 'RAG chatbot using OpenAI Embeddings and LangChain with text chunking, vector search, and semantic retrieval for context-aware Q&A over product documentation.',
    stack: ['Python','LangChain','OpenAI','FastAPI','SQLite'],
    github: null,
    live: 'https://netai.netaihub.tech/',
  },
  {
    num: '03', type: 'Tool · Network',
    name: 'MIB Browser',
    desc: 'MIB Browser with search engine supporting 100,000+ OIDs. Includes List, Table, and Tree views plus a role-based admin panel for user management and CRUD operations.',
    stack: ['React.js','PostgreSQL','FastAPI'],
    github: null,
    live: 'https://mibs.netaihub.tech/',
  },
  {
    num: '04', type: 'ML · Healthcare',
    name: 'Heart Attack Prediction System',
    desc: 'Decision Tree classifier on real health data (age, cholesterol, BP, heart rate) to predict heart attack risk with explainable, human-readable decision paths.',
    stack: ['Python','Scikit-learn','Pandas'],
    github: 'https://github.com/rajvib21/heart_attack_predictor_ml',
    live: null,
  },
  {
    num: '05', type: 'AI · Sustainability',
    name: 'AI Food Surplus Tracker',
    desc: 'Smart system to track and reduce food surplus, helping tackle real-world waste through AI-driven insights and recommendations.',
    stack: ['Python','FastAPI','AI'],
    github: 'https://github.com/rajvib21/Surplus_Food_Tracker',
    live: null,
  },
  {
    num: '06', type: 'Hackathon',
    name: 'Stack It — Odoo Hackathon',
    desc: 'Collaborative Q&A platform for developers to share knowledge, ask questions, and grow together — built during an Odoo hackathon.',
    stack: ['Python','Odoo'],
    github: 'https://github.com/rajvib21/stackit-odoo',
    live: null,
  },
  {
    num: '07', type: 'Creative',
    name: "Mother's Day Game",
    desc: 'A heartfelt interactive game blending creativity with code to create a memorable personal digital experience.',
    stack: ['JavaScript','HTML','CSS'],
    github: 'https://github.com/rajvib21/mother-s_day_game',
    live: null,
  },
]

function ProjCard({ project, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(22px)'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
          el.style.opacity = '1'
          el.style.transform = `rotate(${index % 2 === 0 ? '-0.4' : '0.4'}deg)`
        }, (index % 3) * 90)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const rot = index % 2 === 0 ? '-0.4deg' : '0.4deg'

  return (
    <div
      ref={ref}
      style={{ ...S.card }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'rotate(0deg) translate(-3px,-5px)'
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow = 'var(--shadow)'
        e.currentTarget.style.transition = 'all 0.2s ease'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${rot})`
        e.currentTarget.style.borderColor = 'var(--border2)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transition = 'all 0.2s ease'
      }}
    >
      <div style={S.meta}>
        <span style={S.num}>{project.num}</span>
        <span style={S.type}>{project.type}</span>
      </div>
      <h3 style={S.name}>{project.name}</h3>
      <p style={S.desc}>{project.desc}</p>
      <div style={S.stack}>
        {project.stack.map(t => <span key={t} style={S.tech}>{t}</span>)}
      </div>
      <div style={S.links}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" style={S.link}
            onMouseEnter={e => { e.target.style.borderBottomColor = 'var(--accent)' }}
            onMouseLeave={e => { e.target.style.borderBottomColor = 'transparent' }}>
            GitHub ↗
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" style={S.link}
            onMouseEnter={e => { e.target.style.borderBottomColor = 'var(--accent)' }}
            onMouseLeave={e => { e.target.style.borderBottomColor = 'transparent' }}>
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <span className="section-tag">// 04 — Projects</span>
        <h2 className="section-title">Featured Projects</h2>
        <div style={S.grid}>
          {PROJECTS.map((p, i) => <ProjCard key={p.num} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

const S = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
    gap: '1.15rem',
  },
  card: {
    background: 'var(--bg-tertiary)',
    border: '1.5px solid var(--border2)',
    padding: '1.35rem',
    display: 'flex', flexDirection: 'column', gap: '0.55rem',
  },
  meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  num: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.1em',
  },
  type: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.58rem', color: 'var(--text-secondary)',
    letterSpacing: '0.06em', textTransform: 'uppercase',
  },
  name: {
    fontSize: '0.97rem', fontWeight: 700,
    color: 'var(--text-primary)', lineHeight: 1.25, letterSpacing: '-0.01em',
  },
  desc: {
    fontSize: '0.8rem', color: 'var(--text-secondary)',
    lineHeight: 1.7, flex: 1,
  },
  stack: { display: 'flex', flexWrap: 'wrap', gap: '0.3rem', paddingTop: '0.35rem' },
  tech: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.58rem', padding: '0.12rem 0.4rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border2)', color: 'var(--text-secondary)',
  },
  links: {
    display: 'flex', gap: '1rem',
    marginTop: '0.35rem', paddingTop: '0.7rem',
    borderTop: '1px solid var(--border)',
  },
  link: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.65rem', color: 'var(--accent)',
    textDecoration: 'none', textTransform: 'uppercase',
    letterSpacing: '0.07em',
    borderBottom: '1px solid transparent',
    transition: 'border-color 0.15s ease',
  },
}
