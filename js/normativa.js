import { cargarContenido } from "./ajax.js";

const basePath = "./normativa/";

document.addEventListener("DOMContentLoaded", function () {
    // Por defecto cargamos cambios.html
    cargarContenido(`${basePath}cambios.html`, "contenido-dinamico");

    // Escuchamos los botones
    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", function () {
            const seccion = this.getAttribute("data-seccion");
            cargarContenido(`${basePath}${seccion}.html`, "contenido-dinamico");
        });
    });
});
