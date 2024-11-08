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

// Función para cotizar hamburguesas
function cotizar() {
    const tipoHamburguesa = document.getElementById("hamburguesaTipo");
    const precio = parseFloat(tipoHamburguesa.value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const descuento = 15;

    if (cantidad > 0) {
        const total = (precio - (precio * (descuento / 100))) * cantidad;
        document.getElementById("resultadoCotizacion").textContent = `El precio total es: $${total}`;
    } else {
        document.getElementById("resultadoCotizacion").textContent = "Por favor, ingresa una cantidad válida.";
    }
}
