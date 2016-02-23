// framework express
var express = require('express');
var app = express();
// this stuff for heroku
var cool = require('cool-ascii-faces');
// untuk koneksi dengan database (mongodb)
var mongojs = require('mongojs');
var db = mongojs('kontaklist', ['kotaklist']);
// untuk body parser data
var bodyParser = require('body-parser');

// initialize port
app.set('port', (process.env.PORT || 5000));

// using body parser
app.use(bodyParser.json());

// untuk retrieve data
app.get('/getkontak', function(req, res){
	db.kotaklist.find(function(err, docs){
		res.json(docs);
	});
});

// untuk retrieve data by id
app.get('/getkontak/:id', function(req, res){
	var id = req.params.id;
	db.kotaklist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

// untuk method post data into mongodb
app.post('/getkontak', function(req, res){
	console.log(req.body);
	db.kotaklist.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

// untuk method delete data
app.delete('/deletekontak/:id', function(req, res){
	var id = req.params.id;
	console.log("deleting data with _id "+id);
	db.kotaklist.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

// untuk updating data
app.put('/editkontak/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.kotaklist.findAndModify(
		{
			query: {_id: mongojs.ObjectId(id)}, 
			update: {$set: { name: req.body.name, email: req.body.email, nohp: req.body.nohp }},
			new: true 
		},
		function(err, docs){
			res.json(docs);
		});
});

// this method for load html file
app.use(express.static(__dirname + "/public"));

// this method for heroku
app.get('/cool', function(request, response) {
  response.send(cool());
});

// to listen port
app.listen(app.get('port'), function(){
	console.log('listening app in port');
});
