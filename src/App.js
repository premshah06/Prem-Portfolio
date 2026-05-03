import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience from "./components/About";
import Certificates from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import Scene3D from "./components/Scene3D";
import Skills from "./components/Skills";
import TechMarquee from "./components/TechMarquee";
import Work from "./components/Work";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);
  const progressRef   = useRef(null);

  /* ── Lenis smooth scroll ─────────────────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    // Sync Lenis with GSAP ticker so ScrollTrigger stays accurate
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Drive progress bar
    lenis.on('scroll', ({ progress }) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    });

    // Anchor links go through Lenis for smooth offset scroll
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      const href   = anchor?.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.substring(1));
        if (target) lenis.scrollTo(target, { offset: -64, duration: 1.6 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  /* ── Custom cursor ───────────────────────────────────────────── */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const lagRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(lagRing);
    };
    lagRing();

    const expand   = () => ring.classList.add('cursor-hover');
    const collapse = () => ring.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMove);

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], .neural-card, .tech-badge').forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', collapse);
      });
    };
    attachHover();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative">
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, #6cd4ff, #b48cff)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      {/* Custom cursor */}
      <div id="cursor-dot"  ref={cursorDotRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>

      {/* 3D background scene */}
      <Scene3D />

      <Navbar />
      <main className="relative z-10">
        <Home />
        <TechMarquee />
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
