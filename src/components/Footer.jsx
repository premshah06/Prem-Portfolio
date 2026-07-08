import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaArrowUp } from 'react-icons/fa';
import SITE from '../config/site';

const Footer = () => {
  const reduceMotion = useReducedMotion();
  const name       = SITE.name       || 'Prem Shah';
  const email      = SITE.email;
  const mailto     = email ? `mailto:${email}` : '';
  const linkedinUrl = SITE.linkedinUrl;
  const githubUrl  = SITE.githubUrl;
  const role       = SITE.role;
  const location   = SITE.location;
  const school     = SITE.school;

  const socialLinks = [
    linkedinUrl ? { href: linkedinUrl, label: 'LinkedIn', icon: <FaLinkedin className="w-4 h-4" /> } : null,
    githubUrl   ? { href: githubUrl,   label: 'GitHub',   icon: <FaGithub   className="w-4 h-4" /> } : null,
    mailto      ? { href: mailto,      label: 'Email',    icon: <FaEnvelope className="w-4 h-4" /> } : null,
  ].filter(Boolean);

  const quickLinks = [
    { name: 'Home',         href: 'home'         },
    { name: 'Experience',   href: 'experience'   },
    { name: 'Skills',       href: 'skills'       },
    { name: 'Work',         href: 'work'         },
    { name: 'Certificates', href: 'certificates' },
  ];

  return (
    <footer style={{ background: 'rgba(246,243,238,0.92)', borderTop: '1px solid rgba(28,27,46,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base"
                style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.1), rgba(124,58,237,0.1))', border: '1px solid rgba(2,132,199,0.25)', color: '#0284c7' }}
              >
                PS
              </div>
              <div>
                <h3 className="font-fraunces font-semibold text-photon text-base">{name}</h3>
                <p className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.58)' }}>{role}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(28,27,46,0.45)' }}>
              Building data-driven systems at the intersection of applied ML and full-stack engineering.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{ color: 'rgba(28,27,46,0.55)', border: '1px solid rgba(28,27,46,0.08)' }}
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.borderColor = 'rgba(2,132,199,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,27,46,0.55)'; e.currentTarget.style.borderColor = 'rgba(28,27,46,0.08)'; }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-jetbrains text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(28,27,46,0.55)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.href}`}
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: 'rgba(28,27,46,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0284c7'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,27,46,0.45)'}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: '#0284c7', opacity: 0.5 }}></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-jetbrains text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(28,27,46,0.55)' }}>
              Get In Touch
            </h4>
            <div className="space-y-3">
              {mailto && (
                <a
                  href={mailto}
                  className="flex items-center gap-3 text-sm transition-colors duration-200"
                  style={{ color: 'rgba(28,27,46,0.55)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0284c7'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,27,46,0.55)'}
                >
                  <FaEnvelope className="w-4 h-4 flex-shrink-0 text-electric" />
                  <span className="truncate">{email}</span>
                </a>
              )}
              {location && (
                <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(28,27,46,0.55)' }}>
                  <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0 text-circuit" />
                  <span>{location}</span>
                </div>
              )}
              {school && (
                <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(28,27,46,0.55)' }}>
                  <FaGraduationCap className="w-4 h-4 flex-shrink-0 text-quantum" />
                  <span>{school}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-jetbrains text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(28,27,46,0.55)' }}>
              Status
            </h4>
            <div
              className="p-4 rounded-xl"
              style={{ background: 'rgba(4,120,87,0.06)', border: '1px solid rgba(4,120,87,0.18)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-neural animate-pulse"></div>
                <span className="font-jetbrains text-xs text-neural">Open to Work</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(28,27,46,0.45)' }}>
                Seeking full-time SWE / data / ML roles starting Summer 2026. Currently exploring opportunities in the Bay Area and remote positions globally. Let's connect!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(28,27,46,0.06)' }}
        >
          <p className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.45)' }}>
            © {new Date().getFullYear()} {name}. Built with React · Tailwind · Framer Motion.
          </p>
          <div className="flex items-center gap-2 font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.45)' }}>
            <span>San Jose, CA</span>
            <span>·</span>
            <span>Made with intention</span>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 z-50"
        style={{ background: 'rgba(2,132,199,0.1)', border: '1px solid rgba(2,132,199,0.25)', color: '#0284c7' }}
        whileHover={reduceMotion ? {} : { scale: 1.1, boxShadow: '0 0 20px rgba(2,132,199,0.3)' }}
        whileTap={reduceMotion ? {} : { scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
};

export default Footer;
