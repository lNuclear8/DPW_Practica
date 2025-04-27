// Carousel
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

// Menú hamburguesa
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

//Plugin de FullCalendar
$(document).ready(function () {
    if ($('#calendar').length) {
        $('#calendar').fullCalendar({
            locale: 'es',
            events: [
                {
                    title: 'Gran Premio 1',
                    start: '2025-04-12'
                },
                {
                    title: 'Gran Premio 2',
                    start: '2025-04-25'
                },
                {
                    title: 'Gran Premio 3',
                    start: '2025-05-09'
                },
                {
                    title: 'Gran Premio 4',
                    start: '2025-05-20'
                }
            ]
        });
    }
});

//Quiz Plugin
$(document).ready(function() {
    $('#quiz').quiz({
        questions: [
            {
                'q': '¿Qué equipo ha ganado más campeonatos de la Marbula One?',
                'options': ['Savage Speeders', 'Green Ducks', 'Hazers', 'Team Momo'],
                'correctIndex': 0,
                'correctResponse': '¡Correcto!',
                'incorrectResponse': 'Incorrecto. La respuesta correcta es Savage Speeders.'
            },
            {
                'q': '¿En qué año ganó Green Ducks su primer campeonato?',
                'options': ['2018', '2019', '2020', '2021'],
                'correctIndex': 2,
                'correctResponse': '¡Bien hecho!',
                'incorrectResponse': 'Incorrecto. Fue en 2020.'
            },
            {
                'q': '¿Cuántos títulos ha ganado Team Momo?',
                'options': ['0', '1', '2', '3'],
                'correctIndex': 0,
                'correctResponse': '¡Exacto!',
                'incorrectResponse': 'Incorrecto. Team Momo no ha ganado ningún título.'
            },
            {
                'q': '¿Cuál fue el mejor puesto alcanzado por Team Galactic en la historia de la Marbula One?',
                'options': ['2º', '4º', '6º', '8º'],
                'correctIndex': 2,
                'correctResponse': '¡Correcto!',
                'incorrectResponse': 'Incorrecto. Su mejor puesto fue 6º.'
            }
        ],
        counterFormat: 'Pregunta %current de %total',
        resultsScreen: '#quiz-results-screen',
        homeButton: '#quiz-restart-btn'
    });
});
