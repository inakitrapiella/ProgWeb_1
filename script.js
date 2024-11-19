import Hamburguesa from './Hamburguesa';

// Ejemplo de uso de la clase Hamburguesa sin manipulación del DOM
const hamburguesa = new Hamburguesa("Clásica", 10); 

// Calcular precio con descuento
const descuento = 20; 
const precioConDescuento = hamburguesa.calcularDescuento(descuento);
console.log(`Precio con descuento: ${precioConDescuento}`);

// Calcular total con cantidad y descuento aplicado
const cantidad = 3; 
const totalConDescuento = hamburguesa.calcularTotal(cantidad, descuento);
console.log(`Total con descuento para ${cantidad} hamburguesas: ${totalConDescuento}`);
