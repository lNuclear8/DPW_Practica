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
- 🔜 Buscador de noticias con **AJAX**
- 🔜 Uso de **Cookies**
- ✅ Uso de **jQuery**

---

## Tecnologías utilizadas

### APIs HTML5 implementadas

- **Drag and Drop**
- **Google Maps API**
- **Session Storage** (para un login simulado – futura mejora)

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

## Buscador de noticias (próximamente)

Se integrará próximamente mediante **AJAX** para mejorar la experiencia de búsqueda en tiempo real.

---

## Cookies (próximamente)

Implementación pendiente para guardar preferencias del usuario y estado del login simulado.

---

## Uso de jQuery

- **Carrusel** en `index.html`.
- Funcionalidad del **menú hamburguesa** en `js/plugins.js`.

---
