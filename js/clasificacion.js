import { cargarJSON } from "./ajax.js";

document.addEventListener("DOMContentLoaded", function () {
    const inputBusqueda = document.querySelector(".buscador input[name='q']");
    const tablaCuerpo = document.querySelector("tbody");
    let datosEquipos = []; // Guardar todos los equipos

    if (inputBusqueda && tablaCuerpo) {
        inputBusqueda.addEventListener("keyup", function () {
            const termino = inputBusqueda.value.trim().toLowerCase();
            filtrarEquipos(termino);
        });

        cargarEquipos();
    }

    function cargarEquipos() {
        cargarJSON(
            "https://dpwjulio-3fb56-default-rtdb.europe-west1.firebasedatabase.app/equipos.json",
            function (datos) {
                if (datos) {
                    datosEquipos = Array.isArray(datos) ? datos : Object.values(datos);
                    mostrarResultados(datosEquipos);
                } else {
                    mostrarSinResultados();
                }
            },
            function (error) {
                mostrarSinResultados();
            }
        );
    }

    function filtrarEquipos(termino) {
        if (termino.length === 0) {
            mostrarResultados(datosEquipos);
        } else {
            const resultados = datosEquipos.filter(equipo =>
                equipo.nombre.toLowerCase().includes(termino)
            );
            if (resultados.length > 0) {
                mostrarResultados(resultados);
            } else {
                mostrarSinResultados();
            }
        }
    }

    function mostrarResultados(equipos) {
        tablaCuerpo.innerHTML = "";

        equipos.forEach((equipo, index) => {
            const fila = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${equipo.nombre}</td>
                    <td>${equipo.puntos}</td>
                    <td>${equipo.victorias}</td>
                    <td>${equipo.podios}</td>
                    <td>${equipo.mejorPuesto || "—"}</td>
                    <td>${equipo.ultimaCarrera || "—"}</td>
                </tr>
            `;
            tablaCuerpo.innerHTML += fila;
        });
    }

    function mostrarSinResultados() {
        tablaCuerpo.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No se encontraron equipos.</td>
            </tr>
        `;
    }
});
