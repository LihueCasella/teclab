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
