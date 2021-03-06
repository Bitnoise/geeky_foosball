(function($){
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    $(document).ready(function() {

        var me          = '';

        var players     = $('#players')
            , socket    = io.connect('http://localhost:1337')
            , teams     = {
                firstTeam: $('ul#firstTeam'),
                secondTeam: $('ul#secondTeam')
            };

        //update list
        socket.on('update_teams', function(data) {
            _.each(data.teams, function(team, teamName) {
                _.each(team.players, function(player) {
                    $('ul.players').find('li:contains(' + player + ')').appendTo(teams[teamName]);
                });
            });

            //redirect
            if (data.redirect) {
                window.location = 'game/' + me;
                // window.location = 'game';
            };
        });

        //drag and drop players
        $( "ul.players, ul.player-placeholder" ).sortable({
          connectWith: "ul.player-placeholder, ul.players",
          receive: function( event, ui ) {
            var name = ui.item.html();
            var team = $(this).parent().children("ul").attr('id');
            me = name;
            socket.emit('choose_player', { 'name': name, 'team': team });
          }
        }).disableSelection();


        $('#random').on('click', function (event) {
            //reset all selected players
            teams.firstTeam.find('li').appendTo(players);
            teams.secondTeam.find('li').appendTo(players);

            var arr   = shuffle(players.find('li')); //shuffle players
            var team = null;
            for (var i=0; i<4; i++)
            {
                team = (i%2 ? teams.firstTeam : teams.secondTeam);

                team.append(arr[i]);
                // console.log(team);
                socket.emit('choose_player', {
                    'name': $(arr[i]).html(),
                    'team': team.attr('id')
                });
            }

            return false;
        });

    })
})(jQuery)