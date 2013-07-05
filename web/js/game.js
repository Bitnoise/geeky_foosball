(function($){
    $(document).ready(function() {
        $('#goal').on('click', function(event) {
            socket.emit('goal', {
                'name': 'Michał'
            });
        });
    })
})(jQuery)