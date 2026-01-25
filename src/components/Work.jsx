import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaEye, FaStar, FaCode, FaRocket } from 'react-icons/fa';
import { data } from '../data/data';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const projects = data;

  // Extract unique categories from projects
  const categories = ['all', ...new Set(projects.flatMap(project => project.skills))];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.skills.includes(activeFilter));

  return (
    <div id="work" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 bg-silicon">
      {/* Neural Grid Pattern */}
      <div className="absolute inset-0 bg-neural-grid opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-chip max-w-4xl mx-auto">
            Explore some of my projects showcasing my skills and expertise in data analytics, 
            web development, and machine learning. Each project demonstrates real-world problem-solving 
            and technical implementation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`neural-card px-6 py-3 transition-all duration-300 ${
                activeFilter === category 
                  ? 'bg-gradient-to-r from-electric to-quantum text-photon shadow-neon'
                  : 'text-chip hover:text-electric'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Projects' : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="neural-card overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-silicon/90 via-silicon/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 neural-card text-electric text-center py-2 px-4 flex items-center justify-center gap-2"
                        >
                          <FaCode size={16} />
                          <span className="text-sm font-medium">Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-electric to-quantum text-photon text-center py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                          <FaExternalLinkAlt size={16} />
                          <span className="text-sm font-medium">Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="neural-card px-3 py-1 text-xs font-medium text-electric">
                      {project.type || 'Project'}
                    </span>
                  </div>

                  {/* Primary Skill Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-electric to-quantum text-photon text-xs font-medium rounded-full">
                      {project.skills[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-electric mb-3 group-hover:text-gradient transition-colors duration-300">
                    {project.name}
                  </h3>
                  
                  <p className="text-chip text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="tech-badge"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="neural-card px-2 py-1 text-xs font-medium text-chip">
                        +{project.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-chip">
                    <div className="flex items-center gap-1">
                      <FaEye className="text-electric" size={14} />
                      <span>{project.views || '100+'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-circuit" size={14} />
                      <span>{project.stars || '5+'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="neural-card p-8 max-w-3xl mx-auto">
            <div className="w-16 h-16 neural-card mx-auto mb-6 flex items-center justify-center">
              <FaRocket className="text-electric" size={32} />
            </div>
            
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Ready to collaborate?
            </h3>
            
            <p className="text-chip mb-8">
              Let's discuss how I can help bring your ideas to life with data-driven solutions, 
              innovative web applications, or machine learning projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:prem.shah@sjsu.edu"
                className="quantum-button inline-flex items-center gap-2"
              >
                <FaRocket size={16} />
                Get In Touch
              </a>
              
              <a
                href="https://github.com/premshah06"
                target="_blank"
                rel="noopener noreferrer"
                className="circuit-link inline-flex items-center gap-2"
              >
                <FaGithub size={16} />
                View GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* Project Statistics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            {
              icon: <FaCode className="text-electric" size={24} />,
              number: "10+",
              label: "Total Projects",
              color: "text-electric"
            },
            {
              icon: <FaStar className="text-quantum" size={24} />,
              number: categories.length - 1,
              label: "Technologies",
              color: "text-quantum"
            },
            {
              icon: <FaEye className="text-circuit" size={24} />,
              number: "100+",
              label: "Views",
              color: "text-circuit"
            },
            {
              icon: <FaRocket className="text-neural" size={24} />,
              number: "98%",
              label: "Success Rate",
              color: "text-neural"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 neural-card mx-auto mb-4 flex items-center justify-center">
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-chip font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
