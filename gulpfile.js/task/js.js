const webpack = require('webpack-stream');

const js = () => {
  return $.gulp.src($.path.js.src, { sourcemaps: $.config.isDev })
    .pipe($.gp.plumber({
      errorHandler: $.gp.notify.onError(error => (
        {
          title: 'Javascript error!',
          message: error.message,
        }
      )),
    }))
    .pipe($.gp.babel())
    .pipe(webpack($.config.webpack))
    .pipe($.gulp.dest($.path.js.dest, { sourcemaps: $.config.isDev }))
    .pipe($.browserSync.stream());
}

module.exports = js;
