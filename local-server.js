// Minimal static server for local testing.
// Mirrors GitHub Pages: unknown paths fall through to 404.html,
// which is what powers the client-side /pay/<token> route.
var http = require('http');
var fs = require('fs');
var path = require('path');

var TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

http.createServer(function (req, res) {
  console.log(req.url);

  var url = req.url.split('?')[0];
  var file = url === '/' ? 'index.html' : path.normalize(url).replace(/^(\.\.[\/\\])+/, '').slice(1);

  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(fs.readFileSync('404.html'));
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8000, function () {
  console.log('Serving on http://localhost:8000');
});
