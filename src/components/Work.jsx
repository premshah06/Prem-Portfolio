import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaTimes, FaStar } from 'react-icons/fa';
import { data } from '../data/data';
import SITE from '../config/site';

/* ── Type → filter-bucket mapping (derived from actual `type` values) ── */
const BUCKETS = {
  'AI & Agents':        ['Edge AI', 'AI DevOps', 'Full Stack AI', 'Multi-Agent AI', 'Agent Infrastructure'],
  'Data & Streaming':    ['Systems / DB', 'Streaming ML', 'Platform Engineering', 'Streaming Platform', 'Recommendation Systems', 'Data Analytics', 'Data Engineering', 'Analytics', 'Data Analysis'],
  'ML Apps':             ['AI Application', 'Computer Vision', 'ML / Healthcare'],
  'Mobile & Creative':   ['3D Web', 'Game / Creative', 'Mobile App', 'Security'],
};

const bucketForType = (type) => {
  for (const [bucket, types] of Object.entries(BUCKETS)) {
    if (types.includes(type)) return bucket;
  }
  return 'Mobile & Creative';
};

/* ── 3D tilt hook: pointer-driven rotateX/rotateY with spring smoothing ── */
function useTilt(reduceMotion, strength = 10) {
  const ref = useRef(null);
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springCfg = { stiffness: 260, damping: 26, mass: 0.6 };
  const sX = useSpring(mvX, springCfg);
  const sY = useSpring(mvY, springCfg);

  const rotateX = useTransform(sY, [0, 1], [strength, -strength]);
  const rotateY = useTransform(sX, [0, 1], [-strength, strength]);
  const shadowX = useTransform(sX, [0, 1], [-strength * 1.6, strength * 1.6]);
  const shadowY = useTransform(sY, [0, 1], [-strength * 1.2, strength * 1.6]);
  const glareX  = useTransform(sX, [0, 1], ['0%', '100%']);
  const glareY  = useTransform(sY, [0, 1], ['0%', '100%']);

  const onMouseMove = useCallback((e) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  }, [reduceMotion, mvX, mvY]);

  const onMouseLeave = useCallback(() => {
    mvX.set(0.5);
    mvY.set(0.5);
  }, [mvX, mvY]);

  return { ref, rotateX, rotateY, shadowX, shadowY, glareX, glareY, onMouseMove, onMouseLeave };
}

/* ── Project modal ───────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const accent = project.accent || '#6cd4ff';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(28,27,46,0.7)', backdropFilter: 'blur(24px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: `linear-gradient(160deg, ${accent}0d 0%, #ffffff 40%)`,
          border: `1px solid ${accent}33`,
          borderTop: `2px solid ${accent}77`,
          willChange: 'transform',
        }}
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl" style={{ background: '#eeeae2' }}>
          {project.diagram ? (
            (() => { const D = project.diagram; return <D />; })()
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(108,212,255,0.08), rgba(180,140,255,0.08))' }}
            >
              <FaCode size={72} style={{ color: accent, opacity: 0.2 }} />
            </div>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #ffffff 0%, transparent 55%)' }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.9)', color: 'rgba(28,27,46,0.65)', border: '1px solid rgba(28,27,46,0.1)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = `${accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,27,46,0.65)'; e.currentTarget.style.borderColor = 'rgba(28,27,46,0.1)'; }}
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            {project.type && (
              <span
                className="font-jetbrains text-xs px-3 py-1 rounded-full"
                style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}33` }}
              >
                {project.type}
              </span>
            )}
            {project.stars && (
              <span className="flex items-center gap-1 font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.45)' }}>
                <FaStar size={10} style={{ color: accent }} /> {project.stars}
              </span>
            )}
          </div>

          <h2 className="font-fraunces font-semibold text-photon mb-4" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em' }}>
            {project.name}
          </h2>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(28,27,46,0.72)', lineHeight: 1.9 }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-jetbrains"
                style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30`, fontSize: '12px' }}
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-5" style={{ borderTop: `1px solid ${accent}18` }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-jetbrains transition-all duration-200"
                style={{ color: accent, border: `1px solid ${accent}44` }}
                onMouseEnter={e => e.currentTarget.style.background = `${accent}10`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <FaGithub size={14} /> View Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-jetbrains font-semibold transition-all duration-200"
                style={{ background: accent, color: '#ffffff' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Word-by-word title reveal (mask-based, transform/opacity only) ─── */
