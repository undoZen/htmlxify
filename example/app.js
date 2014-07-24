var app = require('express')();

app.get('/', function (req, res, next) {
  res.set('text/html', 'application/javascript; charset=utf-8');
  res.sendfile(__dirname + '/index.html');
});

app.get('/lib.js', function (req, res, next) {
  res.type('js');
  res.sendfile(__dirname + (app.get('env') == 'production' ? '/lib.js' : '/lib.debug.js'));
});

app.get('/bundle.js', function (req, res, next) {
  res.set('content-type', 'application/javascript; charset=utf-8');
  require('browserify')({debug: true})
  .add('./bundle.js')
  .transform('./htmlxify.js')
  .external('react')
  .bundle()
  .pipe(res);
});

app.listen(4123);
