(function($){
    $(document).ready(function() {
        var firstTeam  = $('#firstTeam');
        var secondTeam = $('#secondTeam');
        var socket    = io.connect('http://localhost:1337');

        socket.on('scoreChanged', function (data) {
            console.log(data);
            firstTeam.html(data.firstTeam.score);
            secondTeam.html(data.secondTeam.score);
        });

        $('#goal').on('click', function(event) {
            socket.emit('goal', {
                'name': 'Michał'
            });
        });
    })
})(jQuery)