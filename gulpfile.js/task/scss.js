const sass = require('gulp-sass')(require('sass'));

const scss = () => {
  return $.gulp.src($.path.scss.src, { sourcemaps: $.config.isDev })
    .pipe($.gp.plumber({
      errorHandler: $.gp.notify.onError(error => (
        {
          title: 'SCSS error!',
          message: error.message,
        }
      )),
    }))
    .pipe(sass())
    .pipe($.gp.webpCss())
    .pipe($.gp.autoprefixer())
    .pipe($.gp.shorthand())
    .pipe($.gp.groupCssMediaQueries())
    .pipe($.gp.csso())
    .pipe($.gp.rename('./style.min.css'))
    .pipe($.gulp.dest($.path.scss.dest, { sourcemaps: $.config.isDev }))
    .pipe($.browserSync.stream());
}

module.exports = scss;
