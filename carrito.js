document.addEventListener('DOMContentLoaded', function() {
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    const notification = document.createElement('div');
    notification.className = 'notification hidden';
    document.body.appendChild(notification);

    // Función para mostrar la notificación
    function mostrarNotificacion(mensaje) {
        notification.textContent = mensaje;
        notification.classList.remove('hidden');
        setTimeout(function() {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Función para calcular el total
    function calcularTotal() {
        let totalPrecio = 0;
        const itemsCarrito = listaCarrito.querySelectorAll('li');
        itemsCarrito.forEach(function(item) {
            const precio = parseFloat(item.dataset.precio);
            totalPrecio += precio;
        });
        total.textContent = 'Total: $' + totalPrecio.toFixed(2);
    }

    // Cargar carrito desde el localStorage al cargar la página
    function cargarCarritoDesdeLocalStorage() {
        if (localStorage.getItem('carrito')) {
            listaCarrito.innerHTML = localStorage.getItem('carrito');
            calcularTotal();
        }
    }

    // Evento para vaciar el carrito
    botonVaciarCarrito.addEventListener('click', function() {
        listaCarrito.innerHTML = '';
        total.textContent = 'Total: $0.00';
        localStorage.removeItem('carrito');
        mostrarNotificacion('El carrito ha sido vaciado');
    });

    // Evento para añadir un artículo al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito-btn');
    botonesAgregarCarrito.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const nombre = this.dataset.nombre;
            const precio = parseFloat(this.dataset.precio);

            const itemCarrito = document.createElement('li');
            itemCarrito.textContent = nombre + ' - $' + precio.toFixed(2);
            itemCarrito.dataset.precio = precio;

            listaCarrito.appendChild(itemCarrito);
            calcularTotal();

            // Guardar carrito en el localStorage
            localStorage.setItem('carrito', listaCarrito.innerHTML);

            mostrarNotificacion(nombre + ' ha sido añadido al carrito');
        });
    });

    // Cargar carrito desde el localStorage al cargar la página
    cargarCarritoDesdeLocalStorage();
    
    // Manejar el evento de clic en el botón "Pagar con Mercado Pago"
    document.getElementById("ir-a-pagos").addEventListener("click", function() {
        // Configura tu preferencia de pago con Mercado Pago
        var preference = {
            items: [
                {
                    title: 'Producto',
                    unit_price: 100.00,
                    quantity: 1
                }
            ]
        };

        // Crea una preferencia de pago utilizando el SDK de Mercado Pago
        fetch('https://sdk.mercadopago.com/js/v2', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer APP_USR-2474841785568653-061519-6a1cdb7ba7bfe244c0abd5cf9f10d7fb-302241524', // Reemplaza ACCESS_TOKEN con tu token de acceso de Mercado Pago
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preference)
        })
        .then(response => response.json())
        .then(data => {
            // Redirige al usuario a la página de pago de Mercado Pago con la preferencia de pago recién creada
            window.location.href = data.init_point;
        })
        .catch(error => {
            console.error('Error al crear la preferencia de pago:', error);
        });
    });
});

