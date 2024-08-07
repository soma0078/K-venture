import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'kv-3xl': ['32px', { lineHeight: '42px' }],
        'kv-2xl': ['24px', { lineHeight: '32px' }],
        'kv-xl': ['20px', { lineHeight: '32px' }],
        'kv-2lg': ['18px', { lineHeight: '26px' }],
        'kv-lg': ['16px', { lineHeight: '26px' }],
        'kv-md': ['14px', { lineHeight: '24px' }],
        'kv-sm': ['13px', { lineHeight: '22px' }],
        'kv-xs': ['12px', { lineHeight: '18px' }],
      },
      fontWeight: {
        'kv-regular': '400',
        'kv-medium': '500',
        'kv-semibold': '600',
        'kv-bold': '700',
      },
      colors: {
        'kv-black': {
          DEFAULT: '#1B1B1B',
        },
        'kv-gray': {
          100: '#FAFAFA',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#CBC9CF',
          500: '#ADAEB8',
          600: '#A4A1AA',
          700: '#6B7280',
          800: '#374151',
          900: '#1F2937',
          '4b': '#4B4B4B',
          79: '#79747E',
          a1: '#A1A1A1',
        },
        'kv-primary-blue': {
          DEFAULT: '#3C54D0',
          light: '#E0E5FF',
          hover: '#2f48c4',
          active: '#152ead',
        },
        'kv-blue': {
          DEFAULT: '#0085ff',
          light: '#2eb4ff',
          lighter: '#e5f3ff',
        },
        'kv-red': {
          DEFAULT: '#F93347',
          light: '#FFE4E0',
        },
        'kv-green': {
          DEFAULT: '#00AC07',
        },
        'kv-orange': {
          DEFAULT: '#FF7C1D',
          light: '#FFF4E8',
        },
        'kv-yellow': {
          DEFAULT: '#FFC23D',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
      screens: {
        pc: { min: '1200px' },
        tablet: { min: '768px', max: '1199px' },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        fadeOut: 'fadeOut 0.5s ease-out',
        spin: 'spin 1s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const newUtilities = {
        '.kv-text-3xl': {
          fontSize: theme('fontSize.kv-3xl[0]'),
          lineHeight: theme('fontSize.kv-3xl[1].lineHeight'),
        },
        '.kv-text-2xl': {
          fontSize: theme('fontSize.kv-2xl[0]'),
          lineHeight: theme('fontSize.kv-2xl[1].lineHeight'),
        },
        '.kv-text-xl': {
          fontSize: theme('fontSize.kv-xl[0]'),
          lineHeight: theme('fontSize.kv-xl[1].lineHeight'),
        },
        '.kv-text-2lg': {
          fontSize: theme('fontSize.kv-2lg[0]'),
          lineHeight: theme('fontSize.kv-2lg[1].lineHeight'),
        },
        '.kv-text-lg': {
          fontSize: theme('fontSize.kv-lg[0]'),
          lineHeight: theme('fontSize.kv-lg[1].lineHeight'),
        },
        '.kv-text-md': {
          fontSize: theme('fontSize.kv-md[0]'),
          lineHeight: theme('fontSize.kv-md[1].lineHeight'),
        },
        '.kv-text-sm': {
          fontSize: theme('fontSize.kv-sm[0]'),
          lineHeight: theme('fontSize.kv-sm[1].lineHeight'),
        },
        '.kv-text-xs': {
          fontSize: theme('fontSize.kv-xs[0]'),
          lineHeight: theme('fontSize.kv-xs[1].lineHeight'),
        },
        '.align-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      } as Record<string, { [key: string]: string }>;
      addUtilities(newUtilities);
    }),
  ],
};
export default config;
