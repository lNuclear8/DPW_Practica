$(document).ready(function () {
    // Verificar si la ruta actual es index.html
    if (window.location.pathname.endsWith("index.html")) {
        // Si estás en index.html, cargar todas las noticias dinámicamente
        $.ajax({
            url: "../data/noticias.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                renderNoticias(data.noticias); // Renderizar todas las noticias
            },
            error: function (error) {
                console.error("Error al cargar todas las noticias:", error);
            }
        });
    } else {
        // Si no estás en index.html, agregar el botón debajo del buscador
        const botonVerTodas = $('<button>', {
            id: 'verTodasNoticias',
            text: 'Ver todas las noticias',
            class: 'btn-ver-todas' // Clase para aplicar estilos si es necesario
        });
        $(".buscador").append(botonVerTodas);

        // Manejo del evento de entrada en el campo de búsqueda
        $("#buscarNoticias").on("input", function () {
            const query = $(this).val().toLowerCase(); // Obtener el texto ingresado en minúsculas

            // Si el campo está vacío, no realiza ninguna búsqueda
            if (query.trim() === "") {
                renderNoticias([]); // Limpia el contenedor de noticias
                return;
            }

            // Realizar una solicitud AJAX para filtrar las noticias dinámicamente
            $.ajax({
                url: "../data/noticias.json",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    const filteredNoticias = data.noticias.filter(noticia =>
                        noticia.titulo.toLowerCase().includes(query) ||
                        noticia.descripcion.toLowerCase().includes(query)
                    );
                    renderNoticias(filteredNoticias); // Renderizar solo las noticias filtradas
                },
                error: function (error) {
                    console.error("Error al cargar las noticias:", error);
                }
            });
        });

        // Mostrar todas las noticias al hacer clic en el botón
        $("#verTodasNoticias").on("click", function () {
            $.ajax({
                url: "../data/noticias.json", // Ruta al archivo JSON
                method: "GET",
                dataType: "json",
                success: function (data) {
                    renderNoticias(data.noticias); // Renderizar todas las noticias
                },
                error: function (error) {
                    console.error("Error al cargar todas las noticias:", error);
                }
            });
        });
    }

    // Se utiliza DOM para actualizar el HTML en el contenedor de noticias
    function renderNoticias(noticias) {
        const container = $(".noticias_destacadas");
        container.empty(); // Vaciar el contenedor antes de renderizar
        noticias.forEach(noticia => {
            const noticiaHTML = `
                <div class="noticia">
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.descripcion}</p>
                    <a href="${noticia.enlace}" target="_blank">
                        <img src="${noticia.imagen}" alt="${noticia.alt}">
                    </a>
                </div>
            `;
            container.append(noticiaHTML);
        });
    }
});
