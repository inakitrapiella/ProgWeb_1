// Verifica si hay datos guardados en el local storage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("simuladorData");
    if (savedData) {
        const data = JSON.parse(savedData);
        mostrarDatos(data);
    }
});

// Función para calcular el precio total
function calcularPrecio() {
    const tipoHamburguesa = document.getElementById("tipoHamburguesa");
    const precioUnitario = parseInt(tipoHamburguesa.value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const total = precioUnitario * cantidad;

    const resultadoCotizacion = document.getElementById("resultadoCotizacion");
    resultadoCotizacion.innerHTML = `<strong>Total a pagar: $${total}</strong>`;
}

// Función para capturar datos ingresados por el usuario
function capturarDatos() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    const usuario = {
        nombre: nombre,
        email: email
    };

    localStorage.setItem("simuladorData", JSON.stringify(usuario));
    mostrarDatos(usuario);
}

// Función para mostrar datos en el DOM
function mostrarDatos(usuario) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h3>Bienvenido, ${usuario.nombre}!</h3>
        <p>Email registrado: ${usuario.email}</p>
    `;
}

// Función para guardar los datos de la orden en localStorage
function guardarOrden() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const tipoHamburguesa = document.getElementById("tipoHamburguesa").selectedOptions[0].text;
    const cantidad = document.getElementById("cantidad").value;
    const precioTotal = document.getElementById("resultadoCotizacion").textContent;

    if (!precioTotal) {
        alert("Por favor, calcula el precio antes de guardar la orden.");
        return;
    }

    const orden = {
        nombre: nombre,
        email: email,
        tipoHamburguesa: tipoHamburguesa,
        cantidad: cantidad,
        precioTotal: precioTotal
    };

    localStorage.setItem("ordenHamburguesas", JSON.stringify(orden));
    alert("Orden guardada exitosamente.");
}

// Asignación de eventos a los botones
document.getElementById("calcularBtn").addEventListener("click", calcularPrecio);
document.getElementById("guardarBtn").addEventListener("click", guardarOrden);
