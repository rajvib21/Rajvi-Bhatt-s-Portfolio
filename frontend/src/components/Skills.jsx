import { useEffect, useRef } from 'react'

const CATEGORIES = [
  {
    tag: 'Core',
    title: 'Programming Languages',
    skills: ['Python', 'SQL', 'JavaScript'],
  },
  {
    tag: 'Backend / Frontend',
    title: 'Frameworks & APIs',
    skills: ['FastAPI', 'React.js', 'REST APIs', 'gRPC', 'LangChain', 'LangGraph'],
  },
  {
    tag: 'AI',
    title: 'AI / ML & Agentic Systems',
    skills: [
      'Machine Learning',
      'Retrieval-Augmented Generation (RAG)',
      'AI Agents',
      'Model Context Protocol (MCP)',
      'Agent-to-Agent (A2A)',
      'Multi-Agent Systems',
      'OpenAI Embeddings',
      'Vector Search',
    ],
  },
  {
    tag: 'Data',
    title: 'Databases & Caching',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'ClickHouse', 'Redis'],
  },
  {
    tag: 'Infrastructure',
    title: 'Cloud & DevOps',
    skills: ['Google Cloud Platform (GCP)', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux'],
  },
  {
    tag: 'Architecture',
    title: 'Distributed Systems',
    skills: ['Apache Kafka', 'Celery', 'Microservices Architecture', 'Async Task Processing'],
  },
  {
    tag: 'Tools',
    title: 'Tools & Platforms',
    skills: ['Git', 'Linux', 'Azure AI (AI-900)'],
  },
  {
    tag: 'Human',
    title: 'Soft Skills',
    skills: ['Problem Solving', 'Creative Thinking', 'Discipline & Focus', 'Continuous Learning', 'Collaboration'],
  },
]

function SkillCard({ cat, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(16px)'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.45s ease, transform 0.45s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, (index % 4) * 80)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      style={S.card}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border2)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={S.cardHead}>
        <span style={S.catTag}>{cat.tag}</span>
        <h3 style={S.catTitle}>{cat.title}</h3>
      </div>
      <div style={S.list}>
        {cat.skills.map(skill => (
          <div key={skill} style={S.skillRow}>
            <span style={S.arrow}>→</span>
            <span style={S.skillName}>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <span className="section-tag">// 02 — Skills</span>
        <h2 className="section-title">What I Work With</h2>

        <div style={S.grid}>
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const S = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: 'var(--bg-tertiary)',
    border: '1.5px solid var(--border2)',
    padding: '1.1rem 1.15rem 1rem',
    display: 'flex', flexDirection: 'column', gap: '0.7rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  cardHead: {
    borderBottom: '1px solid var(--border)',
    paddingBottom: '0.65rem',
  },
  catTag: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.58rem', color: 'var(--accent)',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '0.25rem', opacity: 0.75,
  },
  catTitle: {
    fontSize: '0.82rem', fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '-0.01em', lineHeight: 1.3,
  },
  list: { display: 'flex', flexDirection: 'column', gap: '0.32rem' },
  skillRow: { display: 'flex', alignItems: 'baseline', gap: '0.45rem' },
  arrow: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.62rem', color: 'var(--accent)', flexShrink: 0,
  },
  skillName: {
    fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5,
  },
}
