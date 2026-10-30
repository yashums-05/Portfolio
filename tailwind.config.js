/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        syne:    ['Syne', 'Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        'studio-ink': 'var(--studio-ink)',
        // Deep ink blacks — studio background scale
        studio: {
          950: '#050508',
          900: '#08080D',
          850: '#0C0C14',
          800: '#11111C',
          700: '#181828',
          600: '#22223A',
        },
        // Warm ivory text scale
        ivory: {
          50:  '#FDFCFA',
          100: '#F5F0E8',
          200: '#EDE6D6',
          300: '#D9CEB8',
          400: '#BFB49A',
        },
        // Steel-gray secondary text
        steel: {
          300: '#A8B8D0',
          400: '#8B9BB4',
          500: '#677A96',
          600: '#4E5E78',
          700: '#364055',
        },
        // Mint / Emerald accent
        mint: {
          300: '#6EFFC4',
          400: '#2DFFA0',
          500: '#00D084',
          600: '#10B981',
          700: '#059669',
        },
        // Amber / warm gold accent
        amber: {
          300: '#FBBF24',
          400: '#F5A623',
          500: '#E8973A',
          600: '#D97706',
        },
        // Chartreuse — interactive highlights only
        chartreuse: {
          400: '#CCFF00',
          500: '#BFFF00',
          600: '#AAEE00',
        },
        // Legacy aliases kept to avoid breaking other components
        dark: {
          950: '#050508',
          900: '#08080D',
          850: '#0C0C14',
          800: '#11111C',
          700: '#181828',
          600: '#22223A',
        },
        brand: {
          blue:    '#38BDF8',
          electric:'#4F46E5',
          indigo:  '#6366F1',
          violet:  '#8B5CF6',
          purple:  '#A855F7',
          cyan:    '#06B6D4',
          emerald: '#10B981',
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':    'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'dots-pattern':    'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
        'dot-grid':        'radial-gradient(rgba(245,240,232,0.06) 1px, transparent 1px)',
        'studio-glow':     'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,208,132,0.12), transparent)',
      },
      backgroundSize: {
        'grid-pattern': '40px 40px',
        'dots-pattern': '24px 24px',
        'dot-grid':     '28px 28px',
      },
      animation: {
        'float-slow':  'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'spin-slow':   'spin 8s linear infinite',
        'fade-in-up':  'fadeInUp 0.6s ease-out forwards',
        'pulse-dot':   'pulseDot 1.8s ease-in-out infinite',
        'text-shimmer':'textShimmer 3s linear infinite',
        'cursor-blink':'cursorBlink 1s step-end infinite',
        'marquee':     'marqueeScroll 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.8' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)',   opacity: '1' },
          '50%':      { transform: 'scale(1.4)', opacity: '0.6' },
        },
        textShimmer: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        marqueeScroll: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#F5F0E8',
            lineHeight: '1.75',
          },
        },
      },
    },
  },
  plugins: [],
}
