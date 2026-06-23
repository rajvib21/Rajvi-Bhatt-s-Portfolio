import { useEffect, useRef } from 'react'

// Heart Attack Predictor data pulled from projects
const HEART_PROJECT = {
  name: 'Heart Attack Prediction System',
  desc: 'Decision Tree classifier on real health data (age, cholesterol, BP, heart rate) to predict heart attack risk with explainable decision paths.',
  stack: ['Python', 'Scikit-learn', 'Pandas'],
  github: 'https://github.com/rajvib21/heart_attack_predictor_ml',
}

const TIMELINE = [
  {
    period: ['JAN 2026', 'PRESENT'],
    current: true,
    role: 'Python Developer Intern',
    company: 'NetAI',
    location: 'Gandhinagar, India',
    type: 'Internship',
    certLink: null,
    bullets: [
      'Built RESTful backend services using FastAPI within a Linux-based microservices architecture',
      'Developed an MCP-based chatbot with multi-tool agentic architecture for automated network queries',
      'Created a RAG chatbot for the product landing page — context-aware responses over product documentation',
      'Built a MIB Browser with advanced search supporting 100,000+ OIDs (List, Table, Tree views) and role-based admin panel',
      'Developed service-based landing pages with React.js',
      'Implemented Celery and gRPC for asynchronous task processing and inter-service communication',
    ],
    tags: ['FastAPI','Python','React.js','RAG','LangChain','MCP Agents','PostgreSQL','gRPC','Celery','Linux'],
    project: null,
  },
  {
    period: ['JUL 2025', null],
    current: false,
    role: 'Azure AI Fundamentals',
    company: 'Microsoft',
    location: 'AI-900',
    type: 'Certification',
    certLink: 'https://learn.microsoft.com/en-us/certifications/exams/ai-900/',
    bullets: [
      'Certified in Azure AI services, machine learning concepts, and responsible AI principles',
      'Covered Azure Cognitive Services, Azure Machine Learning, and AI workloads',
    ],
    tags: ['Azure','AI/ML','Cloud','Cognitive Services'],
    project: null,
  },
  {
    period: ['FEB 2025', null],
    current: false,
    role: 'Intro to Data Science & AI',
    company: 'Certification',
    location: 'Online',
    type: 'Certification',
    certLink: null,
    bullets: [
      'Foundations of data science, AI concepts, and applied machine learning workflows',
      'Hands-on project: built a Heart Attack Prediction System using Decision Tree classifier',
    ],
    tags: ['Data Science','AI','Machine Learning','Python','Scikit-learn'],
    project: HEART_PROJECT,
  },
]

