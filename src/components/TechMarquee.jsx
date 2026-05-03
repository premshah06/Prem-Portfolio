import React from 'react';

const row1 = [
  'Python', 'React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL',
  'Apache Kafka', 'Docker', 'Kubernetes', 'TensorFlow', 'LangChain',
  'AWS', 'Snowflake', 'Apache Spark', 'dbt', 'Redis', 'GraphQL', 'MongoDB',
];

const row2 = [
  'Machine Learning', 'Data Engineering', 'Full Stack Dev', 'LLMs / RAG',
  'ETL Pipelines', 'Analytics', 'MLOps', 'System Design', 'REST APIs',
  'NLP', 'Computer Vision', 'Data Modeling', 'Feature Engineering', 'Deep Learning',
];

function Row({ items, reverse = false, accent = '#6cd4ff', speed = 40 }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        maskImage:       'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '10px',
          width: 'max-content',
          animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${items.length * speed / 10}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              padding: '5px 14px',
              borderRadius: '100px',
              background: `${accent}0c`,
              border: `1px solid ${accent}20`,
              color: `${accent}80`,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              transition: 'color 0.2s, border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = accent;
              e.currentTarget.style.borderColor = `${accent}55`;
              e.currentTarget.style.background   = `${accent}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = `${accent}80`;
              e.currentTarget.style.borderColor = `${accent}20`;
              e.currentTarget.style.background   = `${accent}0c`;
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div
      style={{
        background: 'rgba(246,243,238,0.88)',
        borderTop:    '1px solid rgba(28,27,46,0.08)',
        borderBottom: '1px solid rgba(28,27,46,0.08)',
        padding: '22px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'hidden',
      }}
    >
      <Row items={row1} accent="#0284c7" speed={42} />
      <Row items={row2} accent="#7c3aed" speed={36} reverse />
    </div>
  );
}
