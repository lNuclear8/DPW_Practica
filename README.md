# Proyecto Marbula One – Diseño y Programación Web

Este proyecto forma parte de la asignatura **Diseño y Programación Web** del 4º curso del Grado en Ingeniería Informática en Tecnologías de la Información.

Consiste en el desarrollo de una página web basada en el universo de **Marbula One**, enfocada completamente al **front-end** utilizando las tres tecnologías web fundamentales:

- **HTML**
- **CSS**
- **JavaScript** (con uso adicional de **jQuery**)

---

## Requisitos mínimos implementados

- ✅ Uso de **al menos 2 APIs HTML5**
- ✅ Inserción de **elementos multimedia**
- ✅ Diseño **responsive** con CSS3 y Media Queries
- ✅ **Menú hamburguesa** funcional
- ✅ Buscador de noticias con **AJAX**
- ✅ Uso de **Cookies**
- ✅ Uso de **jQuery**

---

## Tecnologías utilizadas

### APIs HTML5 implementadas

- **Drag and Drop**
- **Google Maps API**
- **Local Storage**
- **Session Storage**

---

### Multimedia

En `galeria.html` se han incluido elementos como:

- **iframes** embebidos con contenido externo

---

### Estilos y Responsividad

- El archivo `styles.css` centraliza los estilos **comunes** de la web (estructura, layout general, header, center, footer…).
- Cada archivo `.css` incluye su propia **media query**, en lugar de centralizarlas, siguiendo buenas prácticas de modularidad y mantenimiento.
- Se ha utilizado **Bootstrap 5** para todas las tablas, mejorando la responsividad.
- En `escuderias.html` se ha empleado un **acordeón con Bootstrap 5**.
- El enfoque del desarrollo CSS ha sido mantener la **máxima simplicidad sin comprometer la funcionalidad**.

---

## Menú Hamburguesa

- Aparece exclusivamente en la vista móvil.
- La funcionalidad se implementa con **jQuery**, ubicada en `js/plugins.js`.

---

## AJAX

En este proyecto se utiliza **AJAX** con el objeto nativo `XMLHttpRequest` para cargar datos de manera asíncrona, mejorando la experiencia de usuario:

- **Carga dinámica de contenido HTML:**  
  Se emplea la función `cargarContenido(url, destinoId)` para insertar archivos `.html` externos en la sección deseada de la página sin necesidad de recargarla.  
  **Ejemplo:** En `normativa.html` y `calendario.html`, al hacer clic en los botones de pestañas (`tab-btn`), se carga el contenido relacionado en un `div` mediante AJAX.

- **Carga y procesamiento de archivos JSON:**  
  Se utiliza la función `cargarJSON(url, callbackSuccess, callbackError)` para obtener datos estructurados en formato JSON desde Firebase Realtime Database.  
  **Ejemplo:** En `clasificacion.html` y `escuderias.html`, se cargan los equipos y las escuderías respectivamente desde una base de datos en la nube, y se filtran/buscan de forma dinámica en la tabla según lo que escribe el usuario.

**Resumen del flujo de trabajo AJAX:**

1. **Solicitud** asíncrona con `XMLHttpRequest`.
2. **Procesamiento** de la respuesta con `onreadystatechange`.
3. **Inserción** dinámica del contenido o los datos JSON en el DOM.
4. **Gestión de errores** mediante funciones de callback en caso de fallo de red o formato incorrecto.

---

## Cookies

En este proyecto se utilizan cookies para **guardar el carrito de la compra**.

- Cada vez que el usuario arrastra un producto al carrito (`drop`) o elimina un producto (`borrarProducto`), se **actualiza una cookie** llamada `carrito`, que contiene un array con los productos actuales del carrito en formato JSON.
- Al cargar la página, si existe la cookie `carrito`, se **reconstruye el carrito automáticamente** para no perder los productos añadidos anteriormente (`cargarCarritoDesdeCookie`).
- Cuando el usuario realiza una compra exitosa (`comprar-flotante`), después de guardar el pedido en Firebase, **se elimina la cookie** estableciendo su `max-age=0`.

**Resumen de flujo de cookies:**

1. **Guardar cookie:** al añadir/eliminar productos (`guardarCarritoEnCookie`).
2. **Leer cookie:** al cargar la página (`cargarCarritoDesdeCookie`).
3. **Borrar cookie:** después de confirmar la compra (`document.cookie = "carrito=; path=/; max-age=0"`).

Así se garantiza una **experiencia persistente** para el carrito, incluso si el usuario recarga la página o navega por otras secciones.

---

## Uso de jQuery

- Plugin **Carrusel** en `index.html`.
- Funcionalidad del **menú hamburguesa** en `js/plugins.js`.
- Plugin **FullCalendar** en `calendario.html`.
- Plugin **Quiz Plugin** en `campeones.html`.
---

## Extras

- **Uso de Favicon:**  
  Todas las páginas incluyen un favicon personalizado (`favicon.ico`) visible en la pestaña del navegador.

- **Firebase Realtime Database:**  
  Se utilizan datos alojados en **Firebase** para cargar dinámicamente:
    - Equipos (`equipos.json`)
    - Escuderías (`escuderias.json`)
    - Productos de tienda (`productos`)
    - Pedidos de compra (`pedidos`)

- **Firebase Hosting:**  
  El proyecto completo está desplegado online a través de **Firebase Hosting**.  
  **Hosting URL:** [https://dpwjulio-3fb56.web.app](https://dpwjulio-3fb56.web.app)

---