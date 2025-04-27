import { cargarJSON } from "./ajax.js";

document.addEventListener("DOMContentLoaded", function () {
    const inputBusqueda = document.querySelector(".buscador input[name='q']");
    const tablaCuerpo = document.querySelector("tbody");
    let datosEscuderias = [];

    if (inputBusqueda && tablaCuerpo) {
        inputBusqueda.addEventListener("keyup", function () {
            const termino = inputBusqueda.value.trim().toLowerCase();
            filtrarEscuderias(termino);
        });

        cargarEscuderias();
    }

    function cargarEscuderias() {
        cargarJSON(
            "https://dpwjulio-3fb56-default-rtdb.europe-west1.firebasedatabase.app/escuderias.json",
            function (datos) {
                if (datos) {
                    datosEscuderias = Array.isArray(datos) ? datos : Object.values(datos);
                    mostrarResultados(datosEscuderias);
                } else {
                    mostrarSinResultados();
                }
            },
            function (error) {
                mostrarSinResultados();
            }
        );
    }

    function filtrarEscuderias(termino) {
        if (termino.length === 0) {
            mostrarResultados(datosEscuderias);
        } else {
            const resultados = datosEscuderias.filter(escu =>
                escu.nombre.toLowerCase().includes(termino)
            );
            if (resultados.length > 0) {
                mostrarResultados(resultados);
            } else {
                mostrarSinResultados();
            }
        }
    }

    function mostrarResultados(escuderias) {
        tablaCuerpo.innerHTML = "";

        escuderias.forEach(escu => {
            const fila = `
                <tr>
                    <td>${escu.nombre}</td>
                    <td><img src="${escu.logo}" alt="${escu.nombre} Logo" width="100"></td>
                    <td>${escu.pais}</td>
                    <td>${escu.campeonatos}</td>
                    <td>${escu.color}</td>
                </tr>
            `;
            tablaCuerpo.innerHTML += fila;
        });
    }

    function mostrarSinResultados() {
        tablaCuerpo.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No se encontraron escuderías.</td>
            </tr>
        `;
    }
});
