class Carrito {
    constructor() {
        this.productos = [];
    }

    // Agregar producto al carrito
    agregarProducto(producto) {
        this.productos.push(producto);
        this.actualizarStorage();
    }

    // Eliminar producto del carrito por su índice
    eliminarProducto(indice) {
        this.productos.splice(indice, 1);
        this.actualizarStorage();
    }

    // Vaciar el carrito
    vaciarCarrito() {
        this.productos = [];
        this.actualizarStorage();
    }

    // Guardar en localStorage
    actualizarStorage() {
        localStorage.setItem("carrito", JSON.stringify(this.productos));
    }

    // Cargar desde localStorage
    cargarDesdeStorage() {
        const data = JSON.parse(localStorage.getItem("carrito"));
        this.productos = data ? data : [];
    }

    // Mostrar carrito en el DOM
    mostrarCarritoEnDOM(elementoDOM) {
        elementoDOM.innerHTML = ""; 
        this.productos.forEach((producto, index) => {
            const item = document.createElement("div");
            item.className = "producto-carrito";
            item.innerHTML = `
                <p>${producto.nombre} - $${producto.precio}</p>
                <button data-index="${index}" class="btn-eliminar">Eliminar</button>
            `;
            elementoDOM.appendChild(item);
        });
    }
}

export default Carrito;