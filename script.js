// Función para calcular el descuento
function calcularDescuento(precio, descuento) {
    return precio - (precio * (descuento / 100));
}

// Función para cotizar hamburguesas
function cotizarHamburguesas(cantidad) {
    let precioUnitario = 8500; 
    let descuento = 15; 
    let total = calcularDescuento(precioUnitario * cantidad, descuento);
    alert(`El precio total por ${cantidad} hamburguesas es: $${total}`);
}

// Simular cotización
let cantidad = prompt("¿Cuántas hamburguesas deseas comprar?");
if (cantidad) {
    cotizarHamburguesas(cantidad);
}

// Validar formulario
function validarFormulario() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert(`El campo ${inputs[i].name} está vacío`);
            return false;
        }
    }
    alert("Formulario enviado correctamente");
    return true;
}

// Asignar la validación al formulario
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    if (validarFormulario()) {
        this.submit();
    }
});

// Menú de hamburguesas usando objetos y arrays
let menu = [
    { nombre: "Hamburguesa Clásica", precio: 8500 },
    { nombre: "Hamburguesa Texana", precio: 9500 },
    { nombre: "Hamburguesa Vegana", precio: 12000 }
];

// Mostrar el menú en la consola
menu.forEach(item => {
    console.log(`Platillo: ${item.nombre}, Precio: $${item.precio}`);
});