import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaTimes, FaStar } from 'react-icons/fa';
import { data } from '../data/data';
import SITE from '../config/site';

/* ── Type → filter-bucket mapping (derived from actual `type` values) ── */
const BUCKETS = {
  'AI & Agents':        ['Edge AI', 'AI DevOps', 'Full Stack AI', 'Multi-Agent AI'],
  'Data & Streaming':    ['Systems / DB', 'Streaming ML', 'Platform Engineering', 'Data Analytics', 'Data Engineering', 'Analytics', 'Data Analysis'],
  'ML Apps':             ['AI Application', 'Computer Vision', 'ML / Healthcare'],
  'Mobile & Creative':   ['3D Web', 'Game / Creative', 'Mobile App', 'Security'],
};

const bucketForType = (type) => {
  for (const [bucket, types] of Object.entries(BUCKETS)) {
    if (types.includes(type)) return bucket;
  }
  return 'Mobile & Creative';
};

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

/* ── Featured project card ───────────────────────────────────── */
function FeaturedCard({ project, index, reduceMotion }) {
  const accent  = project.accent || '#6cd4ff';
  const flipped = index % 2 === 1;

  const sideVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden:  { opacity: 0, x: flipped ? 40 : -40 },
        visible: { opacity: 1, x: 0 },
      };
  const contentVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden:  { opacity: 0, x: flipped ? -40 : 40 },
        visible: { opacity: 1, x: 0 },
      };

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center mb-24 last:mb-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: 0.12 }}
    >
      {/* Diagram side */}
      <motion.div
        variants={sideVariants}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={flipped ? 'md:order-2' : 'md:order-1'}
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div
          className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${accent}14 0%, #eeeae2 60%)`,
            border: `1px solid ${accent}33`,
            borderTop: `2px solid ${accent}88`,
            boxShadow: `0 20px 60px ${accent}1a`,
          }}
          whileHover={reduceMotion ? {} : { y: -6 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
          {project.diagram ? <project.diagram /> : (
            <div className="w-full h-full flex items-center justify-center">
              <FaCode size={64} style={{ color: accent, opacity: 0.25 }} />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Content side */}
      <motion.div
        variants={contentVariants}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={flipped ? 'md:order-1' : 'md:order-2'}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
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

        <h3
          className="font-fraunces font-light text-photon tracking-tight mb-4"
          style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-0.02em' }}
        >
          {project.name}
        </h3>

        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(28,27,46,0.7)', lineHeight: 1.9 }}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-xl p-3 text-center"
                style={{ background: `${accent}0c`, border: `1px solid ${accent}26` }}
              >
                <div className="font-jetbrains font-semibold" style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', color: accent }}>
                  {m.value}
                </div>
                <div className="font-jetbrains uppercase tracking-wide mt-1" style={{ fontSize: '10px', color: 'rgba(28,27,46,0.5)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
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
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
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
        className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8"
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

          {/* ── Featured tier ─────────────────────────────────── */}
          <div className="mb-24">
            {featured.map((project, i) => (
              <FeaturedCard key={project.id} project={project} index={i} reduceMotion={reduceMotion} />
            ))}
          </div>

          {/* ── All projects ─────────────────────────────────── */}
          <motion.div
            className="text-center mb-10"
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
              {filtered.map((project) => {
                const accent = project.accent || '#6cd4ff';
                return (
                <motion.div
                  key={project.id}
                  layout
                  variants={gridItem}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduceMotion ? {} : { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                  className="group overflow-hidden rounded-xl cursor-pointer"
                  style={{
                    background: `linear-gradient(160deg, ${accent}10 0%, rgba(255,255,255,0.96) 55%)`,
                    border: `1px solid ${accent}22`,
                    borderTop: `2px solid ${accent}66`,
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    willChange: 'transform',
                  }}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${accent}55`;
                    e.currentTarget.style.boxShadow   = `0 8px 40px ${accent}18`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${accent}22`;
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  {/* Architecture diagram thumbnail */}
                  <div className="relative h-44 overflow-hidden" style={{ background: '#eeeae2' }}>
                    {project.diagram ? <project.diagram /> : (
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
                  <div className="p-5">
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
                );
              })}
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
