class Carrito {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto) {
    const existente = this.productos.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad += producto.cantidad; 
    } else {
      this.productos.push(producto);
    }
  }

  eliminarProducto(indice) {
    this.productos.splice(indice, 1);
  }

  vaciarCarrito() {
    this.productos = [];
  }

  calcularTotal() {
    return this.productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  }

  mostrarCarritoEnDOM(carritoDOM) {
    carritoDOM.innerHTML = "";
    this.productos.forEach((producto, index) => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");
      div.innerHTML = `
        <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</p>
        <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
      `;
      carritoDOM.appendChild(div);
    });
    const total = document.createElement("p");
    total.classList.add("mt-3", "fw-bold");
    total.textContent = `Total: $${this.calcularTotal()}`;
    carritoDOM.appendChild(total);
  }
}

export default Carrito;
