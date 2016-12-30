// Imports
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

// MiddleWare
app.use(bodyParser.json());
app.use(cors);

// Requests
app.get('/api/message', message.get)
app.post('/api/message', checkAuthenticated, message.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

// Mongo database connection
mongoose.connect("mongodb://localhost:27017/test", function(err, db){
	if(!err){
		console.log('We are connected to mongo');
	}
})

// Server listening on port: 5000
var server = app.listen(5000, function(){
  console.log('listening on port: ', server.address().port);
});