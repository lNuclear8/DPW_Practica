import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push, get, child } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBohv8NAl_Esw4CRiw97AMpZhQ-at719KA",
    authDomain: "dpwjulio-3fb56.firebaseapp.com",
    databaseURL: "https://dpwjulio-3fb56-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "dpwjulio-3fb56",
    storageBucket: "dpwjulio-3fb56.appspot.com",
    messagingSenderId: "921986849343",
    appId: "1:921986849343:web:a15f3cf514d94b5703768a",
    measurementId: "G-320LRJQ51F"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Cargar los productos desde Firebase
async function cargarProductos() {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, "productos"));
        if (snapshot.exists()) {
            const productos = snapshot.val();
            const contenedor = document.querySelector(".elementos_listables");

            contenedor.innerHTML = "";

            Object.keys(productos).forEach(id => {
                const producto = productos[id];

                const elemento = document.createElement("div");
                elemento.classList.add("elemento");
                elemento.id = id;
                elemento.draggable = true;
                elemento.ondragstart = drag;
                elemento.setAttribute("data-precio", producto.precio);

                elemento.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p><strong>Precio: €${producto.precio}</strong></p>
                `;

                contenedor.appendChild(elemento);
            });

            //Cargamos carrito
            cargarCarritoDesdeCookie();

        } else {
            console.log("No se encontraron productos.");
        }
    } catch (error) {
        console.error("Error al cargar productos: ", error);
    }
}

// Cargamos los productos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    cargarProductos(); // Esto ya llama a cargarCarritoDesdeCookie internamente.

    document.getElementById("carrito").addEventListener("dragleave", function () {
        this.classList.remove("dragover");
    });
});

// Evento para comprar
document.getElementById("comprar-flotante").addEventListener("click", async function() {
    const productos = [];
    const filas = document.querySelectorAll("#carrito-body-flotante tr");

    filas.forEach(fila => {
        const producto = {
            nombre: fila.cells[0].textContent,
            cantidad: parseInt(fila.cells[1].textContent),
            total: fila.cells[2].textContent.replace('€', '').trim()
        };
        productos.push(producto);
    });

    if (productos.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const pedido = {
        productos: productos,
        fecha: new Date().toISOString()
    };

    try {
        await push(ref(db, "pedidos"), pedido);
        alert("¡Pedido realizado con éxito!");
        document.getElementById("carrito-body-flotante").innerHTML = "";
        document.getElementById("total-carrito-flotante").textContent = "Total: €0.00";
    } catch (error) {
        console.error("Error al enviar pedido: ", error);
        alert("Error al realizar el pedido. Intenta de nuevo.");
    }
});

// Funciones para manejar cookies
function guardarCarritoEnCookie() {
    const carrito = [];
    const filas = document.querySelectorAll("#carrito-body-flotante tr");

    filas.forEach(fila => {
        carrito.push({
            nombre: fila.cells[0].textContent,
            cantidad: parseInt(fila.cells[1].textContent),
            precio: parseFloat(fila.cells[2].textContent.replace('€', '').trim()) || 0
        });
    });

    document.cookie = "carrito=" + encodeURIComponent(JSON.stringify(carrito)) + "; path=/";
}

function cargarCarritoDesdeCookie() {
    const cookies = document.cookie.split("; ");
    const carritoCookie = cookies.find(row => row.startsWith("carrito="));
    if (carritoCookie) {
        const carrito = JSON.parse(decodeURIComponent(carritoCookie.split("=")[1]));

        carrito.forEach(producto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>€${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><button onclick="borrarProducto(this)">❌</button></td>
            `;
            document.getElementById("carrito-body-flotante").appendChild(fila);
        });

        actualizarTotal();
    }
}

// Funciones de carrito (antes de DOMContentLoaded)

function allowDrop(ev) {
    ev.preventDefault();
    document.getElementById("carrito").classList.add("dragover");
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function actualizarTotal() {
    let total = 0;
    const filas = document.querySelectorAll("#carrito-body-flotante tr");

    filas.forEach(fila => {
        const nombre = fila.cells[0].textContent;
        const cantidad = parseInt(fila.cells[1].textContent);

        const productoOriginal = [...document.querySelectorAll(".elemento")]
            .find(p => p.querySelector("h3").textContent === nombre);

        if (productoOriginal) {
            const precio = parseFloat(productoOriginal.getAttribute("data-precio"));
            total += precio * cantidad;
            fila.cells[2].textContent = `€${(precio * cantidad).toFixed(2)}`;
        }
    });

    document.getElementById("total-carrito-flotante").textContent = `Total: €${total.toFixed(2)}`;
}

function borrarProducto(boton) {
    const fila = boton.closest('tr');
    const nombreProducto = fila.cells[0].textContent;

    fila.remove(); // Borramos del DOM

    actualizarTotal(); // Volvemos a actualizar total

    // Actualizamos la cookie SIN ese producto
    const cookies = document.cookie.split("; ");
    const carritoCookie = cookies.find(row => row.startsWith("carrito="));
    if (carritoCookie) {
        let carrito = JSON.parse(decodeURIComponent(carritoCookie.split("=")[1]));

        // Filtrar el producto que queremos eliminar
        carrito = carrito.filter(item => item.nombre !== nombreProducto);

        // Volvemos a guardar la cookie actualizada
        document.cookie = "carrito=" + encodeURIComponent(JSON.stringify(carrito)) + "; path=/";
    }
}

function drop(ev) {
    ev.preventDefault();
    document.getElementById("carrito").classList.remove("dragover");

    const data = ev.dataTransfer.getData("text");
    const original = document.getElementById(data);
    const nombre = original.querySelector("h3").textContent;

    const carritoBody = document.getElementById("carrito-body-flotante");
    const filas = carritoBody.getElementsByTagName("tr");

    for (let fila of filas) {
        if (fila.cells[0].textContent === nombre) {
            let cantidad = parseInt(fila.cells[1].textContent);
            fila.cells[1].textContent = cantidad + 1;
            actualizarTotal();
            guardarCarritoEnCookie();
            return;
        }
    }

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>1</td>
        <td>-</td>
        <td><button onclick="borrarProducto(this)">❌</button></td>
    `;
    carritoBody.appendChild(fila);
    actualizarTotal();
    guardarCarritoEnCookie();
}

// Hacer globales las funciones para que funcionen en el HTML
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.borrarProducto = borrarProducto;