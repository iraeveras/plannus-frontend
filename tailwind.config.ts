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
    },
  },
  plugins: [],
} satisfies Config;
