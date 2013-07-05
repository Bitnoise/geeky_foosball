function routes(app, io, _, matchInfo) {
	app.get('/', function (req, res) {
	  res.render('index');
	});

	app.get('/judge', function (req, res) {
	  res.render('judge');
	});

	app.get('/players', function(req, res) {
	  	res.render('players', { players: matchInfo.players });
	});

	app.get('/game/:username', function(req, res) {
	  	res.render('game', { player: req.params['username']});
	});

	return {};
}

module.exports = routes;