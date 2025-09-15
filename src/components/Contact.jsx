import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal, FaBook, FaBullseye, FaDownload, FaTimes, FaEye, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import cert1 from '../assests/cert1.jpg';
import cert2 from '../assests/cert2.jpg';
import cert3 from '../assests/cert.jpg';

const achievementStats = {
  secondRank: {
    icon: <FaTrophy className="w-6 h-6" />,
    label: "2nd Rank",
    color: "text-electric",
    count: 2
  },
  thirdRank: {
    icon: <FaMedal className="w-6 h-6" />,
    label: "3rd Rank",
    color: "text-quantum",
    count: 1
  },
  totalCerts: {
    icon: <FaBook className="w-6 h-6" />,
    label: "Total Certificates",
    color: "text-circuit",
    count: 3
  },
  semesters: {
    icon: <FaBullseye className="w-6 h-6" />,
    label: "Semesters",
    color: "text-neural",
    count: 3
  }
};

const certificatesData = [
  {
    title: "Certificate of Merit, CHARUSAT",
    description:
      "Certificate for achieving 2nd Rank in 1st Semester in the Computer Engineering department of DEPSTAR",
    rank: "2nd",
    image: cert1,
    year: "2020",
    category: "Academic Excellence"
  },
  {
    title: "Certificate of Merit, CHARUSAT",
    description:
      "Certificate for achieving 2nd Rank in 3rd Semester in the Computer Engineering department of DEPSTAR",
    rank: "2nd",
    image: cert2,
    year: "2021",
    category: "Academic Excellence"
  },
  {
    title: "Certificate of Merit, CHARUSAT",
    description:
      "Certificate for achieving 3rd Rank in 5th Semester in the Computer Engineering department of DEPSTAR",
    rank: "3rd",
    image: cert3,
    year: "2022",
    category: "Academic Excellence"
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <div id="certificates" className="min-h-screen bg-silicon py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-neural-grid opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-photon mb-6">
            Awards & <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-lg text-chip max-w-3xl mx-auto">
            Recognition of academic excellence and achievements throughout my educational journey, 
            demonstrating consistent performance and dedication to learning.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificatesData.map((certificate, index) => (
            <motion.div
              key={index}
              className="neural-card group cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              onClick={() => openModal(certificate)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaEye className="w-8 h-8 text-white" />
                </div>

                {/* Rank Badge */}
                <div className="absolute top-4 right-4 bg-electric/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {certificate.rank} Rank
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 text-electric px-3 py-1 rounded-full text-sm font-medium">
                  {certificate.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-photon mb-1">{certificate.title}</h3>
                  <span className="text-sm text-chip">{certificate.year}</span>
                </div>
                <p className="text-sm text-chip mb-4 line-clamp-2">{certificate.description}</p>
                <div className="flex gap-3">
                  <button className="tech-badge flex items-center gap-2">
                    <FaEye className="w-4 h-4" />
                    View
                  </button>
                  <button className="tech-badge flex items-center gap-2">
                    <FaDownload className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Summary */}
        <div className="neural-card p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-photon mb-2">Achievement Summary</h3>
            <p className="text-chip">A snapshot of my academic accomplishments</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(achievementStats).map(([key, stat]) => (
              <motion.div 
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className={`w-12 h-12 neural-card rounded-xl flex items-center justify-center mx-auto mb-3 ${stat.color}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-2xl font-bold text-photon mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                  {stat.count}
                </motion.div>
                <div className="text-sm text-chip">{stat.label} Achievements</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="neural-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-photon mb-4">Ready to Connect?</h3>
            <p className="text-chip mb-6">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and data analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:prem.shah@sjsu.edu" className="quantum-button flex items-center justify-center gap-2">
                <FaEnvelope className="w-5 h-5" />
                Send Email
              </a>
              <a 
                href="https://www.linkedin.com/in/prem-shah-9a5076219/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="tech-badge flex items-center justify-center gap-2"
              >
                <FaLinkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="neural-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative">
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-8 h-8 neural-card rounded-full flex items-center justify-center text-photon hover:text-electric transition-colors duration-300 z-10"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-photon">{selectedCert.title}</h3>
                    <div className="tech-badge">{selectedCert.rank} Rank</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-chip">
                      <FaTrophy className="w-4 h-4 text-electric" />
                      <span>{selectedCert.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-chip">
                      <FaBook className="w-4 h-4 text-quantum" />
                      <span>{selectedCert.year}</span>
                    </div>
                  </div>
                  <p className="text-chip mb-6">{selectedCert.description}</p>
                  <div className="flex gap-4">
                    <button className="quantum-button flex items-center gap-2">
                      <FaDownload className="w-4 h-4" />
                      Download Certificate
                    </button>
                    <button 
                      onClick={closeModal}
                      className="tech-badge flex items-center gap-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;