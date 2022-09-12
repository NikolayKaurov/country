global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),

  path: require('./config/path'),
  config: require('./config/config'),
}

const requireDir = require('require-dir');
const task = requireDir('./task');

const watcher = () => {
  $.gulp.watch($.path.pug.watch, task.pug);
  $.gulp.watch($.path.scss.watch, task.scss);
  $.gulp.watch($.path.js.watch, task.js);
  $.gulp.watch($.path.img.watch, task.img);
  $.gulp.watch($.path.font.watch, task.font);
}

const build = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.pug, task.scss, task.js, task.img, task.font),
);

const dev = $.gulp.series(
  build,
  $.gulp.parallel(watcher, task.server),
);

exports.watch = watcher;
exports.pug = task.pug;
exports.scss = task.scss;
exports.js = task.js;
exports.img = task.img;
exports.font = task.font;

exports.build = build;
exports.dev = dev;

exports.default = $.config.isProd
  ? build
  : dev;
