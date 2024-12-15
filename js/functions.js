$(document).ready(() => {
    // Función para actualizar los contadores de visitas
    function actualizarContadores() {
        // Contador de visitas totales usando localStorage
        localStorage.totalVisits = (Number(localStorage.totalVisits) || 0) + 1;

        // Contador de visitas de la sesión actual usando sessionStorage
        sessionStorage.sessionVisits = (Number(sessionStorage.sessionVisits) || 0) + 1;

        // Mostrar los resultados en la página usando jQuery
        const contadorElement = $('#contador'); // Selección con jQuery
        if (contadorElement.length) {
            contadorElement.html(
                `Total de visitas (almacenado): ${localStorage.totalVisits}<br>` +
                `Visitas en esta sesión: ${sessionStorage.sessionVisits}`
            );
        } else {
            console.warn("Elemento con ID 'contador' no encontrado.");
        }
    }

    // Función para cargar contenido dinámico (header y footer)
    function loadContent(callback) {
        const basePath = window.location.pathname.includes('/html/') ? '../' : './';

        // Cargar el header usando jQuery
        $('#header').load(`${basePath}html/header.html`, function (response, status) {
            if (status === "error") {
                console.error("Error al cargar el header");
            }
        });

        // Cargar el footer usando jQuery y ejecutar callback
        $('#footer').load(`${basePath}html/footer.html`, function (response, status) {
            if (status === "error") {
                console.error("Error al cargar el footer");
            } else if (typeof callback === 'function') {
                callback(); // Ejecutar el callback después de cargar el footer
            }
        });
    }

    // Función para inicializar el mapa
    window.initMap = function () {
        const mapDiv = $("#map");

        if (!mapDiv.length) {
            console.error("El elemento con ID 'map' no existe en el DOM.");
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    const mapOptions = {
                        center: new google.maps.LatLng(userLat, userLng),
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.TERRAIN,
                    };

                    const map = new google.maps.Map(mapDiv[0], mapOptions);

                    new google.maps.Marker({
                        position: { lat: userLat, lng: userLng },
                        map: map,
                        title: "¡Estás aquí!",
                    });
                },
                function (error) {
                    console.error("Error al obtener la ubicación:", error.message);
                    alert("No se pudo obtener tu ubicación.");
                }
            );
        } else {
            alert("La geolocalización no es compatible con tu navegador.");
        }
    };

    // Manejador del menú hamburguesa
    $('.menu-toggle').click(() => {
        $('.opciones').toggleClass('visible');
    });

    // Para el carrusel
    const items = $('.carousel-item');
    const dots = $('.dot');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        items.removeClass('active');
        dots.removeClass('active');
        items.eq(index).addClass('active');
        dots.eq(index).addClass('active');
    };

    $('.next').click(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel(currentIndex);
    });

    $('.prev').click(() => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel(currentIndex);
    });

    dots.each((index, dot) => {
        $(dot).click(() => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel(currentIndex);
    }, 5000);

    // Comprueba si el nombre del archivo HTML es index.html o clasificacion.html o campeones.html
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('clasificacion.html') || window.location.pathname.endsWith('campeones.html')) {
        // Filtro dinámico en la tabla de clasificación
        const searchInput = $('<input>', {
            id: 'search-teams', // Asegúrate de asignar el ID correctamente
            type: 'text',
            placeholder: 'Buscar equipo...',
            css: { margin: '10px' }
        });

        // Coloca el buscador después del título
        $('.clasificacion h2').after(searchInput);

        // Añade la funcionalidad de filtro dinámico
        searchInput.on('input', function () {
            const filter = $(this).val().toLowerCase();
            $('.clasificacion tbody tr').each(function () {
                const teamName = $(this).children('td').eq(1).text().toLowerCase();
                $(this).toggle(teamName.includes(filter));
            });
        });
    }



    // Botón "scroll to top"
    const scrollTopButton = $('<button>', {
        id: 'scroll-top',
        text: '⬆️',
        css: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px',
            display: 'none'
        }
    });

    $('body').append(scrollTopButton);

    scrollTopButton.click(() => {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });

    $(window).scroll(() => {
        if ($(window).scrollTop() > 200) {
            scrollTopButton.show();
        } else {
            scrollTopButton.hide();
        }
    });

    // Redirigir a política de cookies
    $('#show-cookies').click((event) => {
        event.preventDefault();
        window.location.href = '/html/politica_cookies.html';
    });

    // Inicializar todo
    actualizarContadores();
    loadContent(window.initMap);
});

