import { Hamburguesa } from './Hamburguesa';

// Crear un menú de hamburguesas usando la clase Hamburguesa
const menu = [
    new Hamburguesa("Hamburguesa Clásica", 8500),
    new Hamburguesa("Hamburguesa Texana", 9500),
    new Hamburguesa("Hamburguesa de Queso", 10000),
    new Hamburguesa("Hamburguesa Vegana", 12000)
];

// Función para cotizar hamburguesas utilizando prompt y alert
function cotizarConPromptYAlert() {
    const opcionesMenu = menu.map((item, index) => `${index}: ${item.nombre} - $${item.precio}`).join("\n");
    const tipoIndex = parseInt(prompt(`Elige tu hamburguesa (ingresa el número):\n${opcionesMenu}`));
    
    if (isNaN(tipoIndex) || tipoIndex < 0 || tipoIndex >= menu.length) {
        alert("Opción de hamburguesa no válida.");
        return;
    }
    
    const cantidad = parseInt(prompt("Ingresa la cantidad de hamburguesas:"));
    
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad no válida.");
        return;
    }
    
    const descuento = 15; 
    const hamburguesaSeleccionada = menu[tipoIndex];
    const total = hamburguesaSeleccionada.calcularTotal(cantidad, descuento);
    alert(`El precio total es: $${total}`);
}

// Ejecutar la función al cargar el archivo
cotizarConPromptYAlert();
