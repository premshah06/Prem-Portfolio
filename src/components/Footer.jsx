import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
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

  const quickLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Experience', href: 'experience' },
    { name: 'Skills', href: 'skills' },
    { name: 'Work', href: 'work' },
    { name: 'Certificates', href: 'certificates' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-silicon relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 neural-card rounded-xl flex items-center justify-center bg-gradient-to-br from-electric to-quantum">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-photon">Prem Shah</h3>
                <p className="text-sm text-chip">Applied Data Intelligence Graduate Student</p>
              </div>
            </div>
            
            <p className="text-chip text-sm leading-relaxed">
              A passionate developer and data analyst who loves crafting creative solutions 
              and deriving insights from complex datasets. Always eager to learn and contribute 
              to innovative projects.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={idx}
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

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-photon mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={`#${link.href}`}
                    className="text-chip hover:text-electric transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-electric"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-photon mb-4">Get In Touch</h4>
            <div className="space-y-4">
              <a 
                href="mailto:prem.shah@sjsu.edu"
                className="flex items-center gap-3 text-chip hover:text-electric transition-colors duration-300"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>prem.shah@sjsu.edu</span>
              </a>
              <div className="flex items-center gap-3 text-chip">
                <FaMapMarkerAlt className="w-5 h-5 text-circuit" />
                <span>San Jose, CA</span>
              </div>
              <div className="flex items-center gap-3 text-chip">
                <FaGraduationCap className="w-5 h-5 text-quantum" />
                <span>SJSU Applied Data Intelligence</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-photon mb-4">Stay Updated</h4>
            <p className="text-chip text-sm mb-4">
              Get notified about my latest projects and insights in data analytics.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 neural-card focus:ring-2 focus:ring-electric outline-none"
              />
              <button className="quantum-button w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-electric/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left space-y-2 sm:space-y-0">
              <span className="text-chip text-sm block sm:inline">© {new Date().getFullYear()} Prem Shah. All Rights Reserved.</span>
              <span className="text-chip text-sm block sm:inline sm:ml-4">Made with ❤️ in San Jose</span>
            </div>
            
            <div className="flex gap-6">
              <a href="/privacy" className="text-chip hover:text-electric text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="text-chip hover:text-electric text-sm transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-10 h-10 neural-card rounded-full flex items-center justify-center text-electric hover:text-quantum transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;