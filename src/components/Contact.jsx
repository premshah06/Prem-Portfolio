import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal, FaBook, FaBullseye, FaTimes, FaEye, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import cert1 from '../assests/cert1.jpg';
import cert2 from '../assests/cert2.jpg';
import cert3 from '../assests/cert.jpg';
import SITE from '../config/site';

const achievementStats = {
  secondRank: { icon: <FaTrophy className="w-5 h-5" />, label: "2nd Rank",           accent: '#0284c7', count: 2 },
  thirdRank:  { icon: <FaMedal  className="w-5 h-5" />, label: "3rd Rank",           accent: '#7c3aed', count: 1 },
  totalCerts: { icon: <FaBook   className="w-5 h-5" />, label: "Total Certificates", accent: '#c2600a', count: 3 },
  semesters:  { icon: <FaBullseye className="w-5 h-5" />, label: "Semesters",        accent: '#047857', count: 3 },
};

const certificatesData = [
  {
    title: "Certificate of Merit, CHARUSAT",
    description: "Certificate for achieving 2nd Rank in 1st Semester in the Computer Engineering department of DEPSTAR",
    rank: "2nd",
    image: cert1,
    year: "2020",
    category: "Academic Excellence",
  },
  {
    title: "Certificate of Merit, CHARUSAT",
    description: "Certificate for achieving 2nd Rank in 3rd Semester in the Computer Engineering department of DEPSTAR",
    rank: "2nd",
    image: cert2,
    year: "2021",
    category: "Academic Excellence",
  },
  {
    title: "Certificate of Merit, CHARUSAT",
    description: "Certificate for achieving 3rd Rank in 5th Semester in the Computer Engineering department of DEPSTAR",
    rank: "3rd",
    image: cert3,
    year: "2022",
    category: "Academic Excellence",
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const email       = SITE.email;
  const mailto      = email ? `mailto:${email}` : '';
  const linkedinUrl = SITE.linkedinUrl;

  return (
    <div
      id="certificates"
      className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: 'rgba(246,243,238,0.88)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(28,27,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,27,46,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow mb-4">// 06 — PROOF</p>
          <h2
            className="font-fraunces font-light text-photon tracking-tight mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em' }}
          >
            Awards & <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(28,27,46,0.55)' }}>
            Recognition of academic excellence throughout my undergraduate journey at CHARUSAT University.
          </p>
        </motion.div>

        {/* Certificates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-xl"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(28,27,46,0.08)', transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' }}
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedCert(cert)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(2,132,199,0.25)';
                e.currentTarget.style.boxShadow   = '0 0 28px rgba(2,132,199,0.08)';
                e.currentTarget.style.transform   = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(28,27,46,0.08)';
                e.currentTarget.style.boxShadow   = 'none';
                e.currentTarget.style.transform   = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                  style={{ transition: 'transform 0.5s ease' }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                >
                  <div
                    className="flex items-center gap-2 font-jetbrains text-xs px-4 py-2 rounded-full"
                    style={{ background: 'rgba(2,132,199,0.15)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.3)' }}
                  >
                    <FaEye size={12} /> View Certificate
                  </div>
                </div>

                {/* Rank badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-jetbrains font-semibold"
                  style={{ background: 'rgba(2,132,199,0.9)', color: '#ffffff' }}
                >
                  {cert.rank} Rank
                </div>

                {/* Category badge */}
                <div
                  className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-jetbrains"
                  style={{ background: 'rgba(246,243,238,0.9)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)', backdropFilter: 'blur(8px)' }}
                >
                  {cert.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-fraunces font-semibold text-photon mb-1" style={{ fontSize: '16px' }}>
                  {cert.title}
                </h3>
                <p className="font-jetbrains text-xs mb-3" style={{ color: '#0284c7' }}>{cert.year}</p>
                <p className="text-sm line-clamp-2" style={{ color: 'rgba(28,27,46,0.5)' }}>
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement summary */}
        <motion.div
          className="neural-card p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-fraunces font-light text-photon text-2xl mb-2">Achievement Summary</h3>
            <p className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.42)' }}>
              A snapshot of academic accomplishments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(achievementStats).map(([key, stat]) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${stat.accent}15`, border: `1px solid ${stat.accent}33`, color: stat.accent }}
                >
                  {stat.icon}
                </div>
                <div
                  className="font-fraunces font-light text-3xl mb-1"
                  style={{ color: stat.accent }}
                >
                  {stat.count}
                </div>
                <div className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.42)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
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
            className="neural-card p-8 max-w-2xl mx-auto"
            style={{ border: '1px solid rgba(28,27,46,0.08)' }}
          >
            <h3 className="font-fraunces font-light text-photon text-2xl mb-3">Ready to Connect?</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(28,27,46,0.55)', lineHeight: 1.8 }}>
              Always open to discussing new opportunities, collaborations, or just having a chat about technology and data.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {mailto && (
                <a
                  href={mailto}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-jetbrains font-medium transition-all"
                  style={{ background: '#7c3aed', color: '#ffffff' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#6d28d9'}
                  onMouseLeave={e => e.currentTarget.style.background = '#7c3aed'}
                >
                  <FaEnvelope className="w-4 h-4" />
                  Send Email
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-jetbrains transition-all"
                  style={{ color: '#0284c7', border: '1px solid rgba(2,132,199,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(2,132,199,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <FaLinkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(28,27,46,0.65)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.98)', border: '1px solid rgba(2,132,199,0.2)' }}
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto max-h-[55vh] object-contain rounded-t-2xl"
                style={{ background: '#f0ece4' }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-fraunces font-semibold text-photon text-xl">{selectedCert.title}</h3>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ color: 'rgba(28,27,46,0.42)', border: '1px solid rgba(28,27,46,0.08)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.borderColor = 'rgba(2,132,199,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,27,46,0.42)'; e.currentTarget.style.borderColor = 'rgba(28,27,46,0.08)'; }}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
                <div className="flex gap-3 mb-4 flex-wrap">
                  <span className="tech-badge"><FaTrophy className="w-3 h-3" /> {selectedCert.category}</span>
                  <span className="tech-badge"><FaBook className="w-3 h-3" /> {selectedCert.year}</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-jetbrains"
                    style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}
                  >
                    {selectedCert.rank} Rank
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(28,27,46,0.6)', lineHeight: 1.8 }}>
                  {selectedCert.description}
                </p>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-jetbrains transition-all"
                  style={{ color: '#0284c7', border: '1px solid rgba(2,132,199,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(2,132,199,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <FaTimes size={12} /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