function Card({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, index * 100)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div style={S.row}>
      {/* Timeline column */}
      <div style={S.timelineCol}>
        <div style={S.dates}>
          <span style={S.date}>{item.period[0]}</span>
          {item.period[1] && <span style={{ ...S.date, color: 'var(--accent)' }}>{item.period[1]}</span>}
        </div>
        {item.current && <span style={S.liveDot} />}
        {/* Vertical line (not for last item) */}
        <div style={S.line} />
      </div>

      {/* Card */}
      <div
        ref={ref}
        style={{
          ...S.card,
          borderLeft: item.current ? '3px solid var(--accent)' : '1.5px solid var(--border2)',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
      >
        {/* Header */}
        <div style={S.cardTop}>
          <div>
            <div style={S.role}>{item.role}</div>
            <div style={S.company}>
              {item.company}
              <span style={{ margin: '0 0.4rem', opacity: 0.35 }}>·</span>
              {item.location}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <span style={S.typeBadge}>{item.type}</span>
            {item.certLink && (
              <a href={item.certLink} target="_blank" rel="noreferrer" style={S.certLink}
                onMouseEnter={e => { e.target.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)' }}
              >
                View Certificate ↗
              </a>
            )}
          </div>
        </div>

        {/* Bullets */}
        <ul style={S.ul}>
          {item.bullets.map((b, i) => (
            <li key={i} style={S.li}>
              <span style={S.arrow}>→</span>
              <span style={S.liText}>{b}</span>
            </li>
          ))}
        </ul>

        {/* Linked project card */}
        {item.project && (
          <div style={S.projectChip}>
            <span style={S.projectChipLabel}>Project Built</span>
            <div style={S.projectChipCard}>
              <div style={S.projectChipName}>{item.project.name}</div>
              <div style={S.projectChipDesc}>{item.project.desc}</div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {item.project.stack.map(t => <span key={t} style={S.tech}>{t}</span>)}
              </div>
              {item.project.github && (
                <a href={item.project.github} target="_blank" rel="noreferrer" style={S.projectLink}
                  onMouseEnter={e => { e.target.style.borderBottomColor = 'var(--accent)' }}
                  onMouseLeave={e => { e.target.style.borderBottomColor = 'transparent' }}
                >GitHub ↗</a>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        <div style={S.tags}>
          {item.tags.map(t => <span key={t} style={S.tag}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg-primary)', padding: '5rem 2rem' }}>
      <div className="container">
        <span className="section-tag">// 03 — Experience</span>
        <h2 className="section-title">Timeline</h2>
        <div style={S.wrap}>
          {TIMELINE.map((item, i) => (
            <Card key={item.role + item.period[0]} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-row { grid-template-columns: 80px 1fr !important; gap: 1rem !important; }
        }
        @media (max-width: 480px) {
          .exp-row { grid-template-columns: 1fr !important; }
          .exp-timeline-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}

const S = {
  wrap: { maxWidth: 860 },
  row: {
    display: 'grid',
    gridTemplateColumns: '110px 1fr',
    gap: '1.75rem',
    marginBottom: '1.5rem',
    position: 'relative',
  },
  timelineCol: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'flex-end',
    paddingTop: '0.3rem',
    position: 'relative',
  },
  dates: { display: 'flex', flexDirection: 'column', gap: '0.15rem', alignItems: 'flex-end' },
  date: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.6rem', color: 'var(--text-secondary)',
    letterSpacing: '0.05em', lineHeight: 1.6,
  },
  liveDot: {
    width: 9, height: 9,
    background: '#4ade80', borderRadius: '50%',
    marginTop: '0.5rem',
    boxShadow: '0 0 0 3px rgba(74,222,128,0.2)',
  },
  line: {
    width: 1, flex: 1, minHeight: 32,
    background: 'var(--border2)',
    margin: '0.5rem 0 -1.5rem 0',
    alignSelf: 'center',
    marginRight: '-0.88rem',
  },
  card: {
    background: 'var(--bg-secondary)',
    border: '1.5px solid var(--border2)',
    padding: '1.35rem',
    transition: 'box-shadow 0.2s ease',
  },
  cardTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem',
  },
  role: { fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.18rem' },
  company: { fontFamily: "'Space Mono',monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.04em' },
  typeBadge: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.58rem', color: 'var(--text-secondary)',
    border: '1px solid var(--border2)',
    padding: '0.18rem 0.45rem',
    whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  certLink: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.6rem', color: 'var(--text-secondary)',
    textDecoration: 'none', transition: 'color 0.15s ease',
    letterSpacing: '0.04em',
  },
  ul: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' },
  li: { display: 'flex', alignItems: 'flex-start', gap: '0.55rem' },
  arrow: { fontFamily: "'Space Mono',monospace", fontSize: '0.65rem', color: 'var(--accent)', flexShrink: 0, marginTop: '0.18rem' },
  liText: { fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65 },
  // Project chip inside cert card
  projectChip: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border)',
  },
  projectChipLabel: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.6rem', color: 'var(--accent)',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '0.6rem',
  },
  projectChipCard: {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border2)',
    padding: '0.85rem 1rem',
  },
  projectChipName: { fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' },
  projectChipDesc: { fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 },
  tech: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.58rem', padding: '0.1rem 0.4rem',
    background: 'var(--bg-primary)', border: '1px solid var(--border2)', color: 'var(--text-secondary)',
  },
  projectLink: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.62rem', color: 'var(--accent)',
    textDecoration: 'none', display: 'inline-block',
    marginTop: '0.6rem', borderBottom: '1px solid transparent',
    transition: 'border-color 0.15s ease',
  },
  tags: {
    display: 'flex', flexWrap: 'wrap', gap: '0.35rem',
    marginTop: '1rem', paddingTop: '0.85rem',
    borderTop: '1px solid var(--border)',
  },
  tag: {
    fontFamily: "'Space Mono',monospace",
    fontSize: '0.6rem', padding: '0.12rem 0.45rem',
    border: '1px solid var(--border2)', color: 'var(--text-secondary)',
  },
}