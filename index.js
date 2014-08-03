'use strict';
var path = require('path');
var through = require('through2');
var htmlx = require('htmlx');

module.exports = function (ext) {
  ext = ext || '.htmlx';
  if (ext[0] != '.') {
    ext = '.' + ext;
  }
  return function (file) {
    return through(function (buf, enc, next) {
      if (path.extname(file) === ext) {
        this.push(htmlx(buf.toString('utf-8'), file));
      } else {
        this.push(buf);
      }
      next();
    });
  }
};
