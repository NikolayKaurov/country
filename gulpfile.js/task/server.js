const server = () => {
  $.browserSync.init({
    server: {
      baseDir: $.path.dest,
    },
  });
}

module.exports = server;
