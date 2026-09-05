module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-229',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './app/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: ['html', 'body', 'in', 'reveal', 'active', 'open', 'nav-open'],
              deep: [/^nav/, /^coe-card/, /^hero-carousel/, /^btn/, /^about-expand-card/],
              greedy: [/nav/, /coe-card/, /hero-carousel/, /btn/, /about-expand-card/]
            }
          }
        }
      : {})
  }
}
