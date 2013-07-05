function routes(app, io, _) {
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

	  	io.sockets.on('connection', function (socket) {
	  		/* run session per socket if not exists */
	  		req.session[socket.id] = 
	  			(!_.isObject(req.session[socket.id])) ? {} : req.session[socket.id];

	  	  	socket.on('choose_player', function (data) {
	  	  	  	if(_.isUndefined(req.session[socket.id].player)) {
  					req.session[socket.id] = { player : data }
  				} else {
  					players = [];
  				}
	  	  	  	console.log(req.session[socket.id].player);
	  	  	});
	  	});

	  	res.render('players', { players: players });
	});

	return {};
}

module.exports = routes;