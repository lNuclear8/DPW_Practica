// Configuración de Firebase
const firebaseConfig = {
    databaseURL: "https://dpwjs-51152-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Variables globales
let carrito = [];

// Cargar Header, Footer y luego inicializar todo
function cargarHeaderYFooter() {
    return new Promise((resolve) => {
        $("#header").load("header.html", () => {
            $("#footer").load("footer.html", resolve); // Resolver al cargar el footer
        });
    });
}

// Cargar productos desde Firebase
function cargarProductos() {
    const articulosDiv = $("#articulos");
    db.ref("productos").once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
            const producto = childSnapshot.val();
            const id = childSnapshot.key;

            const productoHTML = `
            <div class="articulo" data-id="${id}">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
              <p><strong>Precio:</strong> €${producto.precio}</p>
              <button onclick="añadirAlCarrito('${id}', '${producto.nombre}', ${producto.precio})">Añadir al carrito</button>
            </div>
          `;
            articulosDiv.append(productoHTML);
        });
    });
}

// Inicializar Google Maps
function initMap() {
    const mapOptions = {
        center: { lat: 40.7128, lng: -74.0060 }, // Coordenadas de ejemplo
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// Funciones del carrito
function añadirAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoBodyFlotante = $("#carrito-body-flotante");
    const totalCarritoFlotante = $("#total-carrito-flotante");

    carritoBodyFlotante.empty();
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        carritoBodyFlotante.append(`
            <tr>
              <td>${item.nombre}</td>
              <td>${item.cantidad}</td>
              <td>€${subtotal.toFixed(2)}</td>
              <td><button onclick="eliminarDelCarrito(${index})">X</button></td>
            </tr>
        `);
    });

    totalCarritoFlotante.html(`Total: €${total.toFixed(2)}`);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Procesar compra
$(document).on("click", "#comprar-flotante", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const pedido = {
        productos: carrito,
        total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
        fecha: new Date().toISOString()
    };

    db.ref("pedidos").push(pedido, error => {
        if (error) {
            alert("Error al procesar el pedido: " + error.message);
        } else {
            alert("Pedido realizado con éxito");
            carrito = [];
            actualizarCarrito();
        }
    });
});

// Inicializar todo
$(document).ready(() => {
    cargarHeaderYFooter().then(() => {
        cargarProductos();
        if (typeof google !== "undefined") {
            initMap(); // Inicializar Google Maps solo si se cargó
        }
    });
});
