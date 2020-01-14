// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
var express = require('express');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var path = require('path');
var config = require('./config.js');              // Get our config info (app id and app secret)
var cors = require('cors')
var sys = require('util');

var app = express();

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', (process.env.PORT || config.PORT));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //

app.get('/', function(req, res) {
  console.log("got here");
  res.redirect('/index.html');
});

// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
