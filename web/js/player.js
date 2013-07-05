(function($){
    $('ul.players li').on('click', function(event) {
        console.log(this.html());
    });
})(jQuery)