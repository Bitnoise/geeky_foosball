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
                teams.firstTeam.push(data.name);
            }
            // console.log('emituje update_teams');
            io.sockets.emit('update_teams', { teams: teams });
        });
    });



/* require routing and views */
var routing = require('./routing')(app, io, _, players);

/* start listening */
socketServer.listen(1337);


