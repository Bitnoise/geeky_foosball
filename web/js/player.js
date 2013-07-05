(function($){
    $('ul.players li').on('click', function(event) {
        // console.log($(this).html());
        var socket = io.connect('http://localhost:1337');
        socket.emit('choose_player', { my: $(this).html() });
    });
})(jQuery)