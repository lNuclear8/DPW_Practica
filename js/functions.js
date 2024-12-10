// Función para actualizar los contadores de visitas
function actualizarContadores() {
    // Contador de visitas totales usando localStorage
    if (localStorage.totalVisits) {
        localStorage.totalVisits = Number(localStorage.totalVisits) + 1;
    } else {
        localStorage.totalVisits = 1;
    }

    // Contador de visitas de la sesión actual usando sessionStorage
    if (sessionStorage.sessionVisits) {
        sessionStorage.sessionVisits = Number(sessionStorage.sessionVisits) + 1;
    } else {
        sessionStorage.sessionVisits = 1;
    }

    // Mostrar los resultados en la página
    const contadorElement = document.getElementById("contador");
    if (contadorElement) {
        contadorElement.innerHTML =
            "Total de visitas (almacenado): " + localStorage.totalVisits +
            "<br>Visitas en esta sesión: " + sessionStorage.sessionVisits;
    } else {
        console.warn("Elemento con ID 'contador' no encontrado.");
    }
}

// Función para cargar contenido dinámico (header y footer)
function loadContent(callback) {
    // Cargar el header
    fetch('./html/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el header.");
            }
            return response.text();
        })
        .then(data => {
            const headerElement = document.getElementById('header');
            if (headerElement) {
                headerElement.innerHTML = data;
            } else {
                console.warn("Elemento con ID 'header' no encontrado.");
            }
        })
        .catch(error => console.error(error));

    // Cargar el footer y ejecutar callback después de cargarlo
    fetch('./html/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el footer.");
            }
            return response.text();
        })
        .then(data => {
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = data;

                // Ejecutar el callback después de cargar el footer
                if (typeof callback === "function") {
                    callback();
                }
            } else {
                console.warn("Elemento con ID 'footer' no encontrado.");
            }
        })
        .catch(error => console.error(error));
}

// Función para inicializar el mapa
window.initMap = function () {
    const mapDiv = document.getElementById("map");

    // Verifica que el contenedor del mapa exista
    if (!mapDiv) {
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

                const map = new google.maps.Map(mapDiv, mapOptions);

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

// Ejecutar funciones iniciales al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Actualiza los contadores y carga el contenido dinámico
    actualizarContadores();
    loadContent(initMap); // Llama a initMap solo después de cargar el footer
});

//Manejador menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que los elementos están presentes
    const waitForElements = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const opciones = document.querySelector('.opciones');

        if (menuToggle && opciones) {
            console.log(menuToggle, opciones); // Comprobar si existen
            menuToggle.addEventListener('click', () => {
                opciones.classList.toggle('visible');
            });
        } else {
            console.warn('Elementos no encontrados, esperando...');
            setTimeout(waitForElements, 100); // Reintentar después de 100ms
        }
    };
    waitForElements();
});
