/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-primary-main) / <alpha-value>)',
                    light: 'rgb(var(--color-primary-light) / <alpha-value>)',
                },
                secondary: {
                    dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
                    DEFAULT: 'rgb(var(--color-secondary-main) / <alpha-value>)',
                    light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
                },
                info: 'rgb(var(--color-info) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                error: 'rgb(var(--color-error) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
            },
        },
    },
    plugins: [],
};
