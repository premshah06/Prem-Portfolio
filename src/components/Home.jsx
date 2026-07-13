import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import SITE from '../config/site';

/* ── Animated counter ───────────────────────────────────────── */
function Counter({ to, suffix = '', duration = 1600 }) {
  const [val, setVal]   = useState(0);
  const ref             = useRef(null);
  const started         = useRef(false);
  const inView          = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick  = (now) => {
      const p     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Word-reveal variant ────────────────────────────────────── */
const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const wordChild = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const name        = SITE.name      || 'Prem Shah';
  const email       = SITE.email;
  const mailto      = email ? `mailto:${email}` : '';
  const githubUrl   = SITE.githubUrl;
  const linkedinUrl = SITE.linkedinUrl;

  /* ── Typewriter ─────────────────────────────────────────── */
  const fullText  = 'Prev — SWE Intern @ KLA · M.S. Applied Data Intelligence';
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setTyped(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(id);
      }, 32);
      return () => clearInterval(id);
    }, 900);
    return () => clearTimeout(delay);
  }, []);

  const socialLinks = [
    githubUrl   ? { href: githubUrl,   icon: <Github   className="w-5 h-5" />, label: 'GitHub'   } : null,
    linkedinUrl ? { href: linkedinUrl, icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' } : null,
    mailto      ? { href: mailto,      icon: <Mail     className="w-5 h-5" />, label: 'Email'    } : null,
  ].filter(Boolean);

  const pillars = [
    { label: 'Data & AI',       items: ['Machine Learning', 'LLMs / RAG', 'Analytics', 'Computer Vision'] },
    { label: 'Engineering',     items: ['Full Stack', 'Cloud / MLOps', 'System Design', 'APIs'] },
    { label: 'Data Pipelines',  items: ['ETL / ELT', 'Spark / Kafka', 'Snowflake', 'dbt'] },
  ];

  const nameWords = name.split(' ');

  return (
    <div
      id="home"
      className="w-full min-h-screen relative flex items-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(28,27,46,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,27,46,0.045) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Drifting glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(2,132,199,0.08)', filter: 'blur(80px)', animation: 'blobDrift1 18s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.07)', filter: 'blur(100px)', animation: 'blobDrift2 22s ease-in-out infinite' }} />
      <div className="absolute top-2/3 left-1/2 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'rgba(194,96,10,0.06)', filter: 'blur(70px)', animation: 'blobDrift1 26s ease-in-out infinite reverse' }} />

      {/* Background monogram */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-fraunces font-bold italic"
        style={{
          fontSize: 'clamp(120px, 22vw, 300px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(28,27,46,0.06)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          right: '4%',
        }}
      >
        P.S.
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <p className="section-eyebrow">// 01 — IDENTITY</p>
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full font-jetbrains text-xs"
                style={{ background: 'rgba(139,232,168,0.08)', border: '1px solid rgba(139,232,168,0.2)', color: '#8be8a8' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#8be8a8', animation: 'availDot 1.8s ease-in-out infinite' }}
                />
                Available
              </div>
            </div>

            <p className="text-sm font-jetbrains mb-2" style={{ color: '#0284c7', letterSpacing: '0.06em' }}>
              Hello, I'm
            </p>

            {/* Word-reveal name */}
            <h1
              className="font-fraunces font-light text-photon leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(48px, 7vw, 88px)', letterSpacing: '-0.03em' }}
            >
              <motion.span
                className="flex flex-wrap"
                variants={wordContainer}
                initial="hidden"
                animate="visible"
              >
                {nameWords.map((word, i) => (
                  <span
                    key={i}
                    style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.25em' }}
                  >
                    <motion.span style={{ display: 'inline-block' }} variants={wordChild}>
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h1>

            {/* Typewriter role */}
            <h2
              className="font-inter font-semibold mb-6 min-h-[1.6em]"
              style={{
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                background: 'linear-gradient(90deg, #7c3aed, #c2600a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {typed}
              <span
                className="inline-block w-0.5 h-[1em] ml-0.5 align-middle animate-pulse"
                style={{ background: '#7c3aed', verticalAlign: 'middle' }}
              />
            </h2>

            <motion.p
              className="text-base leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(28,27,46,0.72)', lineHeight: 1.8 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Graduate of San Jose State University building data-driven systems at the intersection
              of applied ML and full-stack engineering. I care about the work that ships and stays used.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <motion.a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
                style={{ background: '#1c1b2e', color: '#ffffff', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', letterSpacing: '0.08em' }}
                whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                onMouseEnter={e => e.currentTarget.style.background = '#2d2c40'}
                onMouseLeave={e => e.currentTarget.style.background = '#1c1b2e'}
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              {mailto && (
                <motion.a
                  href={mailto}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
                  style={{
                    background: 'transparent', color: '#1c1b2e',
                    border: '1px solid rgba(28,27,46,0.3)',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', letterSpacing: '0.08em',
                  }}
                  whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,27,46,0.06)'; e.currentTarget.style.borderColor = '#1c1b2e'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(28,27,46,0.3)'; }}
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </motion.a>
              )}
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.78 }}
            >
              {socialLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.target || '_blank'}
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-2.5 rounded-lg transition-all duration-200"
                  style={{ color: 'rgba(28,27,46,0.5)', border: '1px solid rgba(28,27,46,0.1)' }}
                  whileHover={reduceMotion ? {} : { scale: 1.1, y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.borderColor = 'rgba(2,132,199,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,27,46,0.5)'; e.currentTarget.style.borderColor = 'rgba(28,27,46,0.1)'; }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — pillar cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                className="neural-card p-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={reduceMotion ? {} : { scale: 1.02, y: -3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.2 + i * 0.1 }}
                style={{ borderLeft: `2px solid ${['#0284c7','#7c3aed','#c2600a'][i]}33`, willChange: 'transform' }}
              >
                <p
                  className="font-jetbrains text-xs mb-3 tracking-widest"
                  style={{ color: ['#0284c7','#7c3aed','#c2600a'][i] }}
                >
                  0{i + 1} — {pillar.label.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pillar.items.map((item, j) => (
                    <span key={j} className="tech-badge">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="hidden lg:flex flex-col items-center gap-2 mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-jetbrains text-xs tracking-widest" style={{ color: 'rgba(28,27,46,0.35)' }}>
            scroll
          </span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, #0284c7, transparent)' }} />
        </motion.div>
      </div>
    </div>
  );
}
