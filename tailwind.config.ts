import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontSize: {
          '4-xl': ['2.735rem', {
            lineHeight: '1.21',
            fontWeight: '500',
          }],
          '3-xl': ['1.875rem', {
            lineHeight: '1.27',            
            fontWeight: '500',
          }],
          '2-xl': ['1.5rem', {
            lineHeight: '1.33',            
            fontWeight: '500',
          }],
          'xl': ['1.25rem', {
            lineHeight: '1.4',            
            fontWeight: '500',
          }],
          'lg': ['1rem', {
            lineHeight: '1.5',            
          }],
          'md': ['.875rem', {
            lineHeight: '1.57',            
          }],
          'sm': ['.75rem', {
            lineHeight: '1.66',            
          }],
          'xs': ['.625rem', {
            lineHeight: '1.8',            
          }],
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                gray: {
                    "100": "#F8F9FB",
                    "150": "#EFF1F4",
                    "200": "#DFE1E4",
                    "300": "#C9CBCD",
                    "400": "#90959D",
                    "500": "#6B6F76",
                    "600": "#212B36",
                },
                brand: {
                    light: "#E3FFEE",
                    "mid-light": "#7DDAA0",
                    primary: "#09AA6C",
                    "mid-dark": "#003F27",
                    dark: "#00160E",
                },
                text: "#212B36",
                "text-secondary": "#6B6F76",
                "text-disabled": "#90959D",
                border: "#DFE1E4",
                "border-hover": "#C9CBCD",
                "border-disabled": "#EFF1F4",
                "border-active": "#212B36"
            },
        },
    },
    plugins: [],
};
export default config;
