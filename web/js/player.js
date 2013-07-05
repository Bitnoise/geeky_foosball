(function($){
    $(document).ready(function() {
        var socket = io.connect('http://localhost:1337');

        var teams = {
            firstTeam: $('ul#firstTeam'),
            secondTeam: $('ul#secondTeam')
        }
        console.log('slucham')
        //update list
        socket.on('update_teams', function(data) {
            console.log(data);
            _.each(data.teams, function(players, team) {

                _.each(players, function(player) {
                    $('ul.players').find('li:contains(' + player + ')').appendTo(teams[team]);
                });
            });
            //update view
        });

        //drag and drop players
        $( "ul.players, ul.player-placeholder" ).sortable({
          connectWith: "ul.player-placeholder, ul.players",
          receive: function( event, ui ) {
            var name = $(this).children('li').html();
            var team = $(this).parent().children("ul").attr('id');

            socket.emit('choose_player', { 'name': name, 'team': team });
          }
        }).disableSelection();
    })
})(jQuery)