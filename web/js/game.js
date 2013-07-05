(function($){
    $(document).ready(function() {
        var firstTeam  = $('#firstTeam');
        var secondTeam = $('#secondTeam');

        socket.on('scoreChange', function (data) {
            firstTeam.html(data.firstTeam);
            secondTeam.html(data.secondTeam);
        });
        $('#goal').on('click', function(event) {
            socket.emit('scoreChange', {
                'name': 'Michał'
            });
        });
    })
})(jQuery)