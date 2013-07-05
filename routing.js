function routes(app, io, _, players) {
	app.get('/', function (req, res) {
	  res.render('index');
	});

	app.get('/judge', function (req, res) {
	  res.render('judge');
	});

	app.get('/players', function(req, res) {

	  	res.render('players', { players: players });
	});

	app.get('/game', function(req, res) {

	  	res.render('game');
	});
	return {};
}

module.exports = routes;