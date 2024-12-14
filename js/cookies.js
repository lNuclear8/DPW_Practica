document.addEventListener('DOMContentLoaded', () => {
    // Observa cambios en el DOM para asegurarse de que el footer esté cargado
    const observer = new MutationObserver(() => {
        const banner = document.getElementById('cookies-banner');
        const acceptButton = document.getElementById('accept-cookies');
        const rejectButton = document.getElementById('reject-cookies');
        const logsArea = document.getElementById('logs');

        if (banner) {
            // Footer cargado correctamente, iniciar lógica de cookies
            observer.disconnect(); // Detener la observación

            // Función para mostrar los logs de lo que va ocurriendo
            function log(message) {
                if (logsArea) {
                    logsArea.value += message + '\n';
                } else {
                    console.log(message);
                }
            }

            // Función para crear una Cookie en el navegador incluyendo key y valor
            function crearCookie(key, value) {
                const expires = new Date();
                expires.setTime(expires.getTime() + 86400000); // 1 día = 86.400.000 milisegundos
                const cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`;
                document.cookie = cookie;
                log(`crearCookie: ${cookie}`);
            }

            // Función para leer una Cookie del navegador dada una key y mostrar su valor
            function leerCookie(key) {
                const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
                if (keyValue) {
                    log(`leerCookie: ${key}=${keyValue[2]}`);
                    return keyValue[2];
                } else {
                    log(`leerCookie: ${key}=null`);
                    return null;
                }
            }

            // Función para borrar una Cookie del navegador dada una key
            function eliminarCookie(key) {
                document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
                log(`eliminarCookie: ${key}`);
            }

            // Mostrar el banner de cookies si no se ha establecido el consentimiento
            const consent = leerCookie('cookies-consent');
            if (!consent) {
                banner.style.display = 'block';
            }

            // Cuando el usuario acepta las cookies
            acceptButton.addEventListener('click', () => {
                crearCookie('cookies-consent', 'accepted');
                banner.style.display = 'none';
                alert('Gracias por aceptar las cookies. ¡Disfruta de la navegación!');
            });

            // Cuando el usuario rechaza las cookies
            rejectButton.addEventListener('click', () => {
                crearCookie('cookies-consent', 'rejected');
                banner.style.display = 'none';
                alert('Has rechazado las cookies. Algunas funcionalidades pueden no estar disponibles.');
            });
        }
    });

    // Iniciar la observación del documento
    observer.observe(document.body, { childList: true, subtree: true });
});

// Función para mostrar los logs de lo que va ocurriendo
function log(log) {
    document.getElementById("logs").value += log + '\n';
}

// Función para crear una Cookie en el navegador incluyendo key y valor
function crearCookie(key, value) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 86400000); // 1 día = 86.400.000 milisegundos
    const cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookie;
    log(`Crear Cookie: ${cookie}`);
}

// Función para leer una Cookie del navegador dada una key y mostrar su valor
function leerCookie(key) {
    const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    if (keyValue) {
        log(`Leer Cookie: ${key}=${keyValue[2]}`);
    } else {
        log(`Leer Cookie: ${key}=null`);
    }
}

// Función para borrar una Cookie del navegador dada una key
function eliminarCookie(key) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    log(`Eliminar Cookie: ${key}`);
}