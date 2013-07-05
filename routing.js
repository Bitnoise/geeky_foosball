function routes(app, io) {
	app.get('/', function (req, res) {
	  res.render('index', {});
	});

	app.get('/judge', function (req, res) {
	  res.render('judge', {});
	});

	app.get('/player', function(req, res) {
		var clientsNo = [
		    'player1',
		    'player2',
		    'player3',
		    'player4'
		];

	  res.send('Your Awesome.');
	  io.sockets.on('connection', function (socket) {
	    // console.log(socket);
	    socket.emit('players', { players: clientsNo });
	    // socket.on('my other event', function (data) {
	    //   console.log(data);
	    // });
	  });
	});

	return {};
}

module.exports = routes;