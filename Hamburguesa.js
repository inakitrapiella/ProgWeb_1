class Hamburguesa {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    calcularDescuento(descuento) {
        return this.precio - (this.precio * (descuento / 100));
    }

    calcularTotal(cantidad, descuento) {
        return this.calcularDescuento(descuento) * cantidad;
    }
}

export default Hamburguesa;
