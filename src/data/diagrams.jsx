import React from 'react';

/* ══════════════════════════════════════════════════════════════════════════
   Hand-drawn "crayon" diagram system — light paper panels, sketchy wobbly
   boxes, marker-style dashed connectors, Kalam script labels. Every diagram
   packs in real project specifics (endpoints, thresholds, metrics) so a
   viewer can understand the architecture from the drawing alone, without
   reading the card description.
   ══════════════════════════════════════════════════════════════════════════ */

const M = "'JetBrains Mono',monospace";
const H = "'Kalam',cursive";
const INK = '#2b2620';
const PAPER = '#f3ede0';

/* Crayon hue palette — muted earthy tones, each with a slightly darkened
   "ink" variant used for text/strokes so labels stay legible on the light
   paper background. Panel tints are assigned per-project so neighboring
   grid cards don't repeat the same combo. */
const C = {
  amb:  { line: '#b8722a', text: '#8f5720' },
  teal: { line: '#1f7a8c', text: '#175d6b' },
  vio:  { line: '#7c3aed', text: '#6226c4' },
  grn:  { line: '#0d7a4f', text: '#0a5e3d' },
  rose: { line: '#b8383f', text: '#953036' },
  gold: { line: '#a1467a', text: '#833a64' },
  blue: { line: '#3a5fc4', text: '#2f4da3' },
  mag:  { line: '#a1467a', text: '#833a64' },
  brn:  { line: '#7a5230', text: '#5f4126' },
  ink:  { line: INK, text: INK },
};

/* Deterministic pseudo-random jitter so re-renders don't reflow the sketch. */
const jit = (seed, n) => Math.sin(n * 12.9898 + seed * 78.233) * 1.4;

/* Rough (hand-drawn) rectangle path — four corners nudged by seeded jitter. */
const roughRect = (x, y, w, h, seed = 0) => {
  const j = (n) => jit(seed, n);
  return `M${x + j(1)},${y + j(2)} L${x + w + j(3)},${y + j(4)} L${x + w + j(5)},${y + h + j(6)} L${x + j(7)},${y + h + j(8)} Z`;
};

/* Node: sketchy double-outline box with a Kalam-script title and up to two
   monospace detail lines (endpoints, thresholds, real numbers). */
const N = ({ cx, cy, w, h = 40, col = 'ink', label, lines, seed = 0 }) => {
  const s = C[col];
  const x = cx - w / 2, y = cy - h / 2;
  return (
    <>
      <path d={roughRect(x, y, w, h, seed)} fill={`${s.line}20`} stroke={s.line} strokeWidth="1.7" strokeLinejoin="round" />
      <path d={roughRect(x + 1.6, y + 1.6, w - 3.2, h - 3.2, seed + 9)} fill="none" stroke={s.line} strokeWidth="0.8" opacity="0.45" strokeLinejoin="round" />
      <text x={cx} y={y + 13} textAnchor="middle" fontFamily={H} fontWeight="700" fontSize="12" fill={s.text}>{label}</text>
      {(lines || []).map((t, i) => (
        <text key={i} x={cx} y={cy + 3 + i * 8 + (lines.length > 1 ? -2 : 0)} textAnchor="middle" fontFamily={M} fontSize="6" fill={INK} opacity="0.72">{t}</text>
      ))}
    </>
  );
};

/* Marker-style dashed connector with a gentle organic curve and an optional
   label describing what actually flows (protocol, cadence, trigger). */
const Ln = ({ x1, y1, x2, y2, col = 'ink', seed = 0, label, pid }) => {
  const s = C[col];
  const mx = (x1 + x2) / 2 + Math.sin(seed) * 8;
  const my = (y1 + y2) / 2 + Math.cos(seed) * 8;
  return (
    <>
      <path d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} fill="none" stroke={s.line} strokeWidth="1.8"
        strokeLinecap="round" strokeDasharray="1,5" opacity="0.85"
        markerEnd={pid ? `url(#ah-${pid}-${col})` : undefined} />
      {label && <text x={mx} y={my - 4} textAnchor="middle" fontFamily={M} fontWeight="600" fontSize="5.5" fill={s.text}>{label}</text>}
    </>
  );
};

/* Small pill badge for a single headline stat (top-right corner). */
const Badge = ({ cx, cy, text, col = 'ink' }) => {
  const s = C[col];
  const w = Math.max(48, text.length * 5.6 + 16);
  return (
    <>
      <rect x={cx - w / 2} y={cy - 8} width={w} height={16} rx="8" fill={s.line} opacity="0.16" stroke={s.line} strokeWidth="1" />
      <text x={cx} y={cy + 3} textAnchor="middle" fontFamily={M} fontWeight="700" fontSize="6.6" fill={s.text}>{text}</text>
    </>
  );
};

