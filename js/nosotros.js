$(document).ready(function () {
    // Crear un nuevo objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Configurar la solicitud para obtener el archivo JSON
    xhr.open("GET", "../data/nosotros.json", true);

    // Configurar la función de callback cuando cambie el estado de la solicitud
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Verificar si la solicitud está completa
            if (xhr.status >= 200 && xhr.status < 300) { // Verificar si la respuesta es exitosa
                try {
                    const data = JSON.parse(xhr.responseText); // Parsear la respuesta JSON

                    // Selecciona el contenedor donde se añadirá el texto
                    const container = $(".texto");
                    container.empty(); // Limpia el contenedor antes de añadir contenido

                    // Itera sobre los textos en el JSON y los añade como párrafos
                    data.texto.forEach(parrafo => {
                        const pElement = `<p>${parrafo}</p>`;
                        container.append(pElement);
                    });
                } catch (error) {
                    console.error("Error al procesar el JSON:", error);
                }
            } else {
                console.error("Error al cargar el contenido de nosotros:", xhr.status, xhr.statusText);
            }
        }
    };

    // Manejar errores de red
    xhr.onerror = function () {
        console.error("Error de red al cargar el contenido de nosotros.");
    };

    // Enviar la solicitud
    xhr.send();
});
