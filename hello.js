console.log("Hello world");

var http = require('http');

var server = http.createServer(function (request, response) {
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.end("<h1>HALLO WORLD</h1>");
});

// listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

console.log("server running at http://127.0.0.1:8000");