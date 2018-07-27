module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({ browsers: ['> 1%'] }),
    require('postcss-nested'),
    require('postcss-custom-media')({
      extensions: {
        '--phone': '(max-width: 544px)',
        '--tablet': '(max-width: 768px)',
        '--desktop': '(max-width: 992px)',
        '--large-desktop': '(max-width: 1200px)',
      },
    }),
  ],
};
