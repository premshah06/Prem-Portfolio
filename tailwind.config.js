/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        silicon: {
          DEFAULT: '#F5F7FF',
          light: '#FFFFFF',
          dark: '#E5E7F0',
        },
        electric: {
          DEFAULT: '#0090FF',
          light: '#33A8FF',
          dark: '#0072CC',
        },
        quantum: {
          DEFAULT: '#7B5CD6',
          light: '#9B7CE6',
          dark: '#5B3CB6',
        },
        circuit: {
          DEFAULT: '#FF9500',
          light: '#FFB033',
          dark: '#CC7700',
        },
        // Secondary Colors
        neural: {
          DEFAULT: '#00E676',
          light: '#33EB91',
          dark: '#00B65C',
        },
        photon: {
          DEFAULT: '#2D3748',
          light: '#4A5568',
          dark: '#1A202C',
        },
        chip: {
          DEFAULT: '#718096',
          light: '#A0AEC0',
          dark: '#4A5568',
        },
        matter: {
          DEFAULT: '#1A202C',
          light: '#2D3748',
          dark: '#171923',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
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
        'grid-pattern': 'linear-gradient(to right, #1a1e3720 1px, transparent 1px), linear-gradient(to bottom, #1a1e3720 1px, transparent 1px)',
        'circuit-pattern': 'url("/src/assests/circuit.jpg")',
        'neural-pattern': 'url("/src/assets/patterns/neural.svg")',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.electric.DEFAULT"), 0 0 20px theme("colors.electric.DEFAULT")',
        'neon-purple': '0 0 5px theme("colors.quantum.DEFAULT"), 0 0 20px theme("colors.quantum.DEFAULT")',
        'neon-gold': '0 0 5px theme("colors.circuit.DEFAULT"), 0 0 20px theme("colors.circuit.DEFAULT")',
      },
    },
  },
  plugins: [],
}
