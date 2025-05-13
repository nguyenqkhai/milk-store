/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '0.9375rem',    // 15px (từ 12px)
        sm: '1.09375rem',   // 17.5px (từ 14px)
        base: '1.25rem',    // 20px (từ 16px)
        lg: '1.40625rem',   // 22.5px (từ 18px)
        xl: '1.5625rem',    // 25px (từ 20px)
        '2xl': '1.875rem',  // 30px (từ 24px)
        '3xl': '2.34375rem',// 37.5px (từ 30px)
        '4xl': '2.8125rem', // 45px (từ 36px)
        '5xl': '3.75rem',   // 60px (từ 48px)
      },
      keyframes: {
        moveRight: {
          '0%': { transform: 'translateX(10vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      animation: {
        moveRight: 'moveRight 5s linear infinite',
      },
    },
  },
  plugins: [],
};
  