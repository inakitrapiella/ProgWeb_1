import Hamburguesa from "./Hamburguesa.js";
import Carrito from "./Carrito.js";


const menuHamburguesas = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 8500 },
    { id: 2, nombre: "Hamburguesa Texana", precio: 9500 },
    { id: 3, nombre: "Hamburguesa de Queso", precio: 10000 },
    { id: 4, nombre: "Hamburguesa Vegana", precio: 12000 },
];

// Inicializar carrito
const carrito = new Carrito();

const carritoDOM = document.getElementById("carrito");
const hamburguesaSelector = document.getElementById("hamburguesaSelector");
const cantidadInput = document.getElementById("cantidadProducto");
const btnAgregar = document.getElementById("btn-agregar");
const calcularBtn = document.getElementById("calcularBtn");
const tipoHamburguesaSelect = document.getElementById("tipoHamburguesa");
const cantidadInputCotizador = document.getElementById("cantidad");
const resultadoCotizacion = document.getElementById("resultadoCotizacion");
const guardarBtn = document.getElementById("guardarBtn");


let hamburguesasEnMenu = menuHamburguesas.map(hamburguesa => new Hamburguesa(hamburguesa.nombre, hamburguesa.precio));


hamburguesasEnMenu.forEach((hamburguesa) => {
    const optionCarrito = document.createElement("option");
    optionCarrito.value = hamburguesa.precio;
    optionCarrito.textContent = hamburguesa.nombre + " - $" + hamburguesa.precio;
    optionCarrito.dataset.nombre = hamburguesa.nombre;
    hamburguesaSelector.appendChild(optionCarrito);

    const optionCotizador = document.createElement("option");
    optionCotizador.value = hamburguesa.precio;
    optionCotizador.textContent = hamburguesa.nombre + " - $" + hamburguesa.precio;
    optionCotizador.dataset.nombre = hamburguesa.nombre;
    tipoHamburguesaSelect.appendChild(optionCotizador);
});


let productosEnCarrito = [];

// Manejar evento para agregar al carrito
btnAgregar.addEventListener("click", () => {
    const selectedOption = hamburguesaSelector.options[hamburguesaSelector.selectedIndex];
    const nombre = selectedOption.dataset.nombre;
    const precio = parseFloat(selectedOption.value);
    const cantidad = parseInt(cantidadInput.value);
    const descuento = 10; 

if (nombre && !isNaN(precio) && cantidad > 0) {
    const hamburguesaSeleccionada = hamburguesasEnMenu.find(h => h.nombre === nombre);

    if (hamburguesaSeleccionada) {
    const totalConDescuento = hamburguesaSeleccionada.calcularTotal(cantidad, descuento);

    productosEnCarrito.push({ hamburguesa: hamburguesaSeleccionada, cantidad, total: totalConDescuento });
    carrito.agregarProducto({ nombre: hamburguesaSeleccionada.nombre, precio: hamburguesaSeleccionada.precio, cantidad, total: totalConDescuento });
    carrito.mostrarCarritoEnDOM(carritoDOM);
    }
} else {
    mostrarNotificacion("Por favor, completa todos los campos correctamente.", "error");
}
});

// Manejar eliminación de productos
carritoDOM.addEventListener("click", (e) => {
if (e.target.classList.contains("btn-eliminar")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    productosEnCarrito.splice(index, 1); 
    carrito.eliminarProducto(index);
    carrito.mostrarCarritoEnDOM(carritoDOM);
}
});

// Manejar el evento del botón Calcular Precio
calcularBtn.addEventListener("click", () => {
    const cantidad = parseInt(cantidadInputCotizador.value);
    const precioHamburguesa = parseFloat(tipoHamburguesaSelect.value);
    const descuento = 10; 

if (!isNaN(cantidad) && cantidad > 0 && !isNaN(precioHamburguesa)) {
    const hamburguesaCotizada = new Hamburguesa(tipoHamburguesaSelect.selectedOptions[0].dataset.nombre, precioHamburguesa);
    const totalConDescuento = hamburguesaCotizada.calcularTotal(cantidad, descuento);
    
    resultadoCotizacion.innerHTML = `
    <div class="alert alert-success mt-3">
        El precio total para ${cantidad} hamburguesa(s) con descuento es: <strong>$${totalConDescuento}</strong>
    </div>
    `;
} else {
    resultadoCotizacion.innerHTML = `
    <div class="alert alert-danger mt-3">
    Por favor, ingresa una cantidad válida y selecciona un tipo de hamburguesa.
    </div>
    `;
}
});

// Manejar el botón "Guardar Orden" 
guardarBtn.addEventListener("click", () => {
    const nombreCliente = document.getElementById("nombre").value.trim();
    const emailCliente = document.getElementById("email").value.trim();
    const tipoHamburguesa = tipoHamburguesaSelect.options[tipoHamburguesaSelect.selectedIndex].text;
    const cantidad = parseInt(cantidadInputCotizador.value);
    const precioHamburguesa = parseFloat(tipoHamburguesaSelect.value);
    const descuento = 10; 
    const total = (precioHamburguesa * cantidad) - (precioHamburguesa * (descuento / 100));

if (nombreCliente && emailCliente && !isNaN(cantidad) && cantidad > 0) {
    resultadoCotizacion.innerHTML = `
    <div class="alert alert-success mt-3">
        Orden guardada correctamente: <br>
        Cliente: <strong>${nombreCliente}</strong><br>
        Email: <strong>${emailCliente}</strong><br>
        Hamburguesa: <strong>${tipoHamburguesa}</strong><br>
        Cantidad: <strong>${cantidad}</strong><br>
        Total con descuento: <strong>$${total}</strong>
    </div>
    `;
} else {
    resultadoCotizacion.innerHTML = `
    <div class="alert alert-danger mt-3">
        Por favor, completa todos los campos correctamente.
    </div>
    `;
}
});

// Mostrar notificaciones en lugar de alert()
function mostrarNotificacion(mensaje, tipo) {
const notificacion = document.createElement("div");
notificacion.className = `alert alert-${tipo === "error" ? "danger" : "success"} mt-3`;
notificacion.textContent = mensaje;
document.body.prepend(notificacion);
setTimeout(() => notificacion.remove(), 3000);
}
