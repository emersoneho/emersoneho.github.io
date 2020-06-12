'use strict';

const element = document.getElementsByClassName('mobile-menu')[0];

//Open mobile menu

$('.menu__mobile-button, .mobile-menu__close').on('click', function () {
    //$('.mobile-menu').toggleClass('active');
    element.classList.toggle("active");
});

//Close mobile menu after click
$('.mobile-menu__wrapper ul li a').on('click', function () {
    element.classList.remove('active');
    //$('.mobile-menu').removeClass('active');
});