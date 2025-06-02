import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#f0f2ff',
          100: '#e5e7ff',
          200: '#cdcfff',
          300: '#a5a6ff',
          400: '#7c7cff',
          500: '#6366f1',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          heavy: 'rgba(255, 255, 255, 0.15)',
        },
        // Light mode specific colors
        light: {
          bg: {
            primary: 'rgb(248, 250, 252)',
            secondary: 'rgb(241, 245, 249)',
            tertiary: 'rgb(226, 232, 240)',
          },
          text: {
            primary: 'rgb(15, 23, 42)',
            secondary: 'rgb(51, 65, 85)',
            tertiary: 'rgb(100, 116, 139)',
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.05em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.075em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.1em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.125em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.15em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 25px 50px rgba(0, 0, 0, 0.4)',
        'glass-light': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-light-lg': '0 25px 50px rgba(0, 0, 0, 0.12)',
        'neon': '0 0 20px rgba(99, 102, 241, 0.5)',
        'neon-lg': '0 0 40px rgba(99, 102, 241, 0.7)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      gradientColorStops: {
        'glass-start': 'rgba(255, 255, 255, 0.1)',
        'glass-end': 'rgba(255, 255, 255, 0.05)',
      },
      blur: {
        '4xl': '72px',
        '5xl': '96px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.glass-effect': {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
        },
        '.neomorphic': {
          background: 'linear-gradient(145deg, #2a2d47, #1a1d35)',
          boxShadow: '20px 20px 40px #151829, -20px -20px 40px #2f3455',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, rgb(99, 102, 241), rgb(236, 72, 153))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        // Light mode specific utilities
        '.light .glass-effect': {
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
        '.light .neomorphic': {
          background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
          boxShadow: '20px 20px 40px #d1d1d1, -20px -20px 40px #ffffff',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
        // Theme transition utility
        '.theme-transition': {
          transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        },
        // Text color utilities that work with both themes
        '.text-theme-primary': {
          color: 'rgb(255, 255, 255)',
        },
        '.light .text-theme-primary': {
          color: 'rgb(15, 23, 42)',
        },
        '.text-theme-secondary': {
          color: 'rgb(209, 213, 219)',
        },
        '.light .text-theme-secondary': {
          color: 'rgb(51, 65, 85)',
        },
        '.text-theme-tertiary': {
          color: 'rgb(156, 163, 175)',
        },
        '.light .text-theme-tertiary': {
          color: 'rgb(100, 116, 139)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'dark'])
    }
  ],
} satisfies Config;