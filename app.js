// -------------------------------------------------- //
// Module Dependencies
// -------------------------------------------------- //
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');

// var cors = require('cors');

var app = express();

// -------------------------------------------------- //
// Express set-up and middleware
// -------------------------------------------------- //
app.set('port', (process.env.PORT || 3333));
// app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3333", // restrict calls to those this address
//     methods: "GET" // only allow GET requests
//   })
// );

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3333"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static(__dirname + '/public'));


// -------------------------------------------------- //
// Create and start our server
// -------------------------------------------------- //
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

// -------------------------------------------------- //
// Routes
// -------------------------------------------------- //
// app.get('/', function (req, res) {
//   console.log("got here");
//   res.redirect('/index.html');
// });

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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});