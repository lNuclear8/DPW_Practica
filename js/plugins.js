$(document).ready(function(){
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
