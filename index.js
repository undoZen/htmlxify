var through = require('through2');
var reactTools = require('react-tools');

module.exports = function (file) {
  return through(function (buf, enc, next) {
    if (file.match(/\.htmlx$/i)) {
      this.push(reactTools.transform('/**\n'+
        '* @jsx React.DOM\n'+
        '*/\n'+
        'var React = require("react");module.exports = function () {\n'+
        '  return '+buf.toString('utf8')+'};'
      , {filename: file}));
    } else {
      this.push(buf);
    }
    next();
  });
};
