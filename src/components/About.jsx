import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCode, FaGraduationCap, FaLaptopCode, FaRocket, FaLocationArrow } from 'react-icons/fa';

const experiencesData = [
  {
    title: "Software Engineering Intern",
    company: "KLA",
    period: "August 2025 – December 2025",
    location: "Milpitas, CA",
    description:
      "Worked to enhance more features in the website for better user experience and performance optimization.",
    skills: ["TypeScript", "Pandas", "NumPy", "Matplotlib", "Pytorch"],
    type: "Internship"
  },
  {
    title: "Software Engineering Intern",
    company: "KLA",
    period: "May 2025 – August 2025",
    location: "Austin, Texas",
    description:
      "Developed a React-based analytics platform for semiconductor etch process optimization, enabling engineers to visualize Design of Experiments (DoE) trials and perform rapid comparative analysis across fabrication runs. By integrating recipe metadata with CD-SEM imaging data, the tool automatically detected process variations and anomalies, significantly improving fabrication decision accuracy. The solution featured scalable NoSQL data models optimized for storing and querying custom semiconductor metrics, accelerating insight generation and supporting high-throughput chip design workflows.",
    skills: ["TypeScript", "React", "Node.js", "Python", "FASTAPI", "SQL", "Docker", "Kubernetes"],
    type: "Internship"
  },
  {
    title: "Software Engineering Intern",
    company: "Linde",
    period: "January 2024 – April 2024",
    location: "Vadodara, India",
    description:
      "Developed 'RAPPIT' on PowerApps to streamline IT service requests. Enhanced user accessibility and implemented real-time status tracking, ensuring efficient project folder management.",
    skills: ["PowerApps", "Power Platform", "Power Automate", "SharePoint"],
    type: "Internship"
  },
  {
    title: "Software Engineering Intern",
    company: "Schneider Electric (L&T E&A)",
    period: "May 2023 – June 2023",
    location: "Vadodara, India",
    description:
      "Built a Django-based web application, 'Manual Screen,' for managing and tracking test records associated with specific request numbers. Improved data accuracy and accessibility for operational efficiency.",
    skills: ["Django", "Python", "Web Development", "Database Management"],
    type: "Internship"
  },
  {
    title: "Software Engineering Intern",
    company: "Schneider Electric (L&T E&A)",
    period: "May 2022 – July 2022",
    location: "Vadodara, India",
    description:
      "Created 'STL,' a Django-based digital platform for managing I-Scheduling Test Labs records. Centralized test bench locations and scheduling for enhanced testing workflows.",
    skills: ["Django", "Python", "Database Design", "System Architecture"],
    type: "Internship"
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Experience = () => {
  return (
    <div id="experience" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(246,243,238,0.88)' }}>
      <div className="absolute inset-0 bg-neural-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow mb-4">// 04 — WHERE I'VE BEEN</p>
          <h2 className="text-4xl sm:text-5xl font-fraunces font-light tracking-tight text-photon mb-6">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg text-chip max-w-2xl mx-auto">
            My journey in technology — from Vadodara to Austin, building tools that ship and stay shipped.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-container">
          {/* The connecting line */}
          <div className="timeline-line"></div>

          <div className="space-y-12">
            {experiencesData.map((experience, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={itemVariants}
              >
                {/* Timeline node */}
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
                  style={{ top: '28px' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(246,243,238,0.95)',
                      border: '2px solid #0284c7',
                      boxShadow: '0 0 12px rgba(2,132,199,0.3)',
                    }}
                  >
                    <div className="w-3 h-3 rounded-full bg-electric animate-pulse"></div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`neural-card p-6 w-full md:w-5/12 ml-14 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  style={{ borderLeft: '2px solid rgba(108,212,255,0.2)' }}
                >
                  {/* Company header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.1), rgba(124,58,237,0.1))', border: '1px solid rgba(2,132,199,0.2)' }}
                    >
                      <FaBriefcase className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <h3 className="text-xl font-fraunces font-semibold text-photon">
                        {experience.company}
                      </h3>
                      <span
                        className="text-xs font-jetbrains uppercase tracking-widest"
                        style={{ color: '#0284c7', opacity: 0.8 }}
                      >
                        {experience.type}
                      </span>
                    </div>
                  </div>

                  {/* Role title */}
                  <h4 className="text-base font-semibold text-gradient mb-3 font-inter">
                    {experience.title}
                  </h4>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2 text-quantum">
                      <FaCalendarAlt className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-jetbrains text-xs">{experience.period}</span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-2 text-circuit">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-jetbrains text-xs">{experience.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(28,27,46,0.65)' }}>
                    {experience.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid rgba(28,27,46,0.08)' }}>
                    {experience.skills.map((skill, idx) => (
                      <span key={idx} className="tech-badge">
                        <FaCode className="w-2.5 h-2.5 text-electric" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="neural-card p-8" style={{ border: '1px solid rgba(28,27,46,0.08)' }}>
            <h3 className="text-2xl font-fraunces font-light text-gradient text-center mb-10">
              Education & Background
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(2,132,199,0.1)', border: '1px solid rgba(2,132,199,0.2)', animation: 'iconGlow 3s ease-in-out infinite' }}
                    whileHover={{ rotate: 8, scale: 1.12 }}
                  >
                    <FaGraduationCap size={20} style={{ color: '#0284c7' }} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-electric mb-1">Master's in Applied Data Intelligence</h4>
                    <p className="text-quantum text-sm">San Jose State University</p>
                    <p className="text-xs font-jetbrains" style={{ color: 'rgba(28,27,46,0.42)' }}>August 2024 – May 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                    whileHover={{ rotate: -8, scale: 1.12 }}
                  >
                    <FaLaptopCode size={20} style={{ color: '#7c3aed' }} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-electric mb-1">B.Tech — Computer Engineering</h4>
                    <p className="text-quantum text-sm">CHARUSAT University</p>
                    <p className="text-xs font-jetbrains" style={{ color: 'rgba(28,27,46,0.42)' }}>2020 – 2024</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(194,96,10,0.1)', border: '1px solid rgba(194,96,10,0.2)' }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <FaRocket size={18} style={{ color: '#c2600a' }} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-electric mb-1">Career Focus</h4>
                    <p className="text-quantum text-sm">Software / Data / ML Engineering</p>
                    <p className="text-xs font-jetbrains" style={{ color: 'rgba(28,27,46,0.42)' }}>Full-time · Summer 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(4,120,87,0.1)', border: '1px solid rgba(4,120,87,0.2)' }}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <FaLocationArrow size={18} style={{ color: '#047857' }} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-electric mb-1">Location</h4>
                    <p className="text-quantum text-sm">San Jose, CA</p>
                    <p className="text-xs font-jetbrains" style={{ color: 'rgba(28,27,46,0.42)' }}>Open to relocation · US-authorized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
