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

// Crear un menú de hamburguesas usando la clase Hamburguesa
const menu = [
    new Hamburguesa("Hamburguesa Clásica", 8500),
    new Hamburguesa("Hamburguesa Texana", 9500),
    new Hamburguesa("Hamburguesa de Queso", 10000),
    new Hamburguesa("Hamburguesa Vegana", 12000)
];

// Función para cotizar hamburguesas (sin interacción con el DOM)
function cotizar(tipoIndex, cantidad) {
    const descuento = 15; 
    if (cantidad > 0 && tipoIndex >= 0 && tipoIndex < menu.length) {
        const hamburguesaSeleccionada = menu[tipoIndex];
        const total = hamburguesaSeleccionada.calcularTotal(cantidad, descuento);
        return `El precio total es: $${total}`;
    } else {
        return "Por favor, ingresa una cantidad válida y selecciona un tipo de hamburguesa válido.";
    }
}