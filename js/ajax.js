// HTML
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
    xhr.open("GET", url, true);
    xhr.send();
}

//JSON
export function cargarJSON(url, callbackSuccess, callbackError) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    callbackSuccess(data);
                } catch (e) {
                    if (callbackError) callbackError(e);
                }
            } else {
                if (callbackError) callbackError(new Error(`Error ${xhr.status}`));
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}