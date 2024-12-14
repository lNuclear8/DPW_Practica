$(document).ready(function () {
    // Carrito de compras
    const carrito = [];

    // Función para actualizar la tabla del carrito
    function actualizarCarrito() {
        const tbody = $('.carrito tbody');
        tbody.empty(); // Limpia la tabla antes de actualizar
        let total = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.cantidad * item.precio;
            total += subtotal;

            // Agregar fila al carrito
            const fila = `
                <tr>
                    <td><img src="${item.imagen}" alt="${item.nombre}" style="width: 50px;"> ${item.nombre}</td>
                    <td>
                        <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="cantidad-carrito">
                    </td>
                    <td>${item.precio.toFixed(2)}€</td>
                    <td>${subtotal.toFixed(2)}€</td>
                    <td>
                        <button type="button" class="eliminar-producto" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.append(fila);
        });

        // Actualizar el total
        $('.total p').html(`<strong>Total:</strong> ${total.toFixed(2)}€`);
    }

    // Evento para añadir artículos al carrito
    $('.articulo button').click(function () {
        const articulo = $(this).closest('.articulo');
        const nombre = articulo.find('h3').text();
        const precio = parseFloat(articulo.find('strong').text().replace('€', ''));
        const imagen = articulo.find('img').attr('src');

        // Comprobar si el artículo ya está en el carrito
        const existente = carrito.find(item => item.nombre === nombre);
        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({
                nombre,
                precio,
                imagen,
                cantidad: 1
            });
        }

        actualizarCarrito();
    });

    // Evento para eliminar un artículo del carrito
    $('.carrito').on('click', '.eliminar-producto', function () {
        const index = $(this).data('index');
        carrito.splice(index, 1); // Elimina el producto del carrito
        actualizarCarrito();
    });

    // Evento para cambiar la cantidad de un artículo
    $('.carrito').on('input', '.cantidad-carrito', function () {
        const index = $(this).data('index');
        const nuevaCantidad = parseInt($(this).val(), 10);
        if (nuevaCantidad > 0) {
            carrito[index].cantidad = nuevaCantidad;
        } else {
            carrito[index].cantidad = 1; // Evitar cantidades menores a 1
        }
        actualizarCarrito();
    });

    // Botón para continuar comprando
    $('.acciones button:contains("Continuar comprando")').click(function () {
        alert('Continúa explorando nuestra tienda para añadir más artículos.');
    });

    // Botón para proceder al pago
    $('.acciones button:contains("Proceder al pago")').click(function () {
        if (carrito.length === 0) {
            alert('El carrito está vacío. Añade artículos antes de proceder al pago.');
        } else {
            alert('Gracias por tu compra. ¡Procesando el pedido!');
            carrito.length = 0; // Vaciar el carrito después de la compra
            actualizarCarrito();
        }
    });
});
