/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#171718',
                    100: '#1c1c1d',
                    200: '#212122',
                    300: '#2a2a2b',
                    400: '#323233',
                },
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                secondary: {
                    DEFAULT: '#10B981',
                },
            },
            backgroundImage: {
                'dark-gradient': 'linear-gradient(to bottom, #171718, #1c1c1d)',
            },
            boxShadow: {
                'dark-nav': '0 2px 4px rgba(0,0,0,0.2)',
                'dark-card': '0 4px 6px -1px rgba(0,0,0,0.2)',
            },
            scale: {
                '102': '1.02',
            },
            animation: {
                'scroll': 'scroll 20s linear infinite',
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-in': 'slide-in 0.3s ease-out',
                'tag-pop': 'tag-pop 0.3s ease-out',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in': {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'tag-pop': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '50%': { transform: 'scale(1.02)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            spacing: {
                'card': '1.25rem',
                'section': '2rem',
            },
            borderRadius: {
                'card': '0.75rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-scrollbar'),
    ],
}