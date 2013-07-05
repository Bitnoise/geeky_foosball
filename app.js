/* mociek */
var teams  = {
    'firstTeam': {players: [], score: 0},
    'secondTeam': {players: [], score: 0}
};

var players = [
    'Łukasz',
    'Michał',
    'Benedykt',
    'Krzysztof',
    'Paweł',
    'Adrian'
];

var matchInfo = {
	players : players,
	teams : teams
};

/* little helpers */
var _ = require('underscore');

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
        port:   6379
    }),
    secret: '1234567890QWERTY'}
));

/* create http server for sockets */
var socketServer = require('http').createServer(app);

/* socket.io stuff */
var io = require('socket.io').listen(socketServer);
    io.sockets.on('connection', function (socket) {
        socket.on('choose_player', function (data) {
            if(!_.isUndefined(teams[data.team])) {
                //add user to the team
                console.log(_.indexOf(teams[data.team], data.name));
                if (_.indexOf(teams[data.team].players, data.name) === -1) {
                    teams[data.team].players.push(data.name);
                }
            }
            // console.log('emituje update_teams');
            io.sockets.emit('update_teams', { teams: teams, redirect: (teams.firstTeam.players.length == 2 && teams.secondTeam.players.length == 2) ? true : false });
        });

        socket.on('goal', function(data){
        	teams.every(function(team){
        		if(team.players.indexOf(data.name) !== -1) {
        			team.score += 1;
        		}

        		return true;
        	});
        	
        	io.sockets.emit('scoreChanged', teams);
        });
    });



/* require routing and views */
var routing = require('./routing')(app, io, _, matchInfo);

/* start listening */
socketServer.listen(1337);
