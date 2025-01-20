import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Azul
        secondary: '#10B981', // Verde
        background: '#FFFFFF', // Branco
        text: '#1F2937', // Cinza Escuro
        alert: '#F59E0B', // Laranja
        error: '#EF4444', // Vermelho
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte principal
        serif: ['Georgia', 'serif'], // Fonte alternativa
        mono: ['Menlo', 'monospace'], // Fonte monoespaçada
      },
      fontSize: {
        sm: ['14px', '20px'], // Pequena
        base: ['16px', '24px'], // Base
        lg: ['18px', '28px'], // Grande
        xl: ['20px', '30px'], // Extra Grande
        '2xl': ['24px', '36px'], // Extra Extra Grande
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
    },
  },
  plugins: [],
} satisfies Config;
