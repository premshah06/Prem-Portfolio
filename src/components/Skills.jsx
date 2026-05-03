import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaDatabase, FaCloud, FaTools, FaBrain, FaStream, FaChartBar,
  FaPython, FaReact, FaAws, FaDocker, FaGitAlt, FaNodeJs,
  FaCalendarAlt, FaBolt, FaRocket, FaLayerGroup
} from 'react-icons/fa';
import {
  SiApachespark, SiPostgresql, SiMongodb, SiKubernetes,
  SiPowerbi, SiSnowflake, SiApachekafka, SiJenkins
} from 'react-icons/si';

const Skills = () => {
  const [activeView, setActiveView] = useState('overview');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const coreCompetencies = [
    {
      title: "Data Engineering",
      icon: <FaStream className="text-3xl" />,
      skills: ["ETL Pipelines", "Apache Spark", "Kafka", "Snowflake"],
      proficiency: 80,
      accent: '#0284c7',
    },
    {
      title: "Machine Learning",
      icon: <FaBrain className="text-3xl" />,
      skills: ["Python", "Scikit-learn", "NLP", "LLMs"],
      proficiency: 75,
      accent: '#7c3aed',
    },
    {
      title: "Cloud & DevOps",
      icon: <FaCloud className="text-3xl" />,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      proficiency: 70,
      accent: '#c2600a',
    },
    {
      title: "Full-Stack Dev",
      icon: <FaCode className="text-3xl" />,
      skills: ["React", "Node.js", "SQL", "REST APIs"],
      proficiency: 90,
      accent: '#047857',
    },
  ];

  const techStack = {
    expert: {
      title: "Expert",
      accent: '#0284c7',
      techs: [
        { name: "Python",     icon: <FaPython />,   years: "5+" },
        { name: "SQL",        icon: <FaDatabase />, years: "5+" },
        { name: "JavaScript", icon: <FaNodeJs />,   years: "4+" },
        { name: "React",      icon: <FaReact />,    years: "3+" },
        { name: "PowerBI",    icon: <SiPowerbi />,  years: "3+" },
        { name: "Git",        icon: <FaGitAlt />,   years: "5+" },
      ],
    },
    proficient: {
      title: "Proficient",
      accent: '#7c3aed',
      techs: [
        { name: "AWS",        icon: <FaAws />,          years: "3+" },
        { name: "Docker",     icon: <FaDocker />,       years: "2+" },
        { name: "Spark",      icon: <SiApachespark />,  years: "2+" },
        { name: "Kafka",      icon: <SiApachekafka />,  years: "1+" },
        { name: "PostgreSQL", icon: <SiPostgresql />,   years: "2+" },
        { name: "MongoDB",    icon: <SiMongodb />,      years: "2+" },
      ],
    },
    learning: {
      title: "Expanding",
      accent: '#c2600a',
      techs: [
        { name: "Kubernetes", icon: <SiKubernetes />, years: "1+" },
        { name: "Terraform",  icon: <FaCloud />,      years: "1+" },
        { name: "Jenkins",    icon: <SiJenkins />,    years: "1+" },
        { name: "GCP",        icon: <FaCloud />,      years: "<1" },
        { name: "Snowflake",  icon: <SiSnowflake />,  years: "1+" },
        { name: "LLMs",       icon: <FaBrain />,      years: "1+" },
      ],
    },
  };

  const skillsMatrix = {
    "Data & Analytics": {
      icon: <FaChartBar />,
      skills: [
        { name: "ETL Pipelines",       level: 4 },
        { name: "Data Modeling",        level: 4 },
        { name: "Data Visualization",   level: 5 },
        { name: "Statistical Analysis", level: 4 },
        { name: "A/B Testing",          level: 3 },
      ],
    },
    "Engineering": {
      icon: <FaCode />,
      skills: [
        { name: "System Design",            level: 3 },
        { name: "API Development",          level: 5 },
        { name: "Database Design",          level: 4 },
        { name: "Performance Optimization", level: 4 },
        { name: "Code Review",              level: 4 },
      ],
    },
    "AI/ML": {
      icon: <FaBrain />,
      skills: [
        { name: "Model Development", level: 4 },
        { name: "Feature Engineering", level: 4 },
        { name: "Model Deployment",   level: 3 },
        { name: "NLP",                level: 3 },
        { name: "Deep Learning",      level: 3 },
      ],
    },
    "Business": {
      icon: <FaTools />,
      skills: [
        { name: "Stakeholder Management",   level: 4 },
        { name: "Technical Documentation",  level: 5 },
        { name: "Agile/Scrum",             level: 4 },
        { name: "Problem Solving",          level: 5 },
        { name: "Cross-team Collaboration", level: 5 },
      ],
    },
  };

  const quickStats = [
    { label: "Years of Experience",    value: "1+",  Icon: FaCalendarAlt, accent: '#0284c7' },
    { label: "Technologies Mastered",  value: "20+", Icon: FaBolt,        accent: '#7c3aed' },
    { label: "Production Deployments", value: "10+", Icon: FaRocket,      accent: '#c2600a' },
    { label: "Data Processed",         value: "GB+", Icon: FaLayerGroup,  accent: '#047857' },
  ];

  const levelLabel = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div
      id="skills"
      className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow mb-4">// 03 — WHAT I KNOW</p>
          <h2
            className="font-fraunces font-light text-photon tracking-tight mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em' }}
          >
            Technical <span className="text-gradient">Expertise</span>
          </h2>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="neural-card p-5 text-center min-w-[130px]"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${stat.accent}15`, border: `1px solid ${stat.accent}33`, color: stat.accent }}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  animate={{ boxShadow: ['0 0 0px rgba(0,0,0,0)', `0 0 14px ${stat.accent}44`, '0 0 0px rgba(0,0,0,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                >
                  <stat.Icon size={16} />
                </motion.div>
                <div
                  className="font-fraunces font-light text-2xl mb-1"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.42)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center gap-3 mb-12">
          {['overview', 'detailed', 'matrix'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="px-5 py-2 rounded-lg font-jetbrains text-xs transition-all duration-200"
              style={{
                background: activeView === view ? '#1c1b2e' : 'rgba(28,27,46,0.05)',
                color: activeView === view ? '#ffffff' : 'rgba(28,27,46,0.55)',
                border: activeView === view ? '1px solid #1c1b2e' : '1px solid rgba(28,27,46,0.08)',
                fontWeight: activeView === view ? 600 : 400,
              }}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} View
            </button>
          ))}
        </div>

        {/* Overview — Core Competencies */}
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {coreCompetencies.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onHoverStart={() => setHoveredCategory(index)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="neural-card p-6"
                style={{ borderLeft: `2px solid ${cat.accent}33` }}
              >
                <div className="mb-4" style={{ color: cat.accent }}>
                  {cat.icon}
                </div>
                <h3 className="font-fraunces font-semibold text-photon text-lg mb-3">{cat.title}</h3>

                {/* Proficiency bar */}
                <div className="mb-4">
                  <div className="flex justify-between font-jetbrains text-xs mb-1"
                    style={{ color: 'rgba(28,27,46,0.42)' }}>
                    <span>Proficiency</span>
                    <span>{cat.proficiency}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(28,27,46,0.08)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: cat.accent }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  {cat.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="font-jetbrains text-xs flex items-center gap-2"
                      style={{ color: hoveredCategory === index ? '#1c1b2e' : 'rgba(28,27,46,0.55)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: cat.accent }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Detailed — Tech Stack by Proficiency */}
        {activeView === 'detailed' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {Object.entries(techStack).map(([level, cat], catIdx) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catIdx * 0.15 }}
                className="neural-card p-6"
                style={{ borderLeft: `3px solid ${cat.accent}` }}
              >
                <h3 className="font-fraunces font-semibold text-photon text-xl mb-5 flex items-center gap-3">
                  <span style={{ color: cat.accent }}>{cat.title}</span>
                  <span className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.35)' }}>
                    {cat.techs.length} technologies
                  </span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {cat.techs.map((tech, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-xl text-center transition-all duration-200"
                      style={{ background: 'rgba(28,27,46,0.04)', border: '1px solid rgba(28,27,46,0.08)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${cat.accent}44`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(28,27,46,0.08)'; }}
                    >
                      <div className="text-xl mb-2" style={{ color: cat.accent }}>{tech.icon}</div>
                      <div className="font-jetbrains text-xs text-photon mb-1">{tech.name}</div>
                      <div className="font-jetbrains text-xs" style={{ color: 'rgba(28,27,46,0.35)' }}>{tech.years}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Matrix — Skills by Category */}
        {activeView === 'matrix' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {Object.entries(skillsMatrix).map(([category, data], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="neural-card p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-xl" style={{ color: '#0284c7' }}>{data.icon}</div>
                  <h3 className="font-fraunces font-semibold text-photon text-lg">{category}</h3>
                </div>

                <div className="space-y-4">
                  {data.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-jetbrains text-xs text-photon">{skill.name}</span>
                        <span
                          className="font-jetbrains text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}
                        >
                          {levelLabel[skill.level - 1]}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 flex-1 rounded-full transition-all duration-300"
                            style={{
                              background: i < skill.level
                                ? 'linear-gradient(90deg, #0284c7, #7c3aed)'
                                : 'rgba(28,27,46,0.08)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Skills;
