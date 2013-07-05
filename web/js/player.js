(function($){
    $(document).ready(function() {
        var socket = io.connect('http://localhost:1337');
        
        $( "ul.players, ul.player-placeholder" ).sortable({
          connectWith: "ul.player-placeholder, ul.players",
          receive: function( event, ui ) {
            var name = $(this).children('li').html();
            var team = $(this).parent().children("ul").attr('id');

            socket.emit('choose_player', { 'name': name, 'team': team });
          }
        }).disableSelection();

        $('ul.players li').on('click', function(event) {
            // console.log($(this).html());
            // var socket = io.connect('http://localhost:1337');
            // socket.emit('choose_player', { my: $(this).html() });
        });
    })
})(jQuery)