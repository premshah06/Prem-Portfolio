import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBriefcase, FaCode, FaProjectDiagram, FaCertificate, FaLinkedin, FaGithub, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => setNav(!nav);

  const navLinks = [
    { name: 'home', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    { name: 'experience', label: 'Experience', icon: <FaBriefcase className="w-4 h-4" /> },
    { name: 'skills', label: 'Skills', icon: <FaCode className="w-4 h-4" /> },
    { name: 'work', label: 'Work', icon: <FaProjectDiagram className="w-4 h-4" /> },
    { name: 'certificates', label: 'Certificates', icon: <FaCertificate className="w-4 h-4" /> }
  ];

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/prem-shah-9a5076219/',
      label: 'LinkedIn',
      icon: <FaLinkedin className="w-5 h-5" />
    },
    {
      href: 'https://github.com/premshah06',
      label: 'GitHub',
      icon: <FaGithub className="w-5 h-5" />
    },
    {
      href: 'mailto:prem.shah@sjsu.edu',
      label: 'Email',
      icon: <FaEnvelope className="w-5 h-5" />
    },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-electric to-quantum rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PS</span>
            </div>
            <span className="text-lg font-semibold text-photon">Prem Shah</span>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={`#${item.name}`}
                className="flex items-center gap-2 px-3 py-2 text-photon hover:text-electric transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links - Desktop */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
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
                className="tech-badge"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={handleClick}
              className="p-2 rounded-lg text-photon hover:text-electric transition-colors duration-300"
            >
              {nav ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-4 bg-white/90 backdrop-blur-md shadow-lg">
              {navLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name}`}
                  className="flex items-center gap-3 px-4 py-3 text-photon hover:text-electric hover:bg-electric/5 rounded-lg transition-colors duration-300"
                  onClick={handleClick}
                  whileHover={{ x: 10 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>
              ))}
              
              <div className="mt-4 flex gap-4 px-4 py-3 border-t border-electric/10">
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-badge"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.icon}
                  </motion.a>
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