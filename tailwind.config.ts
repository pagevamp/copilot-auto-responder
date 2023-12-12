import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    '100': '#F8F9FB',
                    '150': '#EFF1F4',
                    '200': '#DFE1E4',
                    '300': '#C9CBCD',
                    '400': '#90959D',
                    '500': '#6B6F76',
                    '600': '#212B36',
                },
                brand: {
                    light: '#E3FFEE',
                    'mid-light': '#7DDAA0',
                    primary: '#09AA6C',
                    'mid-dark': '#003F27',
                    dark: '#00160E',
                },
                text: '#212B36',
                'text-secondary': '#6B6F76',
                'text-disabled': '#90959D',
                border: '#DFE1E4',
                'border-hover': '#C9CBCD',
                'border-disabled': '#EFF1F4',
                'border-active': '#212B36',
            },
            fontSize: {
                'heading-4xl': [
                    '2.735rem',
                    {
                        lineHeight: '1.21',
                        fontWeight: '500',
                    },
                ],
                'heading-3xl': [
                    '1.875rem',
                    {
                        lineHeight: '1.27',
                        fontWeight: '500',
                    },
                ],
                'heading-2xl': [
                    '1.5rem',
                    {
                        lineHeight: '1.33',
                        fontWeight: '500',
                    },
                ],
                'heading-xl': [
                    '1.25rem',
                    {
                        lineHeight: '1.4',
                        fontWeight: '500',
                    },
                ],
                'heading-lg': [
                    '1rem',
                    {
                        lineHeight: '1.5',
                        fontWeight: '500',
                    },
                ],
                'heading-md': [
                    '.875rem',
                    {
                        lineHeight: '1.57',
                        fontWeight: '500',
                    },
                ],
                'heading-sm': [
                    '.75rem',
                    {
                        lineHeight: '1.66',
                        fontWeight: '500',
                    },
                ],
                'heading-xs': [
                    '.625rem',
                    {
                        lineHeight: '1.8',
                        fontWeight: '500',
                    },
                ],
                'body-lg': [
                    '1rem',
                    {
                        lineHeight: '1.5',
                        fontWeight: '400',
                    },
                ],
                'body-md': [
                    '.875rem',
                    {
                        lineHeight: '1.57',
                        fontWeight: '400',
                    },
                ],
                'body-sm': [
                    '.75rem',
                    {
                        lineHeight: '1.66',
                        fontWeight: '400',
                    },
                ],
                'body-xs': [
                    '.625rem',
                    {
                        lineHeight: '1.8',
                        fontWeight: '400',
                    },
                ],
            },
        },
    },
    plugins: [],
}
export default config
