(function($){
    $(document).ready(function() {
        var firstTeam  = $('.firstTeam');
        var secondTeam = $('.secondTeam');
        var socket    = io.connect('http://localhost:1337');

        socket.on('scoreChanged', function (data) {
            firstTeam.html(data.firstTeam.score);
            secondTeam.html(data.secondTeam.score);
        });
    })
})(jQuery)