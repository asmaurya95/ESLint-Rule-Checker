var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var server = http.createServer(
  function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    var a = 10, b = 20;
    var sum = a + b;
    res.end('Sum of ' + a + ' ' + b + " is " + (a + b));
  }
);
server.listen(port, hostname,
  function(){
    console.log('Server running at http://' + hostname + ':' + port + '/');
  }
);
