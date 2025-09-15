import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Database, Code, Cpu, ArrowRight } from 'lucide-react';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2 }
  };

  return (
    <div 
      id="home" 
      className="w-full min-h-screen h-screen relative flex items-stretch bg-silicon overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 144, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 144, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-quantum/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-circuit/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      
      <div className="w-full h-full flex flex-col lg:flex-row items-stretch relative z-10">
        {/* Left Section - Full width on mobile, 60% on desktop */}
        <motion.div 
          className="w-full lg:w-[60%] min-h-[60vh] lg:h-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="w-full max-w-3xl neural-card p-6 sm:p-8 lg:p-10 relative">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-l-2 border-electric/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-r-2 border-quantum/20 rounded-br-2xl" />

            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 neural-card"
              variants={slideIn}
            >
              <div className="relative">
                <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-electric rounded-full animate-ping" />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div className="space-y-4 lg:space-y-6 my-8 lg:my-12" variants={slideIn}>
              <p className="text-base lg:text-lg font-medium text-electric tracking-wide">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient leading-tight">
                Prem Shah
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold bg-gradient-to-r from-quantum to-circuit bg-clip-text text-transparent tracking-wide">
                SWE Intern at KLA | ML Enthusiast
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.div className="space-y-8 lg:space-y-10 my-8 lg:my-13" variants={fadeIn}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-electric via-quantum to-circuit opacity-20 blur rounded-xl" />
                <p className="relative text-base lg:text-lg text-photon leading-relaxed p-6 lg:p-8 neural-card">
                  Applied Data Intelligence Graduate Student at San Jose State University with a passion for AI/ML and 
                  full-stack development. I love building data-driven solutions that make a real impact.
                </p>
              </div>
              
              {/* Skills Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:mt-12">
                {[
                  {
                    title: "Data & AI",
                    icon: <Database />,
                    skills: ["Machine Learning", "Analytics", "LLMs", "Computer Vision"],
                    gradient: "from-electric to-quantum",
                    textColor: "text-electric"
                  },
                  {
                    title: "Development",
                    icon: <Code />,
                    skills: ["Full Stack", "Cloud Architecture", "MLOps", "System Design"],
                    gradient: "from-quantum to-circuit",
                    textColor: "text-quantum"
                  },
                  {
                    title: "Engineering",
                    icon: <Cpu />,
                    skills: ["Data Pipelines", "APIs", "Distributed Systems", "DevOps"],
                    gradient: "from-circuit to-neural",
                    textColor: "text-circuit"
                  }
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="neural-card relative overflow-hidden backdrop-blur-sm h-full">
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                           style={{ 
                             background: `linear-gradient(135deg, rgba(0, 144, 255, 0.1), rgba(123, 92, 214, 0.1), rgba(255, 149, 0, 0.1))`,
                             filter: 'blur(8px)'
                           }} 
                      />

                      {/* Content */}
                      <div className="relative z-10 p-6 lg:p-8">
                        {/* Icon */}
                        <div className={`w-12 h-12 lg:w-14 lg:h-14 neural-card rounded-xl bg-gradient-to-br ${skill.gradient} 
                                       flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 
                                       group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                          <div className="w-6 h-6 lg:w-7 lg:h-7 text-white">
                            {skill.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-base lg:text-lg font-bold ${skill.textColor} text-center mb-4 
                                      tracking-wide group-hover:scale-105 transition-transform duration-300`}>
                          {skill.title}
                        </h3>

                        {/* Skills List */}
                        <div className="space-y-3 flex flex-col items-start pl-6">
                          {skill.skills.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 w-full">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient} flex-shrink-0`} />
                              <span className="text-sm lg:text-base text-chip group-hover:text-photon transition-colors duration-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 lg:mt-12" variants={fadeIn}>
              <a 
                href="#work" 
                className="quantum-button inline-flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a 
                href="mailto:prem.shah@sjsu.edu" 
                className="circuit-link inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Full width on mobile, 40% on desktop */}
        <motion.div 
          className="w-full lg:w-[40%] min-h-[40vh] lg:h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-electric/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Visual */}
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative">
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-electric/30 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-4 rounded-full border border-quantum/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full border border-circuit/20 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Center Content */}
              <div className="absolute inset-16 neural-card rounded-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-4xl lg:text-6xl">🚀</div>
                  <div className="text-sm lg:text-base font-semibold text-electric">Building the Future</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 lg:gap-6 mt-8">
            <motion.a 
              href="https://github.com/premshah06" 
              className="tech-badge p-3 lg:p-4"
              whileHover={{ scale: 1.1, y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 lg:w-6 lg:h-6 text-photon group-hover:text-electric transition-colors duration-300" />
            </motion.a>
            
            <motion.a 
              href="https://www.linkedin.com/in/prem-shah-9a5076219/" 
              className="tech-badge p-3 lg:p-4"
              whileHover={{ scale: 1.1, y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 text-photon group-hover:text-quantum transition-colors duration-300" />
            </motion.a>
            
            <motion.a 
              href="mailto:prem.shah@sjsu.edu" 
              className="tech-badge p-3 lg:p-4"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-photon group-hover:text-circuit transition-colors duration-300" />
            </motion.a>
            
            <motion.a 
              href="/resume.pdf" 
              className="tech-badge p-3 lg:p-4"
              whileHover={{ scale: 1.1, y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-photon group-hover:text-electric transition-colors duration-300" />
            </motion.a>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="hidden lg:flex flex-col items-center space-y-2 mt-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs text-chip font-medium">Scroll to explore</div>
            <div className="w-px h-8 bg-gradient-to-b from-electric to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;