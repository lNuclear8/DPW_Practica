document.addEventListener("DOMContentLoaded", function() {
    const textareaComentario = document.querySelector('.comentario');
    const botonEnviar = document.querySelector('.comentarios button');
    const listaComentarios = document.getElementById('lista-comentarios');

    // Función para renderizar todos los comentarios
    function mostrarComentarios() {
        listaComentarios.innerHTML = '';

        const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
        const ultimoComentarioSesion = sessionStorage.getItem('ultimoComentario');

        comentariosGuardados.forEach((comentario, index) => {
            const div = document.createElement('div');
            div.classList.add('comentario-guardado');

            // Si este comentario es el último de la sesión, lo resaltamos
            if (comentario === ultimoComentarioSesion) {
                div.style.backgroundColor = 'pink';
                div.style.border = '2px solid red';
            }

            div.innerHTML = `
                <p>${comentario}</p>
                <button class="borrar-comentario" data-index="${index}">Borrar</button>
            `;
            listaComentarios.appendChild(div);
        });
    }

    // Evento para enviar un comentario
    botonEnviar.addEventListener('click', function() {
        const texto = textareaComentario.value.trim();

        if (texto !== "") {
            const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
            comentariosGuardados.push(texto);
            localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

            // Guardar el último comentario en sessionStorage
            sessionStorage.setItem('ultimoComentario', texto);

            textareaComentario.value = "";
            mostrarComentarios();
        } else {
            alert("¡Escribe un comentario antes de enviar!");
        }
    });

    // Evento delegador para borrar comentarios
    listaComentarios.addEventListener('click', function(e) {
        if (e.target.classList.contains('borrar-comentario')) {
            const index = e.target.getAttribute('data-index');
            const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
            comentariosGuardados.splice(index, 1);
            localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

            mostrarComentarios();
        }
    });

    // Mostrar comentarios guardados al cargar
    mostrarComentarios();
});
