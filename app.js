/* start application */
var express = require('express');

/* start app */
var app = express();

/* create http server for sockets */
var socketServer = require('http').createServer(app);

/* socket.io stuff */
var io = require('socket.io').listen(socketServer);

/* get redis storage */
var redis = require('connect-redis')(express);

/* require routing and views */
var routing = require('./routing')(app, io);

/* start express application */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* tell me where is statik path */
app.use(express.static(__dirname + '/web/'));

/* use session stuff */
app.use(express.cookieParser());
app.use(express.session({
    store: new redis({
    host: 'localhost',
    port: 1337,
    db: 2,
    pass: 'RedisPASS'
  }),secret: '1234567890QWERTY'}));

/* start listening */
socketServer.listen(1337);