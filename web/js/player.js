(function($){
<<<<<<< HEAD
    $(document).ready(function() {

        $( "ul.players, ul.player-placeholder" ).sortable({
          connectWith: "ul.player-placeholder, ul.players",
          receive: function( event, ui ) {
            var name = $(this).children('li').html();
            var team = $(this).parent().children("ul").attr('id');

            var socket = io.connect('http://localhost:1337');
            socket.emit('choose_player', { 'name': name, 'team': team });
          }
        }).disableSelection();

        $('ul.players li').on('click', function(event) {
            // console.log($(this).html());
            // var socket = io.connect('http://localhost:1337');
            // socket.emit('choose_player', { my: $(this).html() });
        });
    })
=======
    $('ul.players li').on('click', function(event) {
        var socket = io.connect('http://localhost:1337');
        socket.emit('choose_player', { player: $(this).html() });
        // console.log($(this).html());
        // $(this).css({'background-color': 'red'});
    });
>>>>>>> fffc674bb8ddddd6fc1220477e65739655d666ff
})(jQuery)