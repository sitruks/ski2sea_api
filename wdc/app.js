// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
var axios = require('axios');
var bodyParser = require('body-parser');
var config = require('./config.js');
var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var request = require('request');
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

// // method inbuilt in express to recognize the incoming Request Object as a JSON Object
// app.use(express.json())

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //
app.get('/', function (req, res) {
  console.log("got here");
  res.redirect('/index.html');
});

app.get('/2009', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2009/results';
  var output = request(url).pipe(res);
});

app.get('/2010', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2010/results';
  var output = request(url).pipe(res);
});

app.get('/2011', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2011/results';
  var output = request(url).pipe(res);
});

app.get('/2012', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2012/results';
  var output = request(url).pipe(res);
});

app.get('/2013', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2013/results';
  var output = request(url).pipe(res);
});

app.get('/2014', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2014/results';
  var output = request(url).pipe(res);
});

app.get('/2015', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2015/results';
  var output = request(url).pipe(res);
});

app.get('/2016', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2016/results';
  var output = request(url).pipe(res);
});

app.get('/2017', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2017/results';
  var output = request(url).pipe(res);
});

app.get('/2018', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2018/results';
  var output = request(url).pipe(res);
});

app.get('/2019', function (req, res) {
  var url = 'http://results.skitosea.com/api/v1/2019/results';
  var output = request(url).pipe(res);
});

// app.get('/:20??', function (req, res) {
//   // var yearsArray = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
//   var yearsArray = [2009, 2010, 2011];
//   for (let i = 0; i < yearsArray.length; i++) {
//     var url = 'http://results.skitosea.com/api/v1/' + yearsArray[i] + '/results';
//     request(url).pipe(res);
//     console.log(res);
    
//   };
// });

// app.get('/output', function (req, res) {
//   // var yearsArray = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
//   var yearsArray = [2010, 2011];

//   for (let i = 0; i < yearsArray.length; i++) {
//     var url = 'http://results.skitosea.com/api/v1/' + yearsArray[i] + '/results';
//     request(url).pipe(res);
//   };
// });

// app.get('/results', function (req, res) {

//   var options = {
//     url: 'http://results.skitosea.com/api/v1/2009/results',
//     method: 'GET',
//     accept: 'application/json'
//   };

//   // var path = './public/json/db.json';
//   // var ws = fs.createWriteStream(path,'utf8');
//   // var json = JSON.stringify(ws);
//   // console.log(json);


//   // Start the request
//   request(options).on('error', function (error) {
//     console.log(error);
//   }).pipe(res);
// });

// app.get('/output', function (req, res) {
//   var options = {
//     url: 'http://results.skitosea.com/api/v1/2009/results',
//     method: 'GET',
//     accept: 'application/json'
//   };
//   // Start the request
//   request(options).on('error', function (error) {
//     console.log(error);
//   }).pipe(res);
// });

// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});