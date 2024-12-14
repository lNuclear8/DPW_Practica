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

    // Filtro dinámico en la tabla de clasificación
    const searchInput = $('<input>', {
        type: 'text',
        placeholder: 'Buscar equipo...',
        css: { margin: '10px' }
    });

    $('.clasificacion h2').after(searchInput);

    searchInput.on('input', () => {
        const filter = searchInput.val().toLowerCase();
        $('.clasificacion tbody tr').each(function () {
            const teamName = $(this).children('td').eq(1).text().toLowerCase();
            $(this).toggle(teamName.includes(filter));
        });
    });

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
