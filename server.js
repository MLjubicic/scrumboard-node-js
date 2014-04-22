// Module dependencies.
var express = require('express');
var http = require('http');
var path = require('path');

// Start the express framework
var app = express();

// Settings for all environments
app.set('port', process.env.PORT || 55555);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Settings for development environment (verbose error handling)
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Model dependencies
var models = require('./models')(app);

// Route dependencies
var routes = require('./routes')(app);

// Starting the server
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express application server started, port ' + app.get('port'));
});