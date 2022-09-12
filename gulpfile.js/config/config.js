const isProd = process.argv.includes('--production');
const isDev = !isProd;

module.exports = {
  isProd,
  isDev,

  pug: {
    pretty: isDev,
  },

  webpack: {
    mode: isProd ? 'production' : 'development',
    output: {
      filename: 'script.min.js',
    },
  },

  img: {
    verbose: true,
  },

  font: {
    formats: [
      'ttf',
      'woff',
      'eot',
    ],
  },
}
