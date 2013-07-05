(function($){
    $(document).ready(function() {
        var firstTeam  = $('#firstTeam');
        var secondTeam = $('#secondTeam');
        var socket    = io.connect('http://localhost:1337');

        socket.on('scoreChange', function (data) {
            firstTeam.html(data.firstTeam);
            secondTeam.html(data.secondTeam);
        });

        $('#goal').on('click', function(event) {
            socket.emit('goal', {
                'name': 'Michał'
            });
        });
    })
})(jQuery)