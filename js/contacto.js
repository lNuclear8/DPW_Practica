document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".formulario form");

    if (formulario) {
        cargarDatosFormulario();

        formulario.addEventListener("input", function () {
            guardarDatosFormulario();
        });

        formulario.addEventListener("submit", function (event) {
            event.preventDefault(); // Evitamos que se envíe normalmente

            const datosFormulario = recolectarDatosFormulario();

            fetch('https://dpwjulio-3fb56-default-rtdb.europe-west1.firebasedatabase.app/consultas.json', {
                method: "POST",
                body: JSON.stringify(datosFormulario),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        sessionStorage.removeItem("datosFormulario");
                        formulario.reset();
                        alert("¡Formulario enviado correctamente!");
                    } else {
                        alert("Error al enviar el formulario. Inténtalo de nuevo.");
                    }
                })
                .catch(error => {
                    console.error("Error al enviar los datos:", error);
                    alert("Error al enviar el formulario. Inténtalo más tarde.");
                });
        });
    }

    function recolectarDatosFormulario() {
        const datos = {};
        const inputs = formulario.querySelectorAll("input, textarea, select");

        inputs.forEach(input => {
            if (input.type === "checkbox") {
                if (!datos[input.name]) {
                    datos[input.name] = [];
                }
                if (input.checked) {
                    datos[input.name].push(input.value);
                }
            } else if (input.type === "radio") {
                if (input.checked) {
                    datos[input.name] = input.value;
                }
            } else {
                datos[input.name] = input.value;
            }
        });

        return datos;
    }

    function guardarDatosFormulario() {
        const datos = {};
        const inputs = formulario.querySelectorAll("input, textarea, select");

        inputs.forEach(input => {
            if (input.type === "checkbox" || input.type === "radio") {
                datos[input.id] = input.checked;
            } else {
                datos[input.id] = input.value;
            }
        });

        sessionStorage.setItem("datosFormulario", JSON.stringify(datos));
    }

    function cargarDatosFormulario() {
        const datosGuardados = sessionStorage.getItem("datosFormulario");

        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);

            for (const id in datos) {
                const input = document.getElementById(id);
                if (input) {
                    if (input.type === "checkbox" || input.type === "radio") {
                        input.checked = datos[id];
                    } else {
                        input.value = datos[id];
                    }
                }
            }
        }
    }
});