/* Arrowhead marker registry, one per hue, scoped per-SVG by pid. */
const ArrowDefs = ({ pid }) => (
  <defs>
    {Object.entries(C).map(([key, s]) => (
      <marker key={key} id={`ah-${pid}-${key}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill={s.line} opacity="0.85" />
      </marker>
    ))}
  </defs>
);

/* Subtle paper-grain noise filter, unique per SVG via seed. */
const PaperTexture = ({ pid, seed }) => (
  <filter id={`paper-${pid}`}>
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} result="noise" />
    <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.09  0 0 0 0.035 0" />
  </filter>
);

/* Footer caption — small hand-lettered summary line under the diagram. */
const Cap = ({ t }) => (
  <text x="240" y="233" textAnchor="middle" fontFamily={M} fontSize="6.3" fill={INK} opacity="0.5">{t}</text>
);

/* SVG shell — light paper panel with a hand-drawn border frame, title, and
   subtitle. `detailed` is accepted for API parity with callers but the
   crayon style has no motion, so it is otherwise unused. */
const Svg = ({ pid, seed = 1, title, subtitle, badge, children }) => (
  <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      <PaperTexture pid={pid} seed={seed} />
      <ArrowDefs pid={pid} />
    </defs>
    <rect width="480" height="240" fill={PAPER} />
    <rect width="480" height="240" filter={`url(#paper-${pid})`} />
    <path d={roughRect(7, 7, 466, 226, seed + 40)} fill="none" stroke={INK} strokeWidth="1.4" opacity="0.35" strokeLinejoin="round" />
    <text x="18" y="25" fontFamily={H} fontWeight="700" fontSize="17" fill={INK}>{title}</text>
    {subtitle && <text x="18" y="37" fontFamily={M} fontSize="6.3" letterSpacing="0.05em" fill={INK} opacity="0.55">{subtitle}</text>}
    {badge && <Badge cx={430} cy={22} text={badge.text} col={badge.col} />}
    {children}
  </svg>
);


/* ══════════════════════════════════════════════════════════════════════════
   1. GraphMediator AI — multi-agent living knowledge base.
   ══════════════════════════════════════════════════════════════════════════ */
export function GraphMediatorDiagram() {
  return (
    <Svg pid="gm" seed={1} title="GraphMediator AI" subtitle="MULTI-AGENT LIVING KNOWLEDGE BASE" badge={{ text: '94.9% cost cut', col: 'vio' }}>
      <N cx={65} cy={62} w={100} h={38} col="ink" label="User Query" lines={['WebSocket']} seed={1} />
      <Ln x1={115} y1={62} x2={155} y2={62} col="teal" seed={1} label="FastAPI" pid="gm" />
      <N cx={215} cy={62} w={120} h={38} col="teal" label="LangGraph" lines={['ingest + query graphs']} seed={2} />
      <Ln x1={275} y1={62} x2={315} y2={62} col="vio" seed={2} label="dispatch" pid="gm" />
      <N cx={395} cy={62} w={150} h={38} col="vio" label="5 Agents" lines={['Librarian·Philosopher·Critic', 'Synthesizer·Scholar']} seed={3} />

      <Ln x1={340} y1={83} x2={215} y2={112} col="grn" seed={3} label="critic loop" pid="gm" />
      <N cx={155} cy={132} w={190} h={36} col="grn" label="Contradiction Resolution" lines={['confidence-gated loop', 'provenance ledger']} seed={4} />

      <Ln x1={395} y1={83} x2={395} y2={112} col="amb" seed={4} label="store" pid="gm" />
      <N cx={395} cy={132} w={140} h={36} col="amb" label="ChromaDB" lines={['persistent vectors']} seed={5} />

      <Ln x1={155} y1={150} x2={100} y2={182} col="rose" seed={5} label="/graph/stats" pid="gm" />
      <N cx={95} cy={200} w={140} h={34} col="rose" label="Cost Router" lines={['cheapest model / agent']} seed={6} />

      <Ln x1={395} y1={150} x2={395} y2={182} col="blue" seed={6} label="stream" pid="gm" />
      <N cx={395} cy={200} w={150} h={34} col="blue" label="Three.js Graph" lines={['d3-force-3d · live nodes']} seed={7} />

      <Cap t="idempotent ingestion · token-level streaming · eval harness" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   2. EdgeMind — on-device AI agent with cloud sync.
   ══════════════════════════════════════════════════════════════════════════ */
export function EdgeMindDiagram() {
  return (
    <Svg pid="edge" seed={2} title="EdgeMind" subtitle="ON-DEVICE REACT LOOP + CLOUD SYNC" badge={{ text: 'llama3.1 local', col: 'vio' }}>
      <N cx={70} cy={58} w={110} h={36} col="ink" label="User Query" lines={['on-device']} seed={1} />
      <Ln x1={125} y1={58} x2={165} y2={58} col="vio" seed={1} label="ReAct" pid="edge" />
      <N cx={245} cy={58} w={130} h={36} col="vio" label="LangGraph Loop" lines={['reason → act → observe']} seed={2} />
      <Ln x1={310} y1={58} x2={355} y2={58} col="teal" seed={2} label="infer" pid="edge" />
      <N cx={425} cy={58} w={100} h={36} col="teal" label="Ollama" lines={['llama3.1, local']} seed={3} />

      <Ln x1={245} y1={76} x2={165} y2={110} col="amb" seed={3} label="tools" pid="edge" />
      <N cx={120} cy={128} w={140} h={34} col="amb" label="Tool Use" lines={['file · web search · calc']} seed={4} />

      <Ln x1={245} y1={76} x2={330} y2={110} col="grn" seed={4} label="embed" pid="edge" />
      <N cx={370} cy={128} w={150} h={34} col="grn" label="SQLite + ONNX" lines={['cosine similarity']} seed={5} />

      <Ln x1={245} y1={145} x2={245} y2={180} col="rose" seed={5} label="sync" pid="edge" />
      <N cx={245} cy={198} w={160} h={34} col="rose" label="FastAPI Sync Gateway" lines={['session summaries']} seed={6} />
      <Ln x1={325} y1={198} x2={370} y2={198} col="blue" seed={6} pid="edge" />
      <N cx={425} cy={198} w={100} h={34} col="blue" label="PostgreSQL" lines={['cloud']} seed={7} />

      <Cap t="confidence scoring · automatic retry logic" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   3. Expert Park — 3D park of AI expert NPCs.
   ══════════════════════════════════════════════════════════════════════════ */
export function ExpertParkDiagram() {
  return (
    <Svg pid="epark" seed={3} title="Expert Park" subtitle="6 ROBOT AI EXPERTS · FIRST-PERSON 3D" badge={{ text: 'no bundler', col: 'teal' }}>
      <N cx={70} cy={58} w={110} h={36} col="ink" label="Node Server" lines={['static + HTML includes']} seed={1} />
      <Ln x1={125} y1={58} x2={165} y2={58} col="teal" seed={1} pid="epark" />
      <N cx={245} cy={58} w={140} h={36} col="teal" label="Three.js Scene" lines={['ES modules · CDN']} seed={2} />
      <Ln x1={315} y1={58} x2={355} y2={58} col="vio" seed={2} label="fetch/SSE" pid="epark" />
      <N cx={425} cy={58} w={100} h={36} col="vio" label="Browser" lines={['Pointer Lock']} seed={3} />

      {[
        { x: 90, label: '6 Experts' },
        { x: 240, label: 'Inspector UI' },
        { x: 390, label: 'Q&A Route' },
      ].map((n, i) => (
        <N key={i} cx={n.x} cy={130} w={130} h={36} col="amb" label={n.label}
          lines={i === 0 ? ['ZV-9 · KL-7 · TQ-4 · SN-2'] : i === 1 ? ['bio · pros · bestFor'] : ['isQuestionInScope()']} seed={4 + i} />
      ))}
      <Ln x1={155} y1={130} x2={175} y2={130} col="amb" seed={7} pid="epark" />
      <Ln x1={305} y1={130} x2={325} y2={130} col="amb" seed={8} pid="epark" />

      <Ln x1={390} y1={148} x2={330} y2={180} col="grn" seed={9} label="Claude" pid="epark" />
      <Ln x1={390} y1={148} x2={430} y2={180} col="rose" seed={10} label="fallback" pid="epark" />
      <N cx={280} cy={198} w={120} h={32} col="grn" label="Claude API" lines={['primary']} seed={11} />
      <N cx={425} cy={198} w={100} h={32} col="rose" label="OpenAI" lines={['fallback']} seed={12} />

      <Cap t="local canned answers · mobile auto-tour mode" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   4. IncidentDNA — autonomous incident intelligence platform.
   ══════════════════════════════════════════════════════════════════════════ */
export function IncidentDNADiagram() {
  return (
    <Svg pid="idna" seed={4} title="IncidentDNA" subtitle="ANOMALY → 5 AGENTS → RESOLVED" badge={{ text: '<2 min', col: 'amb' }}>
      <N cx={70} cy={56} w={110} h={34} col="ink" label="Snowflake" lines={['deployment metrics']} seed={1} />
      <Ln x1={125} y1={56} x2={165} y2={56} col="amb" seed={1} label="poll" pid="idna" />
      <N cx={245} cy={56} w={130} h={34} col="amb" label="Anomaly Detector" lines={['triggers pipeline']} seed={2} />

      <Ln x1={245} y1={73} x2={245} y2={100} col="vio" seed={2} pid="idna" />
      <g>
        {['Detector', 'Investigator', 'Fix Advisor', 'Action Agent', 'Validator'].map((n, i) => (
          <N key={i} cx={65 + i * 95} cy={122} w={86} h={32} col="vio" label={n} lines={i === 4 ? [] : undefined} seed={3 + i} />
        ))}
      </g>
      {[0, 1, 2, 3].map(i => (
        <Ln key={i} x1={65 + i * 95 + 43} y1={122} x2={65 + (i + 1) * 95 - 43} y2={122} col="vio" seed={8 + i} pid="idna" />
      ))}

      <Ln x1={65} y1={140} x2={90} y2={172} col="rose" seed={12} label="Slack" pid="idna" />
      <Ln x1={245} y1={140} x2={245} y2={172} col="grn" seed={13} label="issue" pid="idna" />
      <Ln x1={420} y1={140} x2={400} y2={172} col="teal" seed={14} label="write" pid="idna" />
      <N cx={95} cy={190} w={130} h={32} col="rose" label="Slack Alert" lines={['auto-posted']} seed={15} />
      <N cx={245} cy={190} w={120} h={32} col="grn" label="GitHub Issue" lines={['auto-created']} seed={16} />
      <N cx={400} cy={190} w={140} h={32} col="teal" label="React + Plotly" lines={['PostgreSQL-backed']} seed={17} />

      <Cap t="CrewAI agents · root-cause investigation · auto-resolve" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   5. LifeDirector — AI personal narrative engine.
   ══════════════════════════════════════════════════════════════════════════ */
export function LifeDirectorDiagram() {
  return (
    <Svg pid="ldir" seed={5} title="LifeDirector" subtitle="JOURNAL → CINEMATIC CHAPTERS" badge={{ text: 'SSE stream', col: 'vio' }}>
      <N cx={70} cy={58} w={110} h={36} col="ink" label="Journal Entry" lines={['text or voice']} seed={1} />
      <Ln x1={125} y1={58} x2={165} y2={58} col="amb" seed={1} label="ASR" pid="ldir" />
      <N cx={235} cy={58} w={110} h={36} col="amb" label="Whisper ASR" lines={['voice → text']} seed={2} />
      <Ln x1={290} y1={58} x2={330} y2={58} col="vio" seed={2} pid="ldir" />
      <N cx={410} cy={58} w={120} h={36} col="vio" label="Ollama LLM" lines={['local, cinematic prose']} seed={3} />

      <Ln x1={410} y1={76} x2={330} y2={110} col="grn" seed={3} label="SDXL" pid="ldir" />
      <N cx={280} cy={128} w={150} h={34} col="grn" label="fal.ai SDXL" lines={['accompanying images']} seed={4} />

      <Ln x1={410} y1={76} x2={430} y2={110} col="rose" seed={4} label="score" pid="ldir" />
      <N cx={425} cy={128} w={130} h={34} col="rose" label="Drift Detection" lines={['quality scoring']} seed={5} />

      <Ln x1={280} y1={145} x2={200} y2={178} col="teal" seed={5} label="token" pid="ldir" />
      <N cx={160} cy={196} w={170} h={34} col="teal" label="SSE Stream" lines={['token-by-token']} seed={6} />
      <Ln x1={245} y1={196} x2={310} y2={196} col="blue" seed={6} pid="ldir" />
      <N cx={390} cy={196} w={140} h={34} col="blue" label="React + TS" lines={['chapter viewer']} seed={7} />

      <Cap t="SQLAlchemy persistence · narrative drift tracking" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   6. RecallDB — vector similarity search engine (C++).
   ══════════════════════════════════════════════════════════════════════════ */
export function RecallDBDiagram() {
  return (
    <Svg pid="rdb" seed={6} title="RecallDB" subtitle="C++17 VECTOR SEARCH ENGINE" badge={{ text: 'HNSW · KD · brute', col: 'grn' }}>
      <N cx={80} cy={58} w={130} h={36} col="ink" label="sentence-transformers" lines={['auto embeddings']} seed={1} />
      <Ln x1={145} y1={58} x2={185} y2={58} col="amb" seed={1} pid="rdb" />
      <N cx={255} cy={58} w={110} h={36} col="amb" label="ONNX Runtime" lines={['embedding gen']} seed={2} />
      <Ln x1={310} y1={58} x2={350} y2={58} col="grn" seed={2} pid="rdb" />
      <N cx={425} cy={58} w={100} h={36} col="grn" label="C++17 Core" lines={['shared_mutex']} seed={3} />

      <Ln x1={425} y1={76} x2={425} y2={104} col="vio" seed={3} pid="rdb" />
      <g>
        {['Brute Force', 'KD-Tree', 'HNSW'].map((n, i) => (
          <N key={i} cx={130 + i * 130} cy={126} w={110} h={32} col="vio" label={n} lines={i === 2 ? ['default index'] : undefined} seed={4 + i} />
        ))}
      </g>

      <Ln x1={130} y1={142} x2={130} y2={172} col="rose" seed={7} pid="rdb" />
      <N cx={130} cy={190} w={140} h={32} col="rose" label="Binary Persistence" lines={['disk-backed']} seed={8} />
      <Ln x1={390} y1={142} x2={390} y2={172} col="teal" seed={9} pid="rdb" />
      <N cx={390} cy={190} w={150} h={32} col="teal" label="FastAPI + CLI" lines={['REST + pybind11']} seed={10} />

      <Cap t="thread-safe concurrent access · Python bindings" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   7. Seasonal Variation — CDC + Census health-data ETL.
   ══════════════════════════════════════════════════════════════════════════ */
export function SeasonalDiagram() {
  return (
    <Svg pid="seas" seed={7} title="Seasonal Health ETL" subtitle="CDC + CENSUS → AGING TRENDS" badge={{ text: '99.9% acc', col: 'amb' }}>
      <N cx={80} cy={70} w={120} h={38} col="ink" label="CDC Dataset" lines={['health measures']} seed={1} />
      <N cx={80} cy={130} w={120} h={38} col="ink" label="Census Dataset" lines={['demographics']} seed={2} />
      <Ln x1={140} y1={70} x2={195} y2={95} col="amb" seed={1} pid="seas" />
      <Ln x1={140} y1={130} x2={195} y2={105} col="amb" seed={2} pid="seas" />
      <N cx={260} cy={100} w={130} h={40} col="amb" label="Python ETL" lines={['60% efficiency gain']} seed={3} />
      <Ln x1={325} y1={100} x2={370} y2={100} col="teal" seed={3} pid="seas" />
      <N cx={430} cy={100} w={90} h={40} col="teal" label="AWS S3" lines={['staged']} seed={4} />
      <Ln x1={260} y1={120} x2={260} y2={160} col="grn" seed={4} pid="seas" />
      <N cx={260} cy={180} w={190} h={36} col="grn" label="Tableau Dashboards" lines={['+40% insight for care teams']} seed={5} />
      <Cap t="aging-associated health & mental-health trend tracking" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   8. Cyber Attack Analysis — Redshift/Neo4j/Kafka/Cassandra ETL.
   ══════════════════════════════════════════════════════════════════════════ */
export function CyberDiagram() {
  return (
    <Svg pid="cyb" seed={8} title="Threat Defense ETL" subtitle="REAL-TIME NETWORK DEFENSE" badge={{ text: 'Kafka + Cassandra', col: 'rose' }}>
      <N cx={75} cy={58} w={110} h={36} col="ink" label="Network Traffic" lines={['high-velocity']} seed={1} />
      <Ln x1={130} y1={58} x2={170} y2={58} col="rose" seed={1} label="stream" pid="cyb" />
      <N cx={240} cy={58} w={100} h={36} col="rose" label="Kafka" lines={['ingestion']} seed={2} />
      <Ln x1={290} y1={58} x2={330} y2={58} col="amb" seed={2} pid="cyb" />
      <N cx={410} cy={58} w={120} h={36} col="amb" label="Cassandra" lines={['high-velocity store']} seed={3} />

      <Ln x1={240} y1={76} x2={165} y2={110} col="vio" seed={3} label="NiFi ETL" pid="cyb" />
      <N cx={130} cy={128} w={140} h={34} col="vio" label="Apache NiFi" lines={['workflow orchestration']} seed={4} />

      <Ln x1={240} y1={76} x2={320} y2={110} col="teal" seed={4} pid="cyb" />
      <N cx={355} cy={128} w={140} h={34} col="teal" label="AWS Redshift" lines={['analytics DW']} seed={5} />

      <Ln x1={130} y1={145} x2={200} y2={178} col="grn" seed={5} label="graph" pid="cyb" />
      <N cx={245} cy={196} w={150} h={34} col="grn" label="Neo4j" lines={['threat relationship graph']} seed={6} />

      <Cap t="immediate threat detection · relationship-based analysis" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   9. AirBnB Dashboard — Tableau analytics.
   ══════════════════════════════════════════════════════════════════════════ */
export function AirBnBDiagram() {
  return (
    <Svg pid="airbnb" seed={9} title="AirBnB Dashboard" subtitle="TABLEAU INVESTMENT ANALYTICS" badge={{ text: 'by zip code', col: 'rose' }}>
      <N cx={80} cy={62} w={120} h={36} col="ink" label="Listings Data" lines={['prices · bookings']} seed={1} />
      <Ln x1={140} y1={62} x2={185} y2={62} col="amb" seed={1} label="SQL" pid="airbnb" />
      <N cx={255} cy={62} w={110} h={36} col="amb" label="Python + SQL" lines={['clean & aggregate']} seed={2} />
      <Ln x1={310} y1={62} x2={355} y2={62} col="rose" seed={2} pid="airbnb" />
      <N cx={425} cy={62} w={100} h={36} col="rose" label="Tableau" lines={['dashboard']} seed={3} />

      {['Avg Price', 'Booking Trends', 'Revenue / Zip'].map((n, i) => (
        <N key={i} cx={90 + i * 150} cy={150} w={130} h={34} col="teal" label={n} seed={4 + i} />
      ))}
      <Ln x1={425} y1={80} x2={220} y2={132} col="teal" seed={7} pid="airbnb" />

      <Cap t="informed property-investment decisions" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   10. Job Details Analyzer — Python ETL + heatmaps.
   ══════════════════════════════════════════════════════════════════════════ */
export function JobAnalyzerDiagram() {
  return (
    <Svg pid="job" seed={10} title="Job Details Analyzer" subtitle="EMPLOYMENT MARKET ETL" badge={{ text: 'Pandas · NumPy', col: 'amb' }}>
      <N cx={80} cy={60} w={120} h={36} col="ink" label="Job Postings" lines={['raw market data']} seed={1} />
      <Ln x1={140} y1={60} x2={185} y2={60} col="amb" seed={1} pid="job" />
      <N cx={255} cy={60} w={130} h={36} col="amb" label="Python ETL" lines={['extract + transform']} seed={2} />
      <Ln x1={320} y1={60} x2={360} y2={60} col="grn" seed={2} pid="job" />
      <N cx={425} cy={60} w={100} h={36} col="grn" label="SQL" lines={['structured store']} seed={3} />

      {['Heatmaps', 'Pivot Tables', 'Salary Trends'].map((n, i) => (
        <N key={i} cx={90 + i * 150} cy={150} w={130} h={34} col="rose" label={n} seed={4 + i} />
      ))}
      <Ln x1={255} y1={78} x2={220} y2={132} col="rose" seed={7} pid="job" />

      <Cap t="Seaborn visualizations · Colab notebooks" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   11. AI Fit — Gemini-powered fitness coach.
   ══════════════════════════════════════════════════════════════════════════ */
export function AiFitDiagram() {
  return (
    <Svg pid="fit" seed={11} title="AI Fit" subtitle="PERSONALIZED FITNESS COACHING" badge={{ text: 'Gemini Pro', col: 'vio' }}>
      <N cx={80} cy={70} w={130} h={38} col="ink" label="User Goals" lines={['fitness + diet intake']} seed={1} />
      <Ln x1={145} y1={70} x2={190} y2={70} col="vio" seed={1} label="prompt" pid="fit" />
      <N cx={265} cy={70} w={130} h={38} col="vio" label="Gemini Pro" lines={['generative reasoning']} seed={2} />
      <Ln x1={330} y1={70} x2={375} y2={70} col="teal" seed={2} pid="fit" />
      <N cx={430} cy={70} w={100} h={38} col="teal" label="Streamlit" lines={['web UI']} seed={3} />

      <Ln x1={265} y1={89} x2={265} y2={130} col="amb" seed={3} pid="fit" />
      <N cx={265} cy={150} w={220} h={36} col="amb" label="Adaptive Plan Output" lines={['workout + nutrition, real-time']} seed={4} />

      <Cap t="Google Cloud hosted · adaptive coaching loop" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   12. Number Plate Detection — OCR + OpenCV.
   ══════════════════════════════════════════════════════════════════════════ */
export function NumberPlateDiagram() {
  return (
    <Svg pid="plate" seed={12} title="Number Plate Detection" subtitle="OCR TRAFFIC SECURITY SYSTEM" badge={{ text: 'OpenCV + OCR', col: 'blue' }}>
      <N cx={80} cy={70} w={120} h={38} col="ink" label="Uploaded Image" lines={['user photo']} seed={1} />
      <Ln x1={140} y1={70} x2={185} y2={70} col="blue" seed={1} pid="plate" />
      <N cx={255} cy={70} w={120} h={38} col="blue" label="OpenCV" lines={['plate localization']} seed={2} />
      <Ln x1={315} y1={70} x2={360} y2={70} col="amb" seed={2} pid="plate" />
      <N cx={430} cy={70} w={100} h={38} col="amb" label="OCR" lines={['text extraction']} seed={3} />

      <Ln x1={430} y1={89} x2={430} y2={130} col="grn" seed={3} pid="plate" />
      <N cx={430} cy={150} w={150} h={34} col="grn" label="Recognized Plate" lines={['law-enforcement ready']} seed={4} />
      <Ln x1={255} y1={89} x2={255} y2={130} col="rose" seed={4} pid="plate" />
      <N cx={255} cy={150} w={150} h={34} col="rose" label="Streamlit UI" lines={['upload & result view']} seed={5} />

      <Cap t="road-safety compliance tooling" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   13. Heart & Diabetes Detection — Scikit-learn ML.
   ══════════════════════════════════════════════════════════════════════════ */
export function HeartDiagram() {
  return (
    <Svg pid="heart" seed={13} title="Heart & Diabetes ML" subtitle="EARLY-RISK CLINICAL PREDICTION" badge={{ text: 'scikit-learn', col: 'rose' }}>
      <N cx={80} cy={70} w={120} h={38} col="ink" label="Patient Data" lines={['clinical records']} seed={1} />
      <Ln x1={140} y1={70} x2={185} y2={70} col="rose" seed={1} pid="heart" />
      <N cx={255} cy={70} w={140} h={38} col="rose" label="ML Models" lines={['heart disease · diabetes']} seed={2} />
      <Ln x1={325} y1={70} x2={370} y2={70} col="teal" seed={2} pid="heart" />
      <N cx={430} cy={70} w={100} h={38} col="teal" label="Streamlit" lines={['dashboard']} seed={3} />

      <Ln x1={255} y1={89} x2={255} y2={130} col="amb" seed={3} pid="heart" />
      <N cx={255} cy={150} w={200} h={36} col="amb" label="Power BI Insights" lines={['at-risk patient flags']} seed={4} />

      <Cap t="actionable early-detection insights for providers" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   14. Blood Donation App — Android + Firebase.
   ══════════════════════════════════════════════════════════════════════════ */
export function BloodDonationDiagram() {
  return (
    <Svg pid="blood" seed={14} title="Blood Donation App" subtitle="ANDROID DONOR-RECIPIENT MATCH" badge={{ text: 'Firebase RTDB', col: 'rose' }}>
      <N cx={90} cy={70} w={130} h={38} col="ink" label="Donor Profile" lines={['blood group']} seed={1} />
      <N cx={90} cy={140} w={130} h={38} col="ink" label="Recipient Search" lines={['group filter']} seed={2} />
      <Ln x1={155} y1={70} x2={210} y2={100} col="rose" seed={1} pid="blood" />
      <Ln x1={155} y1={140} x2={210} y2={110} col="rose" seed={2} pid="blood" />
      <N cx={280} cy={105} w={130} h={40} col="rose" label="Java Android App" lines={['profile matching']} seed={3} />
      <Ln x1={345} y1={105} x2={390} y2={105} col="amb" seed={3} pid="blood" />
      <N cx={445} cy={105} w={110} h={40} col="amb" label="Firebase" lines={['real-time DB']} seed={4} />
      <Cap t="real-time donor-recipient communication" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   15. TextHidder — image steganography + AES.
   ══════════════════════════════════════════════════════════════════════════ */
export function TextHidderDiagram() {
  return (
    <Svg pid="hide" seed={15} title="TextHidder" subtitle="AES IMAGE STEGANOGRAPHY" badge={{ text: 'AES encrypted', col: 'vio' }}>
      <N cx={80} cy={70} w={120} h={38} col="ink" label="Secret Text" lines={['user input']} seed={1} />
      <Ln x1={140} y1={70} x2={185} y2={70} col="vio" seed={1} label="encrypt" pid="hide" />
      <N cx={255} cy={70} w={110} h={38} col="vio" label="AES Cipher" lines={['symmetric key']} seed={2} />
      <Ln x1={310} y1={70} x2={355} y2={70} col="teal" seed={2} label="embed" pid="hide" />
      <N cx={430} cy={70} w={100} h={38} col="teal" label="Cover Image" lines={['LSB encode']} seed={3} />

      <Ln x1={430} y1={89} x2={430} y2={130} col="amb" seed={3} pid="hide" />
      <N cx={430} cy={150} w={140} h={34} col="amb" label="Stego Image" lines={['shareable file']} seed={4} />
      <Ln x1={255} y1={89} x2={255} y2={130} col="rose" seed={4} pid="hide" />
      <N cx={255} cy={150} w={140} h={34} col="rose" label="Tkinter GUI" lines={['hide / retrieve']} seed={5} />

      <Cap t="practical cryptographic principles, applied" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   16. DeployPulse — deployment tracking platform.
   ══════════════════════════════════════════════════════════════════════════ */
export function DeployPulseDiagram() {
  return (
    <Svg pid="dpl" seed={16} title="DeployPulse" subtitle="WEBHOOK → STATE MACHINE → LIVE PUSH" badge={{ text: '7 services', col: 'blue' }}>
      <N cx={70} cy={56} w={100} h={34} col="ink" label="CI/CD Webhook" lines={['every rollout']} seed={1} />
      <Ln x1={125} y1={56} x2={165} y2={56} col="blue" seed={1} pid="dpl" />
      <N cx={225} cy={56} w={100} h={34} col="blue" label="FastAPI" lines={['Socket.io']} seed={2} />
      <Ln x1={280} y1={56} x2={330} y2={56} col="vio" seed={2} label="KRaft" pid="dpl" />
      <N cx={410} cy={56} w={100} h={34} col="vio" label="Kafka" lines={['ordered events']} seed={3} />

      <Ln x1={370} y1={73} x2={260} y2={100} col="vio" seed={3} pid="dpl" />
      <N cx={225} cy={120} w={190} h={32} col="grn" label="Deployment State Machine" lines={['queued → running → done']} seed={4} />

      <Ln x1={155} y1={135} x2={95} y2={165} col="amb" seed={4} pid="dpl" />
      <Ln x1={295} y1={135} x2={355} y2={165} col="rose" seed={5} label="ONNX" pid="dpl" />
      <N cx={90} cy={182} w={130} h={32} col="amb" label="PostgreSQL" lines={['history']} seed={6} />
      <N cx={380} cy={182} w={150} h={32} col="rose" label="IsolationForest" lines={['anomaly by hour/day']} seed={7} />

      <Ln x1={225} y1={135} x2={225} y2={165} col="teal" seed={7} pid="dpl" />
      <N cx={225} cy={200} w={150} h={30} col="teal" label="React · 2s push" lines={['Prometheus + Grafana']} seed={8} />

      <Cap t="Slack anomaly alerts · self-hosted" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   17. PayGuard — streaming fraud detection.
   ══════════════════════════════════════════════════════════════════════════ */
export function PayGuardDiagram() {
  return (
    <Svg pid="pay" seed={17} title="PayGuard" subtitle="TXN → SIGNALS → SCORE, &lt;50MS" badge={{ text: '100% precision', col: 'amb' }}>
      <N cx={70} cy={56} w={110} h={34} col="ink" label="Transactions" lines={['txn_1047 · $184.00']} seed={1} />
      <Ln x1={125} y1={56} x2={165} y2={56} col="vio" seed={1} pid="pay" />
      <N cx={225} cy={56} w={90} h={34} col="vio" label="Kafka" lines={['aiokafka']} seed={2} />
      <Ln x1={270} y1={56} x2={310} y2={56} col="amb" seed={2} label="7 signals" pid="pay" />
      <N cx={390} cy={56} w={160} h={34} col="amb" label="Feature Engineering" lines={['velocity·geo·amount·hour']} seed={3} />

      <Ln x1={340} y1={73} x2={260} y2={100} col="rose" seed={3} pid="pay" />
      <N cx={225} cy={118} w={170} h={32} col="rose" label="ONNX IsolationForest" lines={['unsupervised, <50ms']} seed={4} />

      <Ln x1={140} y1={132} x2={90} y2={162} col="grn" seed={4} pid="pay" />
      <Ln x1={310} y1={132} x2={365} y2={162} col="teal" seed={5} pid="pay" />
      <N cx={85} cy={180} w={130} h={32} col="grn" label="PostgreSQL" lines={['audit trail']} seed={6} />
      <N cx={390} cy={180} w={150} h={32} col="teal" label="React + Recharts" lines={['WebSocket alerts']} seed={7} />

      <Cap t="5 fraud patterns · velocity · geo-impossible · round-structuring" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   18. PulseCore — multi-domain streaming anomaly detection.
   ══════════════════════════════════════════════════════════════════════════ */
export function PulseCoreDiagram() {
  return (
    <Svg pid="pls" seed={18} title="PulseCore" subtitle="3 DOMAINS → BUS → SIDECARS, &lt;200MS" badge={{ text: '12 containers', col: 'teal' }}>
      {['Infra', 'E-commerce', 'IoT'].map((n, i) => (
        <N key={i} cx={70} cy={44 + i * 40} w={110} h={30} col="ink" label={n} seed={1 + i} />
      ))}
      {[0, 1, 2].map(i => <Ln key={i} x1={125} y1={44 + i * 40} x2={165} y2={62} col="teal" seed={4 + i} pid="pls" />)}
      <N cx={230} cy={62} w={110} h={34} col="teal" label="Kafka" lines={['partitioned bus']} seed={7} />

      <Ln x1={285} y1={62} x2={325} y2={62} col="vio" seed={7} pid="pls" />
      <N cx={400} cy={62} w={130} h={34} col="vio" label="Async Consumer" lines={['persist + dispatch']} seed={8} />

      <Ln x1={370} y1={80} x2={280} y2={112} col="amb" seed={8} pid="pls" />
      <Ln x1={430} y1={80} x2={430} y2={112} col="rose" seed={9} pid="pls" />
      <N cx={240} cy={130} w={150} h={32} col="amb" label="MongoDB" lines={['3-node replica']} seed={9} />
      <N cx={430} cy={130} w={140} h={32} col="rose" label="ONNX Sidecars" lines={['3 domain models']} seed={10} />

      <Ln x1={430} y1={146} x2={340} y2={178} col="grn" seed={10} pid="pls" />
      <N cx={280} cy={196} w={210} h={30} col="grn" label="Next.js Dashboard" lines={['Framer Motion · Recharts']} seed={11} />

      <Cap t="emit to render <200ms · 12 Docker containers" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   19. NEURODRIVE — vanilla-JS canvas arcade racer.
   ══════════════════════════════════════════════════════════════════════════ */
export function NeuroDriveDiagram() {
  return (
    <Svg pid="ndr" seed={19} title="NEURODRIVE" subtitle="INPUT → GAME LOOP → CANVAS RENDER" badge={{ text: '60fps', col: 'mag' }}>
      <N cx={75} cy={58} w={110} h={34} col="ink" label="Input Layer" lines={['keys · touch/swipe']} seed={1} />
      <Ln x1={130} y1={58} x2={170} y2={58} col="mag" seed={1} pid="ndr" />
      <N cx={245} cy={58} w={140} h={34} col="mag" label="Game Loop" lines={['requestAnimationFrame']} seed={2} />
      <Ln x1={315} y1={58} x2={355} y2={58} col="teal" seed={2} pid="ndr" />
      <N cx={425} cy={58} w={100} h={34} col="teal" label="Canvas 2D" lines={['60fps']} seed={3} />

      <Ln x1={180} y1={75} x2={110} y2={106} col="grn" seed={3} pid="ndr" />
      <Ln x1={245} y1={75} x2={245} y2={106} col="grn" seed={4} pid="ndr" />
      <Ln x1={310} y1={75} x2={380} y2={106} col="grn" seed={5} pid="ndr" />
      <N cx={100} cy={124} w={120} h={30} col="grn" label="5-Lane System" lines={['88px lanes']} seed={6} />
      <N cx={245} cy={124} w={130} h={30} col="grn" label="Traffic Spawner" lines={['difficulty curve']} seed={7} />
      <N cx={395} cy={124} w={110} h={30} col="grn" label="AABB Collision" lines={['hit test']} seed={8} />

      <Ln x1={245} y1={139} x2={245} y2={168} col="amb" seed={9} pid="ndr" />
      <N cx={245} cy={186} w={230} h={30} col="amb" label="Neon Render Pipeline" lines={['glow · scroll · particles']} seed={10} />

      <Cap t="zero dependencies · vanilla JS · mobile safe-area" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   20. RouteDNA — real-time sorting facility platform.
   ══════════════════════════════════════════════════════════════════════════ */
export function RouteDNADiagram() {
  return (
    <Svg pid="rdna" seed={20} title="RouteDNA" subtitle="REAL-TIME PARCEL SORTING & ANOMALY DETECTION" badge={{ text: 'no LLM', col: 'rose' }}>
      <N cx={62} cy={66} w={96} h={42} col="amb" label="Station Sim" lines={['4 stations', 'scan_event']} seed={1} />
      <Ln x1={112} y1={66} x2={148} y2={66} col="teal" seed={1} label="gRPC" pid="rdna" />
      <N cx={196} cy={66} w={96} h={42} col="teal" label="gRPC Ingest" lines={[':50051', 'bidirectional']} seed={2} />
      <Ln x1={246} y1={66} x2={282} y2={66} col="vio" seed={2} label="async" pid="rdna" />
      <N cx={330} cy={66} w={96} h={42} col="vio" label="Kafka" lines={['scan-events', '6 partitions']} seed={3} />

      <Ln x1={300} y1={88} x2={232} y2={120} col="grn" seed={3} pid="rdna" />
      <Ln x1={360} y1={88} x2={410} y2={120} col="rose" seed={4} pid="rdna" />
      <N cx={215} cy={138} w={150} h={40} col="grn" label="Stuck Detector" lines={['PyFlink · event timers', '10min no-scan → alert']} seed={5} />
      <N cx={405} cy={138} w={130} h={40} col="rose" label="Journey Correlator" lines={['session windows', 'misroute detect']} seed={6} />

      <Ln x1={215} y1={158} x2={215} y2={188} col="amb" seed={7} label="alerts" pid="rdna" />
      <N cx={215} cy={206} w={190} h={30} col="amb" label="ClickHouse + Parquet" lines={['alerts · rollups · lake']} seed={8} />
      <Ln x1={405} y1={158} x2={405} y2={188} col="teal" seed={9} pid="rdna" />
      <N cx={405} cy={206} w={130} h={30} col="teal" label="React Ops UI" lines={['gRPC-Web · Envoy']} seed={10} />

      <Cap t="event-time streaming · fully deterministic · 9-service stack" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   21. RankAPI — two-stage recommendation ranking service.
   ══════════════════════════════════════════════════════════════════════════ */
export function RankAPIDiagram() {
  return (
    <Svg pid="rank" seed={21} title="RankAPI" subtitle="TWO-STAGE RANKING · SYNTHETIC GROUND TRUTH" badge={{ text: 'P@10 .773', col: 'gold' }}>
      <N cx={85} cy={66} w={130} h={42} col="gold" label="MySQL" lines={['users · items', 'true_prefs (hidden)']} seed={1} />
      <Ln x1={150} y1={66} x2={200} y2={66} col="teal" seed={1} label="query" pid="rank" />
      <N cx={275} cy={66} w={150} h={42} col="teal" label="FastAPI" lines={['GET /recommendations', '?userId&k=']} seed={2} />

      <Ln x1={230} y1={88} x2={150} y2={118} col="amb" seed={2} label="SQL filter" pid="rank" />
      <Ln x1={320} y1={88} x2={370} y2={118} col="blue" seed={3} label="SGD" pid="rank" />
      <N cx={140} cy={136} w={150} h={40} col="amb" label="Candidate Retrieval" lines={['broad SQL filter']} seed={4} />
      <N cx={390} cy={136} w={140} h={40} col="blue" label="Matrix Factorization" lines={['hand-rolled, no ML lib']} seed={5} />

      <Ln x1={390} y1={156} x2={390} y2={190} col="teal" seed={6} label="cache" pid="rank" />
      <N cx={390} cy={208} w={130} h={30} col="teal" label="Redis" lines={['5 min TTL']} seed={7} />
      <Ln x1={140} y1={156} x2={140} y2={190} col="gold" seed={8} pid="rank" />
      <N cx={140} cy={208} w={170} h={30} col="gold" label="React Live Demo" lines={['score bars · slider']} seed={9} />

      <Cap t="precision@10 0.773 · recall@10 0.255 · 300 seeded users" />
    </Svg>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   22. AgentOps — durable multi-tenant agent control plane.
   ══════════════════════════════════════════════════════════════════════════ */
export function AgentOpsDiagram() {
  return (
    <Svg pid="aops" seed={22} title="AgentOps" subtitle="DURABLE WORKFLOW CONTROL PLANE" badge={{ text: 'multi-tenant', col: 'vio' }}>
      <N cx={65} cy={56} w={100} h={34} col="ink" label="Next.js Console" seed={1} />
      <Ln x1={115} y1={56} x2={150} y2={56} col="vio" seed={1} pid="aops" />
      <N cx={210} cy={56} w={120} h={34} col="vio" label="FastAPI Control" lines={['tenants · auth']} seed={2} />
      <Ln x1={270} y1={56} x2={305} y2={56} col="blue" seed={2} pid="aops" />
      <N cx={385} cy={56} w={140} h={34} col="blue" label="Temporal Workflow" lines={['durable state machine']} seed={3} />

      <Ln x1={320} y1={73} x2={250} y2={100} col="amb" seed={3} pid="aops" />
      <Ln x1={385} y1={73} x2={385} y2={100} col="rose" seed={4} pid="aops" />
      <Ln x1={430} y1={73} x2={465} y2={100} col="teal" seed={5} pid="aops" />
      <N cx={185} cy={118} w={130} h={32} col="amb" label="Model Gateway" lines={['provider-neutral']} seed={6} />
      <N cx={330} cy={118} w={110} h={32} col="rose" label="Tool Sandbox" lines={['idempotent']} seed={7} />
      <N cx={445} cy={118} w={110} h={32} col="teal" label="Approval Queue" lines={['durable signal']} seed={8} />

      <Ln x1={330} y1={134} x2={250} y2={158} col="grn" seed={9} pid="aops" />
      <N cx={220} cy={176} w={130} h={30} col="grn" label="Evaluation Engine" lines={['rules + LLM judge']} seed={10} />

      <Ln x1={185} y1={134} x2={120} y2={158} col="gold" seed={11} pid="aops" />
      <N cx={95} cy={182} w={110} h={42} col="gold" label="PostgreSQL" lines={['tenants · runs', 'run_events']} seed={12} />

      <Ln x1={220} y1={191} x2={220} y2={210} col="vio" seed={13} pid="aops" />
      <N cx={280} cy={222} w={280} h={22} col="vio" label="queued → awaiting_approval → resumed" lines={[]} seed={14} />

      <Cap t="policy guardrails · human-in-the-loop · full audit trace" />
    </Svg>
  );
}
