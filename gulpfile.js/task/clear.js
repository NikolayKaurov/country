const fs = require('fs-extra');

const clear = (cb) => {
  fs.remove($.path.dest, cb);
};

module.exports = clear;