function RevealTitle({ text, className, style, delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'flex', flexWrap: 'wrap', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.08em' }}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.05 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Featured "chapter" — full-bleed cinematic story panel ──────── */
function FeaturedChapter({ project, index, reduceMotion }) {
  const accent  = project.accent || '#6cd4ff';
  const flipped = index % 2 === 1;
  const tilt = useTilt(reduceMotion, 9);

  const sideVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden:  { opacity: 0, x: flipped ? 56 : -56, scale: 0.96 },
        visible: { opacity: 1, x: 0, scale: 1 },
      };
  const contentVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden:  { opacity: 0, x: flipped ? -32 : 32 },
        visible: { opacity: 1, x: 0 },
      };

  return (
    <motion.div
      className="relative grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      transition={{ staggerChildren: 0.14 }}
    >
      {/* Chapter index number, huge ghost type behind content */}
      <div
        aria-hidden="true"
        className="absolute -top-6 md:-top-10 select-none pointer-events-none font-fraunces"
        style={{
          [flipped ? 'right' : 'left']: 0,
          fontSize: 'clamp(80px, 14vw, 220px)',
          fontWeight: 300,
          color: `${accent}0f`,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        0{index + 1}
      </div>

      {/* Diagram side — 3D tilt panel */}
      <motion.div
        variants={sideVariants}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 ${flipped ? 'md:order-2' : 'md:order-1'}`}
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className="relative h-80 sm:h-96 md:h-[26rem] rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${accent}18 0%, #eeeae2 60%)`,
            border: `1px solid ${accent}33`,
            borderTop: `2px solid ${accent}99`,
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            boxShadow: reduceMotion
              ? `0 20px 60px ${accent}22`
              : undefined,
          }}
        >
          {/* layered shadow that shifts opposite the tilt to sell depth */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2rem] -z-10"
              style={{
                background: `radial-gradient(60% 60% at 50% 50%, ${accent}33, transparent 70%)`,
                x: tilt.shadowX,
                y: tilt.shadowY,
                filter: 'blur(24px)',
                willChange: 'transform',
              }}
            />
          )}

          {/* diagram content, pushed toward viewer in 3D space */}
          <div style={{ transform: reduceMotion ? undefined : 'translateZ(30px)', transformStyle: 'preserve-3d', width: '100%', height: '100%' }}>
            {project.diagram ? <project.diagram detailed={!reduceMotion} /> : (
              <div className="w-full h-full flex items-center justify-center">
                <FaCode size={64} style={{ color: accent, opacity: 0.25 }} />
              </div>
            )}
          </div>

          {/* glare sheen following cursor */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(220px circle at ${tilt.glareX} ${tilt.glareY}, rgba(255,255,255,0.16), transparent 60%)`,
              }}
            />
          )}

          {/* frame border glow accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ boxShadow: `inset 0 0 0 1px ${accent}22, inset 0 1px 0 ${accent}44` }}
          />
        </motion.div>
      </motion.div>

      {/* Content side */}
      <motion.div
        variants={contentVariants}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 ${flipped ? 'md:order-1' : 'md:order-2'}`}
      >
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className="font-jetbrains text-xs px-3 py-1 rounded-full uppercase tracking-widest"
            style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}33` }}
          >
            {project.type}
          </span>
          {project.stars && (
            <span className="flex items-center gap-1 font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.5)' }}>
              <FaStar size={10} style={{ color: accent }} /> {project.stars}
            </span>
          )}
        </div>

        <RevealTitle
          text={project.name}
          className="font-fraunces font-light text-photon tracking-tight mb-5"
          style={{ fontSize: 'clamp(30px, 3.8vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.06 }}
        />

        <motion.p
          className="text-sm leading-relaxed mb-6"
          style={{ color: 'rgba(28,27,46,0.7)', lineHeight: 1.9 }}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {project.description}
        </motion.p>

        {/* Metrics */}
        {project.metrics && (
          <motion.div
            className="grid grid-cols-3 gap-3 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          >
            {project.metrics.map((m, i) => (
              <motion.div
                key={i}
                className="rounded-xl p-3 text-center"
                style={{ background: `${accent}0c`, border: `1px solid ${accent}26` }}
                variants={reduceMotion
                  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                  : { hidden: { opacity: 0, y: 14, scale: 0.94 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-jetbrains font-semibold" style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', color: accent }}>
                  {m.value}
                </div>
                <div className="font-jetbrains uppercase tracking-wide mt-1" style={{ fontSize: '10px', color: 'rgba(28,27,46,0.5)' }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex flex-wrap gap-2 mb-7">
          {project.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-xs font-jetbrains"
              style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}
            >
              {skill}
            </span>
          ))}
        </div>

        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-jetbrains font-medium"
            style={{ background: accent, color: '#ffffff' }}
            whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
            whileTap={reduceMotion ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <FaGithub size={14} /> View Code
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Grid card with subtle 3D hover tilt ─────────────────────── */
function GridCard({ project, onSelect, reduceMotion, variants }) {
  const accent = project.accent || '#6cd4ff';
  const tilt = useTilt(reduceMotion, 6);

  return (
    <motion.div
      layout
      variants={variants}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group overflow-hidden rounded-xl cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => onSelect(project)}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        style={{
          background: `linear-gradient(160deg, ${accent}10 0%, rgba(255,255,255,0.96) 55%)`,
          border: `1px solid ${accent}22`,
          borderTop: `2px solid ${accent}66`,
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        whileHover={reduceMotion ? {} : { y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${accent}55`;
          e.currentTarget.style.boxShadow   = `0 20px 50px ${accent}22`;
        }}
        onMouseLeave={e => {
          tilt.onMouseLeave();
          e.currentTarget.style.borderColor = `${accent}22`;
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        {/* Architecture diagram thumbnail */}
        <div className="relative h-44 overflow-hidden" style={{ background: '#eeeae2' }}>
          {project.diagram ? <project.diagram detailed={false} /> : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(108,212,255,0.1), rgba(180,140,255,0.1))' }}
            >
              <FaCode className="text-electric opacity-30" size={48} />
            </div>
          )}

          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(135deg, ${accent}18, rgba(246,243,238,0.82))` }}
          >
            <span
              className="font-jetbrains text-xs px-4 py-2 rounded-full"
              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}55`, backdropFilter: 'blur(8px)' }}
            >
              Click to expand
            </span>
          </div>

          {project.type && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-jetbrains"
              style={{ background: 'rgba(246,243,238,0.9)', color: accent, border: `1px solid ${accent}44`, backdropFilter: 'blur(8px)' }}
            >
              {project.type}
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="p-5" style={{ transform: reduceMotion ? undefined : 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
          <h3
            className="font-fraunces font-semibold mb-2"
            style={{ fontSize: '17px', color: '#1c1b2e', letterSpacing: '-0.01em' }}
          >
            {project.name}
          </h3>

          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: 'rgba(28,27,46,0.58)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-jetbrains"
                style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-jetbrains"
                style={{ background: 'rgba(28,27,46,0.05)', color: 'rgba(28,27,46,0.45)' }}
              >
                +{project.skills.length - 3} more
              </span>
            )}
          </div>

          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: `1px solid ${accent}18` }}
          >
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-jetbrains transition-colors"
                style={{ color: 'rgba(28,27,46,0.45)' }}
                onMouseEnter={e => e.currentTarget.style.color = accent}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,27,46,0.45)'}
                onClick={e => e.stopPropagation()}
              >
                <FaGithub size={13} /> GitHub
              </a>
            ) : <span />}
            <span className="text-xs font-jetbrains" style={{ color: 'rgba(28,27,46,0.3)' }}>
              {project.stars ? `★ ${project.stars}` : '★ —'}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Work section ────────────────────────────────────────────── */
