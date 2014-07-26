var path = require('path');
var through = require('through2');
var reactTools = require('react-tools');

module.exports = function (ext) {
  ext = ext || '.htmlx';
  if (ext[0] != '.') {
    ext = '.' + ext;
  }
  return function (file) {
    return through(function (buf, enc, next) {
      if (path.extname(file) === ext) {
        var htmlx;
        try {
          htmlx = reactTools.transform(
            '/** @jsx React.DOM */ function htmlx(state, props) { '+buf.toString('utf8')+'};'
          , {filename: file});
        } catch (err) {
          htmlx = 'function htmlx(state, props) { return React.DOM.span({style: {color: "red"}}, "'+
            file+' transform failed", React.DOM.br(null), "lineNumber: '+err.lineNumber+
            '", React.DOM.br(null), " column: '+err.column+
            '", React.DOM.br(null), " message: '+err.message+'");}'
        }
        var exp = 'var React = require("react"); module.exports = function () { return htmlx.call(this, this.state, this.props); }; '+htmlx;
        this.push(exp);
      } else {
        this.push(buf);
      }
      next();
    });
  }
};
