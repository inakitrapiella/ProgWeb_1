import Hamburguesa from "./Hamburguesa.js";
import Carrito from "./Carrito.js"




document.getElementById("btn-agregar").addEventListener("click", () => {
    const nombre = document.getElementById("nombreProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);

    if (nombre && !isNaN(precio)) {
        const nuevaHamburguesa = new Hamburguesa(nombre, precio); 
        carrito.agregarProducto({ nombre: nuevaHamburguesa.nombre, precio: nuevaHamburguesa.precio });
        carrito.mostrarCarritoEnDOM(document.getElementById("carrito"));
    } else {
        mostrarNotificacion("Por favor, completa todos los campos.", "error");
    }
});


// Inicializar carrito y cargar datos del storage
const carrito = new Carrito();
carrito.cargarDesdeStorage();

// Manejar eventos en el DOM
document.addEventListener("DOMContentLoaded", () => {
    const carritoDOM = document.getElementById("carrito");

    // Actualizar la vista inicial del carrito
    carrito.mostrarCarritoEnDOM(carritoDOM);

    // Agregar producto al carrito
    document.getElementById("btn-agregar").addEventListener("click", () => {
        const nombre = document.getElementById("nombreProducto").value;
        const precio = parseFloat(document.getElementById("precioProducto").value);

        if (nombre && !isNaN(precio)) {
            carrito.agregarProducto({ nombre, precio });
            carrito.mostrarCarritoEnDOM(carritoDOM);
        } else {
            mostrarNotificacion("Por favor, completa todos los campos.", "error");
        }
    });

    // Eliminar producto del carrito
    carritoDOM.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-eliminar")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            carrito.eliminarProducto(index);
            carrito.mostrarCarritoEnDOM(carritoDOM);
        }
    });
});

// Mostrar notificaciones en lugar de alert()
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement("div");
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerText = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000); 
}
