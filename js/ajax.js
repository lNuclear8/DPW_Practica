// Cargar contenido HTML y meterlo en un destino
export function cargarContenido(url, destinoId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const destino = document.getElementById(destinoId);
            if (xhr.status === 200) {
                destino.innerHTML = xhr.responseText;
            } else {
                destino.innerHTML = "<p>Error al cargar el contenido.</p>";
            }
        }
    };
    xhr.open("GET", url, true);//Se le pasa la url que corresponda en función del archivo donde haya sido ejecutado
    xhr.send();
}

//Cargar datos JSON desde una URL (Firebase o cualquier API)
export function cargarJSON(url, callbackSuccess, callbackError) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    callbackSuccess(data);
                } catch (e) {
                    console.error("Error al parsear JSON:", e);
                    if (callbackError) callbackError(e);
                }
            } else {
                console.error("Error al cargar datos: ", xhr.status);
                if (callbackError) callbackError(new Error(`Error ${xhr.status}`));
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}