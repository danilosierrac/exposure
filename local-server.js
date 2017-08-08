var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    console.log(req.url);

    if (req.url === '/') {
        res.end(fs.readFileSync('index.html'));
        return;
    }

    res.end(fs.readFileSync('404.html'));
}).listen(8000)
