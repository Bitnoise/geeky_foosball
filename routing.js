function routes(app, io) {
	app.get('/', function (req, res) {
	  res.render('index', {});
	});

	app.get('/judge', function (req, res) {
	  res.render('judge', {});
	});

	app.get('/players', function(req, res) {
		var players = [
		    'Łukasz' ,
		    'Michał' ,
            'Benedykt' ,
            'Krzysztof' ,
            'Paweł' ,
            'Adrian'
		];

	  res.render('players', { players: players });

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