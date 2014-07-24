var through = require('through2');
var reactTools = require('react-tools');

module.exports = function (file) {
  return through(function (buf, enc, next) {
    if (file.match(/\.htmlx$/i)) {
      var htmlx = reactTools.transform(
        '/** @jsx React.DOM */ function htmlx(ctx, state, props) { '+buf.toString('utf8')+'};'
      , {filename: file});
      var exp = 'var React = require("react"); module.exports = HTMLX; function HTMLX(ctx) { return function () { return htmlx.call(ctx, ctx, ctx.state, ctx.props); '+htmlx+'}}'
      this.push(exp);
    } else {
      this.push(buf);
    }
    next();
  });
};
