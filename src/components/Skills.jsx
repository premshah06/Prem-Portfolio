import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, FaDatabase, FaCloud, FaTools, FaBrain, FaStream, FaChartBar,
  FaPython, FaReact, FaAws, FaDocker, FaGitAlt, FaNodeJs
} from 'react-icons/fa';
import { 
  SiApachespark, SiPostgresql, SiMongodb, SiKubernetes,
  SiPowerbi, SiSnowflake, SiApachekafka, SiJenkins
} from 'react-icons/si';

const Skills = () => {
  const [activeView, setActiveView] = useState('overview');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Core Competencies for quick scanning
  const coreCompetencies = [
    { 
      title: "Data Engineering", 
      icon: <FaStream className="text-3xl" />,
      skills: ["ETL Pipelines", "Apache Spark", "Kafka", "Snowflake"],
      proficiency: 80,
      color: "from-electric to-quantum"
    },
    { 
      title: "Machine Learning", 
      icon: <FaBrain className="text-3xl" />,
      skills: ["Python", "Scikit-learn", "NLP", "LLMs"],
      proficiency: 75,
      color: "from-quantum to-circuit"
    },
    { 
      title: "Cloud & DevOps", 
      icon: <FaCloud className="text-3xl" />,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      proficiency: 70,
      color: "from-circuit to-neural"
    },
    { 
      title: "Full-Stack Dev", 
      icon: <FaCode className="text-3xl" />,
      skills: ["React", "Node.js", "SQL", "REST APIs"],
      proficiency: 90,
      color: "from-neural to-electric"
    }
  ];

  // Tech Stack organized by proficiency
  const techStack = {
    expert: {
      title: "Expert",
      color: "border-electric bg-electric/5",
      techs: [
        { name: "Python", icon: <FaPython />, years: "5+" },
        { name: "SQL", icon: <FaDatabase />, years: "5+" },
        { name: "JavaScript", icon: <FaNodeJs />, years: "4+" },
        { name: "React", icon: <FaReact />, years: "3+" },
        { name: "PowerBI", icon: <SiPowerbi />, years: "3+" },
        { name: "Git", icon: <FaGitAlt />, years: "5+" }
      ]
    },
    proficient: {
      title: "Proficient",
      color: "border-quantum bg-quantum/5",
      techs: [
        { name: "AWS", icon: <FaAws />, years: "3+" },
        { name: "Docker", icon: <FaDocker />, years: "2+" },
        { name: "Spark", icon: <SiApachespark />, years: "2+" },
        { name: "Kafka", icon: <SiApachekafka />, years: "1+" },
        { name: "PostgreSQL", icon: <SiPostgresql />, years: "2+" },
        { name: "MongoDB", icon: <SiMongodb />, years: "2+" }
      ]
    },
    learning: {
      title: "Expanding",
      color: "border-circuit bg-circuit/5",
      techs: [
        { name: "Kubernetes", icon: <SiKubernetes />, years: "1+" },
        { name: "Terraform", icon: <FaCloud />, years: "1+" },
        { name: "Jenkins", icon: <SiJenkins />, years: "1+" },
        { name: "GCP", icon: <FaCloud />, years: "<1" },
        { name: "Snowflake", icon: <SiSnowflake />, years: "1+" },
        { name: "LLMs", icon: <FaBrain />, years: "1+" }
      ]
    }
  };

  // Industry-Relevant Skills Matrix
  const skillsMatrix = {
    "Data & Analytics": {
      icon: <FaChartBar />,
      skills: [
        { name: "ETL Pipelines", level: 4 },
        { name: "Data Modeling", level: 4 },
        { name: "Data Visualization", level: 5 },
        { name: "Statistical Analysis", level: 4 },
        { name: "A/B Testing", level: 3 }
      ]
    },
    "Engineering": {
      icon: <FaCode />,
      skills: [
        { name: "System Design", level: 3 },
        { name: "API Development", level: 5 },
        { name: "Database Design", level: 4 },
        { name: "Performance Optimization", level: 4 },
        { name: "Code Review", level: 4 }
      ]
    },
    "AI/ML": {
      icon: <FaBrain />,
      skills: [
        { name: "Model Development", level: 4 },
        { name: "Feature Engineering", level: 4 },
        { name: "Model Deployment", level: 3 },
        { name: "NLP", level: 3 },
        { name: "Deep Learning", level: 3 }
      ]
    },
    "Business": {
      icon: <FaTools />,
      skills: [
        { name: "Stakeholder Management", level: 4 },
        { name: "Technical Documentation", level: 5 },
        { name: "Agile/Scrum", level: 4 },
        { name: "Problem Solving", level: 5 },
        { name: "Cross-team Collaboration", level: 5 }
      ]
    }
  };

  // Quick Stats for recruiters
  const quickStats = [
    { label: "Years of Experience", value: "1+", icon: "📅" },
    { label: "Technologies Mastered", value: "20+", icon: "⚡" },
    { label: "Production Deployments", value: "10+", icon: "🚀" },
    { label: "Data Processed", value: "GB+", icon: "📊" }
  ];

  return (
    <div className="min-h-screen bg-silicon py-20 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-neural-grid opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header with Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-photon mb-4">
            Technical <span className="bg-gradient-to-r from-electric to-quantum bg-clip-text text-transparent">Expertise</span>
          </h2>
          
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 mb-12">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="neural-card p-6 text-center"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-photon bg-gradient-to-r from-electric to-quantum bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-chip">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          {['overview', 'detailed', 'matrix'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeView === view 
                  ? 'quantum-button' 
                  : 'neural-card hover:bg-white/90 text-photon'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} View
            </button>
          ))}
        </div>

        {/* Overview View - Core Competencies */}
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {coreCompetencies.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredCategory(index)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="neural-card p-6 group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-photon mb-2">{category.title}</h3>
                  
                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-chip mb-1">
                      <span>Proficiency</span>
                      <span>{category.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                  
                  {/* Key Skills */}
                  <div className="space-y-1">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: hoveredCategory === index ? 1 : 0.8, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-sm text-photon flex items-center gap-2"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}></span>
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Detailed View - Tech Stack by Proficiency */}
        {activeView === 'detailed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {Object.entries(techStack).map(([level, category], categoryIndex) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
                className={`neural-card p-6 border-l-4 ${category.color}`}
              >
                <h3 className="text-2xl font-bold text-photon mb-6 flex items-center gap-3">
                  {category.title}
                  <span className="text-sm font-normal text-chip">
                    ({category.techs.length} technologies)
                  </span>
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {category.techs.map((tech, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="neural-card p-4 text-center group hover:bg-white/90"
                    >
                      <div className="text-2xl mb-2 text-electric group-hover:text-quantum transition-colors duration-300">
                        {tech.icon}
                      </div>
                      <div className="text-sm font-medium text-photon">{tech.name}</div>
                      <div className="text-xs text-chip mt-1">{tech.years}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Matrix View - Skills by Category */}
        {activeView === 'matrix' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {Object.entries(skillsMatrix).map(([category, data], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="neural-card p-6 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl text-electric group-hover:text-quantum transition-colors duration-300">
                    {data.icon}
                  </div>
                  <h3 className="text-xl font-bold text-photon">{category}</h3>
                </div>
                
                <div className="space-y-4">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-photon">{skill.name}</span>
                          <span className="text-xs text-chip bg-white/50 px-2 py-1 rounded-full">
                            {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                i < skill.level 
                                  ? 'bg-gradient-to-r from-electric to-quantum' 
                                  : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
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