
// Clase para representar una Hamburguesa
class Hamburguesa {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    // Método para calcular el precio con descuento
    calcularDescuento(descuento) {
        return this.precio - (this.precio * (descuento / 100));
    }

    // Método para calcular el total con la cantidad y el descuento aplicado
    calcularTotal(cantidad, descuento) {
        return this.calcularDescuento(descuento) * cantidad;
    }
}

// Exportar la clase para usarla en otros archivos
export default Hamburguesa;
