const loading = {
    show: () => {
        $('#preloader, #preloader .inner').show();
    },
    hide: () => {
        $('#preloader .inner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }
}

export default loading;