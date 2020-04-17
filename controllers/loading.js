const showLoading = () => {
    $('#preloader, #preloader .inner').show();
}

const hideLoading = () => {
    $('#preloader .inner').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });
}