(function($){
    $('ul.players li').on('click', function(event) {
        var socket = io.connect('http://localhost:1337');
        socket.emit('choose_player', { player: $(this).html() });
        // console.log($(this).html());
        // $(this).css({'background-color': 'red'});
    });
})(jQuery)