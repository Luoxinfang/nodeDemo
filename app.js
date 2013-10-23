/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.favicon(__dirname + '/public/images/icon/favicon.ico'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(flash());
app.use(express.cookieParser());//Cookie 解析中间件
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 30},
  store:new MongoStore({
    db:settings.db
  })
}));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var  server=http.createServer(app);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var Chat= require('./models/chat');
io.sockets.on('connection',function(socket){
  new Chat(socket);
});

routes(app);