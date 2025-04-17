/* Carousel*/
$(document).ready(function () {
    $('.carousel').slick({
        dots: true, // Muestra los puntos de navegación
        infinite: true, // Hace que el carrusel sea infinito
        speed: 500, // Velocidad de transición
        slidesToShow: 1, // Muestra una imagen a la vez
        slidesToScroll: 1, // Desplazamiento de una imagen a la vez
        autoplay: true, // Reproducción automática
        autoplaySpeed: 3000, // Tiempo entre cada slide (3s)
        arrows: true // Flechas de navegación
    });
});

/* Menú hamburguesa*/
$(document).ready(function () {
    // Funcionalidad para menú hamburguesa
    $(".menu-hamburguesa").click(function () {
        $(".menu-list").toggleClass("activo");
        let expanded = $(this).attr("aria-expanded") === "true";
    });

    // Funcionalidad para submenús
    $(".dropdown > a").click(function (e) {
        e.preventDefault();
        $(".submenu").not($(this).next()).slideUp();// Cierra todos los submenús excepto el que se va a abrir
        $(this).next(".submenu").slideToggle();// Alterna solo el submenu del elemento sobre el que se ha hecho click
    });
});