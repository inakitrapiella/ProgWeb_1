import Hamburguesa from "./Hamburguesa.js";
import Carrito from "./Carrito.js";

// Array con las hamburguesas
let menuHamburguesas = [];

fetch("./hamburguesas.json")
    .then(response => response.json())
    .then(data => {
        menuHamburguesas = data.map(h => new Hamburguesa(h.id, h.nombre, h.precio));
        
        // Llenar los selectores una vez cargado el JSON
        llenarHamburguesas("hamburguesaSelector");
    })
    .catch(error => {
        console.error("Error al cargar las hamburguesas:", error);       
    });

// Inicializar carrito
const carrito = new Carrito();

const carritoDOM = document.getElementById("carrito");
const hamburguesaSelector = document.getElementById("hamburguesaSelector");
const cantidadInput = document.getElementById("cantidadProducto");
const btnAgregar = document.getElementById("btn-agregar");
const resultadoCotizacion = document.getElementById("resultadoCotizacion");
const guardarBtn = document.getElementById("guardarBtn");

// Llenar ambos selects con las hamburguesas disponibles
const llenarHamburguesas = (selectorId) => {
    const selector = document.getElementById(selectorId);
    menuHamburguesas.forEach((hamburguesa) => {
        const option = document.createElement("option");
        option.value = hamburguesa.precio;
        option.textContent = `${hamburguesa.nombre} - $${hamburguesa.precio}`;
        option.dataset.nombre = hamburguesa.nombre;
        selector.appendChild(option);
    });
};

let productosEnCarrito = [];

btnAgregar.addEventListener("click", () => {
    const selectedOption = hamburguesaSelector.options[hamburguesaSelector.selectedIndex];
    const nombre = selectedOption.dataset.nombre;
    const precio = parseFloat(selectedOption.value); 
    const cantidad = parseInt(cantidadInput.value); 

    if (nombre && !isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
        const hamburguesaSeleccionada = menuHamburguesas.find(h => h.nombre === nombre);

        if (hamburguesaSeleccionada) {
            const totalSinDescuento = hamburguesaSeleccionada.precio * cantidad;

            productosEnCarrito.push({ hamburguesa: hamburguesaSeleccionada, cantidad, total: totalSinDescuento });
            carrito.agregarProducto({ nombre: hamburguesaSeleccionada.nombre, precio: hamburguesaSeleccionada.precio, cantidad, total: totalSinDescuento });
            carrito.mostrarCarritoEnDOM(carritoDOM);
        }
    } else {
        mostrarNotificacion("Por favor, completa todos los campos correctamente.", "error");
    }
});

// Mostrar el carrito actualizado y agregar el boton de eliminar a cada producto
carrito.mostrarCarritoEnDOM = (domElement) => {
    domElement.innerHTML = "";

    productosEnCarrito.forEach((producto, index) => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("producto");

        productoElement.innerHTML = `
            <p>${producto.hamburguesa.nombre} - Cantidad: ${producto.cantidad} - Total: $${producto.total}</p>
            <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        domElement.appendChild(productoElement);
    });

    // Agregar el evento de eliminar para cada producto
    const eliminarButtons = domElement.querySelectorAll(".btn-eliminar");
    eliminarButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            productosEnCarrito.splice(index, 1); 
            carrito.mostrarCarritoEnDOM(domElement);
        });
    });
};

// Manejar el evento de "Guardar Orden"
guardarBtn.addEventListener("click", () => {
    const nombreCliente = document.getElementById("nombre").value.trim();
    const emailCliente = document.getElementById("email").value.trim();
    const tipoHamburguesa = document.getElementById("hamburguesaSelector").options[document.getElementById("hamburguesaSelector").selectedIndex].text;
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    const precioHamburguesa = parseFloat(document.getElementById("hamburguesaSelector").value);
    const totalSinDescuento = precioHamburguesa * cantidad;

    if (nombreCliente && emailCliente && !isNaN(cantidad) && cantidad > 0) {
        resultadoCotizacion.innerHTML = `
            <div class="alert alert-success mt-3">
                Orden guardada correctamente: <br>
                Cliente: <strong>${nombreCliente}</strong><br>
                Email: <strong>${emailCliente}</strong><br>
                Hamburguesa: <strong>${tipoHamburguesa}</strong><br>
                Cantidad: <strong>${cantidad}</strong><br>
                Total sin descuento: <strong>$${totalSinDescuento}</strong>
            </div>
        `;
    } else {
        resultadoCotizacion.innerHTML = `
            <div class="alert alert-danger mt-3">
                Por favor, completa todos los campos correctamente.
            </div>
        `;
    }
});

// Mostrar notificaciones en lugar de alert()
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement("div");
    notificacion.className = `alert alert-${tipo === "error" ? "danger" : "success"} mt-3`;
    notificacion.textContent = mensaje;
    document.body.prepend(notificacion);
    setTimeout(() => notificacion.remove(), 3000);
}

// Recetas con TheMealDB
document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipes-container');
    const searchInput = document.getElementById('recipe-search');

    const fetchRecipes = async (query = '') => {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayRecipes(data.meals || []);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const displayRecipes = (recipes) => {
        recipesContainer.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
                <h3>${recipe.strMeal}</h3>
                <p>${recipe.strInstructions.substring(0, 100)}...</p>
                <a href="${recipe.strSource}" target="_blank">Ver más</a>
            </div>
        `).join('');
    };

    // inicializar fetch
    fetchRecipes('burger');

    // busqueda
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        fetchRecipes(query);
    });
});
