/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        theater: {
          blackout: '#05040a',
          night: '#090812',
          panel: '#11101b',
          glass: 'rgba(26, 22, 42, 0.72)',
          line: 'rgba(198, 181, 255, 0.16)',
          violet: '#8b5cf6',
          magenta: '#d946ef',
          amber: '#f59e0b',
          cyan: '#22d3ee',
          red: '#ef4444',
        },
      },
      boxShadow: {
        glow: '0 0 42px rgba(139, 92, 246, 0.28)',
        panel: '0 18px 60px rgba(0, 0, 0, 0.42)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
