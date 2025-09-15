import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

const experiencesData = [
  {
    title: " Software Engineering Intern",
    company: "KLA",
    period: "August 2024 – Present",
    location: "Milpitas, CA",
    description:
      "Working to enhance more features in the website for better user experience and performance optimization",
      skills: ["TypeScript", "Pandas", "NumPy", "Matplotlib", "Pytorch"],
    type: "Internship"
  },
  {
    title: " Software Engineering Intern",
    company: "KLA",
    period: "May 2024 – August 2024",
    location: "Austin, Texas",
    description:
      "Developing a React-based analytics platform for semiconductor etch process optimization, enabling engineers to visualize Design of Experiments (DoE) trials and perform rapid comparative analysis across fabrication runs. By integrating recipe metadata with CD-SEM imaging data, the tool automatically detected process variations and anomalies, significantly improving fabrication decision accuracy. The solution featured scalable NoSQL data models optimized for storing and querying custom semiconductor metrics, accelerating insight generation and supporting high-throughput chip design workflows.",
    skills: ["TypeScript", "React", "Node.js", "Python", "FASTAPI", "SQL", "Docker", "Kubernetes", "Physics"],  
    type: "Internship"
  },
  {
    title: "Power Platform Developer Intern",
    company: "Linde",
    period: "January 2024 – April 2024",
    location: "Vadodara, India",
    description:
      "Developed 'RAPPIT' on PowerApps to streamline IT service requests. Enhanced user accessibility and implemented real-time status tracking, ensuring efficient project folder management.",
    skills: ["PowerApps", "Power Platform", "Power Automate", "SharePoint"],
    type: "Internship"
  },
  {
    title: "Full Stack Web Developer Intern",
    company: "Schneider Electric (L&T E&A)",
    period: "May 2023 – June 2023",
    location: "Vadodara, India",
    description:
      "Built a Django-based web application, 'Manual Screen,' for managing and tracking test records associated with specific request numbers. Improved data accuracy and accessibility for operational efficiency.",
    skills: ["Django", "Python", "Web Development", "Database Management"],
    type: "Internship"
  },
  {
    title: "Django Developer Intern",
    company: "Schneider Electric (L&T E&A)",
    period: "May 2022 – July 2022",
    location: "Vadodara, India",
    description:
      "Created 'STL,' a Django-based digital platform for managing I-Scheduling Test Labs records. Centralized test bench locations and scheduling for enhanced testing workflows.",
    skills: ["Django", "Python", "Database Design", "System Architecture"],
    type: "Internship"
  },
];

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div id="experience" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 bg-silicon">
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Professional <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-chip max-w-3xl mx-auto"
            variants={itemVariants}
          >
            My journey in technology and data analytics, from internships to developing 
            innovative solutions that drive business value.
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric via-quantum to-circuit"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiencesData.map((experience, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                variants={itemVariants}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 neural-card rounded-full border-2 border-electric flex items-center justify-center">
                  <div className="w-3 h-3 bg-electric rounded-full animate-pulse"></div>
                </div>

                {/* Content Card */}
                <div className={`neural-card p-6 w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                } hover:bg-white/90 transition-colors duration-300 group`}>
                  {/* Company and Type */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 neural-card rounded-lg flex items-center justify-center bg-gradient-to-br from-electric to-quantum">
                        <FaBriefcase className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-photon group-hover:text-electric transition-colors duration-300">
                        {experience.company}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 ml-12">
                      <span className="tech-badge bg-electric/10 text-electric">
                        {experience.type}
                      </span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h4 className="text-lg font-semibold text-gradient mb-4 ml-12">
                    {experience.title}
                  </h4>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 text-sm mb-6 ml-12">
                    <div className="flex items-center gap-2 text-quantum">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span className="font-medium">{experience.period}</span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-2 text-circuit">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span className="font-medium">{experience.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6 ml-12">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-photon leading-relaxed tracking-normal">
                        {experience.description.split('. ').map((sentence, idx, arr) => (
                          <span key={idx} className="block mb-2">
                            {sentence.trim()}.
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 ml-12 pt-4 border-t border-electric/10">
                    {experience.skills.map((skill, idx) => (
                      <motion.span 
                        key={idx}
                        className="tech-badge bg-white/50 hover:bg-white group/skill"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <FaCode className="w-3 h-3 inline-block mr-1.5 text-electric group-hover/skill:text-quantum transition-colors duration-300" />
                        <span className="font-medium">{skill}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Background */}
        <motion.div 
          className="mt-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="neural-card p-8">
            <motion.h3 
              className="text-2xl font-bold text-gradient text-center mb-8"
              variants={itemVariants}
            >
              Education & Background
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 neural-card flex items-center justify-center flex-shrink-0">
                    <span className="text-electric text-2xl">🎓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-electric">Master's in Applied Data Science</h4>
                    <p className="text-quantum">San Jose State University</p>
                    <p className="text-chip text-sm">August, 2024 - May, 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 neural-card flex items-center justify-center flex-shrink-0">
                    <span className="text-quantum text-2xl">💻</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-electric">Computer Engineering</h4>
                    <p className="text-quantum">CHARUSAT University</p>
                    <p className="text-chip text-sm">2020 - 2024</p>
                  </div>
                </div>
              </motion.div>

              {/* Career & Location */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 neural-card flex items-center justify-center flex-shrink-0">
                    <span className="text-circuit text-2xl">🚀</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-electric">Career Focus</h4>
                    <p className="text-quantum">Data Analytics & Full Stack</p>
                    <p className="text-chip text-sm">Full-time opportunities</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 neural-card flex items-center justify-center flex-shrink-0">
                    <span className="text-neural text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-electric">Location</h4>
                    <p className="text-quantum">San Jose, CA</p>
                    <p className="text-chip text-sm">Open to relocation</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
