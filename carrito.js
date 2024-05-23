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
    
const mp = new MercadoPago('YOUR_APP_USR-705b5d90-9931-4024-bfb8-74a7c1676008');
const bricksBuilder = mp.bricks();

mp.bricks().create("wallet", "wallet_container", {
    initialization: {
        preferenceId: "<PREFERENCE_ID>",
    },
 customization: {
  texts: {
   valueProp: 'smart_option',
  },
  },
 });
 

});
