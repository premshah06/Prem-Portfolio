import React, { useEffect } from 'react';
import Experience from "./components/About";
import Certificates from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import MainScene from "./components/3d/MainScene";

function App() {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div>
      <MainScene />
      <Navbar />
      <main>
        <Home />
        <Experience />
        <Skills />
        <Work />
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}

export default App;