const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const reduceMotion = useReducedMotion();

  const email     = SITE.email;
  const mailto    = email ? `mailto:${email}` : '';
  const githubUrl = SITE.githubUrl;

  const featured  = data.filter(p => p.featured);
  const rest      = data.filter(p => !p.featured);

  const filters = ['All', ...Object.keys(BUCKETS)];

  const filtered = activeFilter === 'All'
    ? rest
    : rest.filter(p => bucketForType(p.type) === activeFilter);

  const gridContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const gridItem = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } };

  return (
    <>
      <div
        id="work"
        className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'rgba(246,243,238,0.88)' }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(28,27,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,27,46,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'rgba(124,58,237,0.04)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'rgba(2,132,199,0.04)', filter: 'blur(90px)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-eyebrow mb-4">// 05 — THE WORK</p>
            <h2
              className="font-fraunces font-light text-photon tracking-tight mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em' }}
            >
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(28,27,46,0.6)' }}>
              Multi-agent AI systems, streaming ML pipelines, and full-stack platforms — each built to solve a real problem.
            </p>
          </motion.div>

          {/* ── Featured tier: cinematic scroll story ──────────── */}
          <div className="mb-8">
            {featured.map((project, i) => (
              <React.Fragment key={project.id}>
                <FeaturedChapter project={project} index={i} reduceMotion={reduceMotion} />
                {i < featured.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-full max-w-md mx-auto"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(28,27,46,0.12), transparent)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ── All projects ─────────────────────────────────── */}
          <motion.div
            className="text-center mb-10 mt-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-eyebrow mb-3">// MORE BUILDS</p>
            <h3 className="font-fraunces font-light text-photon" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em' }}>
              All <span className="text-gradient">Projects</span>
            </h3>
          </motion.div>

          {/* Filter chips */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-jetbrains text-xs px-4 py-2 rounded-full"
                style={{
                  background: activeFilter === f ? '#1c1b2e' : 'rgba(28,27,46,0.05)',
                  color: activeFilter === f ? '#ffffff' : 'rgba(28,27,46,0.6)',
                  border: activeFilter === f ? '1px solid #1c1b2e' : '1px solid rgba(28,27,46,0.08)',
                  fontWeight: activeFilter === f ? 600 : 400,
                }}
                whileHover={reduceMotion ? {} : { scale: 1.05 }}
                whileTap={reduceMotion ? {} : { scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {f}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
            layout
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <GridCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                  reduceMotion={reduceMotion}
                  variants={gridItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-block p-8 rounded-2xl max-w-xl w-full text-left"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(28,27,46,0.08)' }}
            >
              <h3
                className="font-fraunces font-light text-photon mb-3"
                style={{ fontSize: '28px', letterSpacing: '-0.02em' }}
              >
                Ready to collaborate?
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(28,27,46,0.6)', lineHeight: 1.8 }}>
                Let's discuss data-driven solutions, ML systems, or full-stack projects.
              </p>
              <div className="flex flex-wrap gap-3">
                {mailto && (
                  <motion.a
                    href={mailto}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-jetbrains font-medium"
                    style={{ background: '#7c3aed', color: '#ffffff' }}
                    whileHover={reduceMotion ? {} : { scale: 1.03 }}
                    whileTap={reduceMotion ? {} : { scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    Get In Touch
                  </motion.a>
                )}
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-jetbrains"
                    style={{ color: '#0284c7', border: '1px solid rgba(2,132,199,0.25)' }}
                    whileHover={reduceMotion ? {} : { scale: 1.03 }}
                    whileTap={reduceMotion ? {} : { scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <FaGithub size={15} /> View GitHub
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Work;
