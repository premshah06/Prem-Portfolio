import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaHome, FaBriefcase, FaCode, FaProjectDiagram, FaCertificate, FaLinkedin, FaGithub, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import SITE from '../config/site';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const name = SITE.name;
  const email = SITE.email;
  const mailto = email ? `mailto:${email}` : '';
  const linkedinUrl = SITE.linkedinUrl;
  const githubUrl = SITE.githubUrl;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home',         label: 'Home',         icon: <FaHome className="w-3.5 h-3.5" /> },
    { name: 'experience',   label: 'Experience',   icon: <FaBriefcase className="w-3.5 h-3.5" /> },
    { name: 'skills',       label: 'Skills',       icon: <FaCode className="w-3.5 h-3.5" /> },
    { name: 'work',         label: 'Work',         icon: <FaProjectDiagram className="w-3.5 h-3.5" /> },
    { name: 'certificates', label: 'Certificates', icon: <FaCertificate className="w-3.5 h-3.5" /> },
  ];

  const socialLinks = [
    linkedinUrl ? { href: linkedinUrl, label: 'LinkedIn', icon: <FaLinkedin className="w-4 h-4" /> } : null,
    githubUrl   ? { href: githubUrl,   label: 'GitHub',   icon: <FaGithub className="w-4 h-4" /> }   : null,
    mailto      ? { href: mailto,      label: 'Email',    icon: <FaEnvelope className="w-4 h-4" /> }  : null,
  ].filter(Boolean);

  const navBg = scrolled
    ? 'rgba(246,243,238,0.92)'
    : 'transparent';

  const navBorder = scrolled
    ? '1px solid rgba(28,27,46,0.08)'
    : '1px solid transparent';

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300"
      style={{ background: navBg, borderBottom: navBorder, backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <motion.a
            href="#home"
            className="flex flex-col leading-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-fraunces text-base font-semibold text-photon tracking-tight">{name}</span>
            <span className="font-jetbrains text-xs" style={{ color: 'rgba(244,237,228,0.42)', letterSpacing: '0.08em' }}>↳ portfolio</span>
          </motion.a>

          {/* Desktop links */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={`#${item.name}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                style={{ color: 'rgba(28,27,46,0.62)', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                whileHover={reduceMotion ? {} : { scale: 1.03, y: -1 }}
                onMouseEnter={e => e.currentTarget.style.color = '#0284c7'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,27,46,0.62)'}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: index * 0.07 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-2 rounded-lg transition-all duration-200"
                style={{ color: 'rgba(28,27,46,0.55)', border: '1px solid rgba(28,27,46,0.1)' }}
                whileHover={reduceMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={reduceMotion ? {} : { scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.borderColor = 'rgba(2,132,199,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,27,46,0.55)'; e.currentTarget.style.borderColor = 'rgba(28,27,46,0.1)'; }}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setNav(!nav)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: 'rgba(28,27,46,0.65)' }}
            aria-label="Toggle menu"
          >
            {nav ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="px-4 pt-2 pb-6"
              style={{ background: 'rgba(246,243,238,0.97)', borderBottom: '1px solid rgba(28,27,46,0.08)' }}
            >
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.name}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
                  style={{ color: 'rgba(28,27,46,0.65)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}
                  onClick={() => setNav(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}

              <div className="flex gap-3 px-4 pt-4" style={{ borderTop: '1px solid rgba(28,27,46,0.08)', marginTop: '8px' }}>
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="p-2 rounded-lg"
                    style={{ color: '#6cd4ff', border: '1px solid rgba(108,212,255,0.2)' }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
