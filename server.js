var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// app.get('/', function(req, res){
// 	res.send('Hello World!');
// });

app.use(express.static(__dirname + "/public"));

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function(){
	console.log('listening app in port');
});
