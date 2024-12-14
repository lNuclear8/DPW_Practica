$(document).ready(function () {
    let noticiasData = []; // Variable para almacenar las noticias cargadas

    // Cargar las noticias dinámicamente con AJAX
    $.ajax({
        url: "../data/noticias.json", // Ruta al archivo JSON
        method: "GET",
        dataType: "json",
        success: function (data) {
            noticiasData = data.noticias; // Guardar las noticias en la variable
            renderNoticias(noticiasData); // Renderizar todas las noticias inicialmente
        },
        error: function (error) {
            console.error("Error al cargar las noticias:", error);
        }
    });

    // Función para renderizar noticias en el contenedor
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

    // Manejo del evento de entrada en el campo de búsqueda
    $("#buscarNoticias").on("input", function () {
        const query = $(this).val().toLowerCase(); // Obtener el texto ingresado en minúsculas
        const filteredNoticias = noticiasData.filter(noticia =>
            noticia.titulo.toLowerCase().includes(query) ||
            noticia.descripcion.toLowerCase().includes(query)
        );
        renderNoticias(filteredNoticias); // Renderizar solo las noticias filtradas
    });
});