//Para buscador de escuderias.html
$(document).ready(() => {
    // Intercepta el evento de envío del formulario
    $('.buscador form').on('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario a Google

        // Obtener el valor del campo de búsqueda
        const filter = $(this).find('input[name="q"]').val().toLowerCase();

        // Filtrar las filas de la tabla
        $('.clasificacion tbody tr').each(function () {
            const teamName = $(this).children('td').eq(0).text().toLowerCase(); // Filtra por el nombre de la escudería (primera columna)
            $(this).toggle(teamName.includes(filter));
        });
    });

    // Permitir también que el filtro funcione en tiempo real al escribir
    $('.buscador input[name="q"]').on('input', function () {
        const filter = $(this).val().toLowerCase();
        $('.clasificacion tbody tr').each(function () {
            const teamName = $(this).children('td').eq(0).text().toLowerCase();
            $(this).toggle(teamName.includes(filter));
        });
    });
});

$(document).ready(function () {
    // Esconde todos los detalles al inicio
    $('#informacionGranPremio, #informacionGranPremio2, #informacionGranPremio3, #informacionGranPremio4').hide();

    // Evento de cambio en el select
    $('#granPremio').on('change', function () {
        const selectedValue = $(this).val();

        // Esconde todos los detalles de los Grandes Premios
        $('#informacionGranPremio, #informacionGranPremio2, #informacionGranPremio3, #informacionGranPremio4').hide();

        // Muestra solo el div correspondiente al Gran Premio seleccionado
        if (selectedValue === 'GP1') {
            $('#informacionGranPremio').fadeIn();
        } else if (selectedValue === 'GP2') {
            $('#informacionGranPremio2').fadeIn();
        } else if (selectedValue === 'GP3') {
            $('#informacionGranPremio3').fadeIn();
        } else if (selectedValue === 'GP4') {
            $('#informacionGranPremio4').fadeIn();
        }
    });

    // Muestra los detalles del primer Gran Premio por defecto
    $('#granPremio').trigger('change');
});

$(document).ready(function () {
    // Función que espera a que exista el elemento con la clase "search-container"
    function waitForElement(selector, callback) {
        const observer = new MutationObserver(function (mutations, observerInstance) {
            if ($(selector).length > 0) {
                observerInstance.disconnect(); // Dejar de observar el DOM
                callback();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Monitorear hasta que "search-container" exista en el DOM
    waitForElement('.search-container', function () {
        const searchInput = $('.search-container input[name="query"]');
        const suggestionBox = $('<div class="suggestion-box"></div>');

        // Añadir el cuadro de sugerencias debajo del buscador
        $('.search-container').css('position', 'relative').append(suggestionBox);

        // Obtener enlaces del menú del header
        const links = [];
        $('nav a').each(function () {
            const text = $(this).text().trim();
            const href = $(this).attr('href');
            if (text && href) {
                links.push({ text, href });
            }
        });

        // Evento para capturar entradas en el buscador
        searchInput.on('input', function () {
            const query = $(this).val().toLowerCase();
            suggestionBox.empty(); // Limpiar sugerencias anteriores

            if (query) {
                const filteredLinks = links.filter(link => link.text.toLowerCase().includes(query));
                if (filteredLinks.length) {
                    filteredLinks.forEach(link => {
                        const suggestion = $(`<div class="suggestion">${link.text}</div>`);
                        suggestionBox.append(suggestion);

                        // Redirigir al hacer clic en una sugerencia
                        suggestion.on('click', function () {
                            window.location.href = link.href;
                        });
                    });
                } else {
                    suggestionBox.append('<div class="suggestion no-result">No se encontraron resultados</div>');
                }
            }
        });

        // Evitar el envío del formulario
        $('.search-container form').on('submit', function (e) {
            e.preventDefault();
            const query = searchInput.val().toLowerCase();

            const result = links.find(link => link.text.toLowerCase().includes(query));
            if (result) {
                window.location.href = result.href;
            } else {
                alert("No se encontraron resultados para la búsqueda.");
            }
        });

        // Ocultar sugerencias al perder el foco
        searchInput.on('blur', function () {
            setTimeout(() => suggestionBox.empty(), 200);
        });

        // Estilos básicos para las sugerencias
        $('<style>')
            .prop('type', 'text/css')
            .html(`
                .suggestion-box {
                    position: absolute;
                    background: #fff;
                    border: 1px solid #ccc;
                    z-index: 1000;
                    max-height: 200px;
                    overflow-y: auto;
                    width: 100%;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    top: 100%;
                    left: 0;
                    margin-top: 2px;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    color: #333;
                }
                .suggestion {
                    padding: 8px 10px;
                    cursor: pointer;
                    border-bottom: 1px solid #f1f1f1;
                    background: #fff;
                }
                .suggestion:hover {
                    background: #f0f0f0;
                }
                .suggestion.no-result {
                    color: #999;
                    text-align: center;
                    padding: 8px 10px;
                }
            `)
            .appendTo('head');
    });
});
