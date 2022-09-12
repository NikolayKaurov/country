const src = './src';
const dest = './dest';

module.exports = {
  dest,

  pug: {
    dest,
    src: `${src}/pug/*.pug`,
    watch: `${src}/pug/**/*.pug`,
  },

  scss: {
    src: `${src}/scss/*.{sass,scss}`,
    watch: `${src}/scss/**/*.{sass,scss}`,
    dest: `${dest}/css`,
  },

  js: {
    src: `${src}/js/*.js`,
    watch: `${src}/js/**/*.js`,
    dest: `${dest}/js`,
  },

  img: {
    src: `${src}/img/*.{jpg,jpeg,png,gif,svg}`,
    watch: `${src}/img/**/*.{jpg,jpeg,png,gif,svg}`,
    dest: `${dest}/img`,
  },

  font: {
    src: `${src}/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
    watch: `${src}/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
    dest: `${dest}/font`,
  },
}
