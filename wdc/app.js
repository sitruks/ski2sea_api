// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
var express = require('express');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var path = require('path');
// var cors = require('cors');
var config = require('./config.js');
var sys = require('util');

var app = express();

var allowedOrigins = ['http://localhost:3333', 'http://results.skitosea.com/api/v1/2009/results'];

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', (process.env.PORT || config.PORT));
app.use(express.static(__dirname + '/public'));
// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       var msg = 'The CORS policy for this site does not ' +
//         'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
// app.options('*', cors());

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //
app.get('/', function (req, res) {
  console.log("got here");
  res.redirect('/index.html');
});

// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
