"use strict";

module.exports = {
  content: ['./src/**/*.html', './src/**/*.js'],
  purge: ['./dist/*.html'],
  darkMode: false,
  theme: {
    animation: {
      'ping-slow': 'ping 3s linear infinite'
    },
    screens: {
      'sm': '641px',
      'md': '769px',
      'lg': '1025px',
      'xl': '1113px',
      'xxl': '1241px',
      'xxxl': '1501px',
      'xxxl-down': { raw: '(max-width: 1500px)' },
      'xxl-down': { raw: '(max-width: 1240px)' },
      'xl-down': { raw: '(max-width: 1112px)' },
      'lg-down': { raw: '(max-width: 1024px)' },
      'md-down': { raw: '(max-width: 768px)' },
      'sm-down': { raw: '(max-width: 640px)' },
    },
    extend: {},
  },
  plugins: [],
}
