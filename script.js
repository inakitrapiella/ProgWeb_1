import Hamburguesa from "./Hamburguesa.js";
import Carrito from "./Carrito.js";

// Array con las hamburguesas
const menuHamburguesas = [
    new Hamburguesa(1, "Hamburguesa Clasica", 8500),
    new Hamburguesa(2, "Hamburguesa Texana", 9500),
    new Hamburguesa(3, "Hamburguesa de Queso", 10000),
    new Hamburguesa(4, "Hamburguesa Vegana", 12000),
];

// Inicializar carrito
const carrito = new Carrito();

const carritoDOM = document.getElementById("carrito");
const hamburguesaSelector = document.getElementById("hamburguesaSelector");
const cantidadInput = document.getElementById("cantidadProducto");
const btnAgregar = document.getElementById("btn-agregar");
const calcularBtn = document.getElementById("calcularBtn");
const resultadoCotizacion = document.getElementById("resultadoCotizacion");
const guardarBtn = document.getElementById("guardarBtn");

// Llenar ambos selects con las hamburguesas disponibles
const llenarHamburguesas = (selectorId) => {
    const selector = document.getElementById(selectorId);
    menuHamburguesas.forEach((hamburguesa) => {
        const option = document.createElement("option");
        option.value = hamburguesa.precio;
        option.textContent = `${hamburguesa.nombre} - $${hamburguesa.precio}`;
        option.dataset.nombre = hamburguesa.nombre;
        selector.appendChild(option);
    });
};

llenarHamburguesas("tipoHamburguesa");
llenarHamburguesas("hamburguesaSelector");

let productosEnCarrito = [];

btnAgregar.addEventListener("click", () => {
    const selectedOption = hamburguesaSelector.options[hamburguesaSelector.selectedIndex];
    const nombre = selectedOption.dataset.nombre;
    const precio = parseFloat(selectedOption.value); 
    const cantidad = parseInt(cantidadInput.value); 

    if (nombre && !isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
        const hamburguesaSeleccionada = menuHamburguesas.find(h => h.nombre === nombre);

        if (hamburguesaSeleccionada) {
            const totalSinDescuento = hamburguesaSeleccionada.precio * cantidad;

            productosEnCarrito.push({ hamburguesa: hamburguesaSeleccionada, cantidad, total: totalSinDescuento });
            carrito.agregarProducto({ nombre: hamburguesaSeleccionada.nombre, precio: hamburguesaSeleccionada.precio, cantidad, total: totalSinDescuento });
            carrito.mostrarCarritoEnDOM(carritoDOM);
        }
    } else {
        mostrarNotificacion("Por favor, completa todos los campos correctamente.", "error");
    }
});

// Mostrar el carrito actualizado y agregar el botón de eliminar a cada producto
carrito.mostrarCarritoEnDOM = (domElement) => {
    domElement.innerHTML = "";

    productosEnCarrito.forEach((producto, index) => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("producto");

        productoElement.innerHTML = `
            <p>${producto.hamburguesa.nombre} - Cantidad: ${producto.cantidad} - Total: $${producto.total}</p>
            <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        domElement.appendChild(productoElement);
    });

    // Agregar el evento de eliminar para cada producto
    const eliminarButtons = domElement.querySelectorAll(".btn-eliminar");
    eliminarButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            productosEnCarrito.splice(index, 1); 
            carrito.mostrarCarritoEnDOM(domElement);
        });
    });
};

// Manejar el evento del botón Calcular Precio
calcularBtn.addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precioHamburguesa = parseFloat(document.getElementById("tipoHamburguesa").value);

    if (!isNaN(cantidad) && cantidad > 0 && !isNaN(precioHamburguesa) && precioHamburguesa > 0) {
        const totalSinDescuento = precioHamburguesa * cantidad;
        resultadoCotizacion.innerHTML = `
            <div class="alert alert-success mt-3">
                El precio total para ${cantidad} hamburguesa(s) es: <strong>$${totalSinDescuento}</strong>
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

// Manejar el evento de "Guardar Orden"
guardarBtn.addEventListener("click", () => {
    const nombreCliente = document.getElementById("nombre").value.trim();
    const emailCliente = document.getElementById("email").value.trim();
    const tipoHamburguesa = document.getElementById("hamburguesaSelector").options[document.getElementById("hamburguesaSelector").selectedIndex].text;
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    const precioHamburguesa = parseFloat(document.getElementById("hamburguesaSelector").value);
    const totalSinDescuento = precioHamburguesa * cantidad;

    if (nombreCliente && emailCliente && !isNaN(cantidad) && cantidad > 0) {
        resultadoCotizacion.innerHTML = `
            <div class="alert alert-success mt-3">
                Orden guardada correctamente: <br>
                Cliente: <strong>${nombreCliente}</strong><br>
                Email: <strong>${emailCliente}</strong><br>
                Hamburguesa: <strong>${tipoHamburguesa}</strong><br>
                Cantidad: <strong>${cantidad}</strong><br>
                Total sin descuento: <strong>$${totalSinDescuento}</strong>
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
