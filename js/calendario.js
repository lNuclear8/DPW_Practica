import { cargarContenido } from './ajax.js';

const basePath = "./calendario/";

document.addEventListener("DOMContentLoaded", function () {
    cargarContenido(`${basePath}gp1.html`, "contenido-dinamico");

    const selectGranPremio = document.getElementById("granPremio");

    if (selectGranPremio) {
        selectGranPremio.addEventListener("change", function () {
            const seccion = this.value;
            cargarContenido(`${basePath}${seccion}.html`, "contenido-dinamico");
        });
    }
});

