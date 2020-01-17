// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
var express = require('express');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var path = require('path');
var config = require('./config.js');
var sys = require('util');

var app = express();

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', (process.env.PORT || config.PORT));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN || '*');
  next();
});

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //
app.get('/', function (req, res) {
  console.log("got here");
  res.redirect('/index.html');
});

app.get('/results', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2009/results';
  request(url).pipe(res);
  // res.json(JSON.parse(body));
});

// app.get('/results', function (req, res) {
//   request(
//     { url: 'http://results.skitosea.com/api/v1/2009/results' },
//     function (error, response, body) {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});