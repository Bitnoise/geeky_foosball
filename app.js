/* start application */
var express = require('express');

/* start app */
var app = express();

/* start express application */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* tell me where is statik path */
app.use(express.static(__dirname + '/web/'));

/* get redis storage */
var Redis = require('connect-redis')(express);

/* use session stuff */
app.use(express.cookieParser());
app.use(express.session({
    store: new Redis({
        host:   'localhost',
        port:   6379,
        db:     2,
        pass:   'RedisPASS'
    }),
    secret: '1234567890QWERTY'}
));

/* create http server for sockets */
var socketServer = require('http').createServer(app);

/* socket.io stuff */
var io = require('socket.io').listen(socketServer);

/* require routing and views */
var routing = require('./routing')(app, io);

/* start listening */
socketServer.listen(1337);