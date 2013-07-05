var express      = require('express')
  , app          = express()
  , socketServer = require('http').createServer(app)
  , io           = require('socket.io').listen(socketServer);

socketServer.listen(1337);

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

var clientsNo = new Array(
    'player1',
    'player2',
    'player3',
    'player4');

app.get('/player', function(req, res) {
  // res.send('Your Awesome.');
  io.sockets.on('connection', function (socket) {
    // console.log(socket);
    socket.emit('players', { players: clientsNo });
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // });
  });
});