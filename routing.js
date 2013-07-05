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

		// req.session.player = false;

	  	io.sockets.on('connection', function (socket) {

	  	  	socket.on('choose_player', function (data) {
	  	  	  	if(!req.session.player) {
  					// res.write('Last page was: ' + req.session.lastPage + '. ');
  					req.session.player = data;
  				} else {
  					players = [];
  				}
  				//simple check
	  	  	  	console.log(req.session.player);
	  	  	});
	  	});

	  	//render view
	  	res.render('players', { players: players });
	});

	return {};
}

module.exports = routes;