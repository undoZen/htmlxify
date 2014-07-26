var app = require('express')();
var browserify = require('browserify');
var watchify = require('watchify');
var extend = require('extend');

app.get('/', function (req, res, next) {
  res.set('text/html', 'application/javascript; charset=utf-8');
  res.sendfile(__dirname + '/index.html');
});

app.get('/bundle.js', function (req, res, next) {
  res.set('content-type', 'application/javascript; charset=utf-8');
  var b = browserify(extend({debug: true}, watchify.args));
  watchify(b);
  b.add('./bundle.js')
  .transform(require('../index.js')())
  .bundle()
  .pipe(res);
});

app.listen(4123);
