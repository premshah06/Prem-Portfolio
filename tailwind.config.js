/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light warm background
        silicon: {
          DEFAULT: '#f6f3ee',
          light: '#faf8f4',
          dark: '#ede9e1',
        },
        // Deep navy accent
        electric: {
          DEFAULT: '#0284c7',
          light: '#0ea5e9',
          dark: '#0369a1',
        },
        quantum: {
          DEFAULT: '#7c3aed',
          light: '#8b5cf6',
          dark: '#6d28d9',
        },
        circuit: {
          DEFAULT: '#c2600a',
          light: '#d97706',
          dark: '#9a4500',
        },
        neural: {
          DEFAULT: '#047857',
          light: '#059669',
          dark: '#065f46',
        },
        // Dark text on light bg
        photon: {
          DEFAULT: '#1c1b2e',
          light: '#2d2c40',
          dark: '#0f0e1c',
        },
        chip: {
          DEFAULT: 'rgba(28,27,46,0.55)',
          light: 'rgba(28,27,46,0.75)',
          dark: 'rgba(28,27,46,0.35)',
        },
        matter: {
          DEFAULT: '#ffffff',
          light: '#ffffff',
          dark: '#f0ede8',
        },
      },
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter Tight', 'Inter', 'sans-serif'],
        ibm: ['IBM Plex Sans', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
        'wave': 'wave 2s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'data-flow': 'dataFlow 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(5px, 5px)' },
          '66%': { transform: 'translate(-5px, -5px)' },
        },
        dataFlow: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(108,212,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,212,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        'neon': '0 0 8px rgba(108,212,255,0.5), 0 0 24px rgba(108,212,255,0.2)',
        'neon-purple': '0 0 8px rgba(180,140,255,0.5), 0 0 24px rgba(180,140,255,0.2)',
        'neon-gold': '0 0 8px rgba(255,176,104,0.5), 0 0 24px rgba(255,176,104,0.2)',
      },
    },
  },
  plugins: [],
}
