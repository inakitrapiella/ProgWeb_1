import Hamburguesa from "./Hamburguesa.js";
import Carrito from "./Carrito.js";

// Array con las hamburguesas
let menuHamburguesas = [];
const carrito = new Carrito();


fetch("./hamburguesas.json")
    .then(response => response.json())
    .then(data => {
        menuHamburguesas = data.map(h => new Hamburguesa(h.id, h.nombre, h.precio));
        
        // Llenar los selectores una vez cargado el JSON
        llenarHamburguesas("hamburguesaSelector");
        cargarCarritoDesdeLocalStorage();
    })
    .catch(error => {
        console.error("Error al cargar las hamburguesas:", error);       
    });

    const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito.productos));
};

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        const productos = JSON.parse(carritoGuardado);
        carrito.vaciarCarrito();
        productos.forEach(p => carrito.agregarProducto(p));
        carrito.mostrarCarritoEnDOM(carritoDOM);
    }
};

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

btnAgregar.addEventListener("click", () => {
    const selectedOption = hamburguesaSelector.options[hamburguesaSelector.selectedIndex];
    const nombre = selectedOption.dataset.nombre;
    const precio = parseFloat(selectedOption.value); 
    const cantidad = parseInt(cantidadInput.value); 

    if (nombre && !isNaN(precio) && !isNaN(cantidad) && cantidad > 0) {
        const hamburguesaSeleccionada = menuHamburguesas.find(h => h.nombre === nombre);

        if (hamburguesaSeleccionada) {
            const totalSinDescuento = hamburguesaSeleccionada.precio * cantidad;
            
            carrito.agregarProducto({ nombre: hamburguesaSeleccionada.nombre, precio: hamburguesaSeleccionada.precio, cantidad, total: totalSinDescuento });
            guardarCarritoEnLocalStorage();
            carrito.mostrarCarritoEnDOM(carritoDOM);
        }
    } else {
        mostrarNotificacion("Por favor, completa todos los campos correctamente.", "error");
    }
});

// Mostrar el carrito actualizado y agregar el boton de eliminar a cada producto
carrito.mostrarCarritoEnDOM = (domElement) => {
    domElement.innerHTML = "";

    carrito.productos.forEach((producto, index) => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("producto");

        productoElement.innerHTML = `
            <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Total: $${producto.precio * producto.cantidad}</p>
            <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        domElement.appendChild(productoElement);
    });

    // Mostrar total
    const totalElement = document.createElement("p");
    totalElement.classList.add("mt-3", "fw-bold");
    totalElement.textContent = `Total: $${carrito.calcularTotal()}`;
    domElement.appendChild(totalElement);

    // Botones eliminar
    const eliminarButtons = domElement.querySelectorAll(".btn-eliminar");
    eliminarButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            carrito.eliminarProducto(index);
            guardarCarritoEnLocalStorage();
            carrito.mostrarCarritoEnDOM(domElement);
        });
    });
};

// Manejar el evento de "Guardar Orden"
guardarBtn.addEventListener("click", () => {
    const nombreCliente = document.getElementById("nombre").value.trim();
    const emailCliente = document.getElementById("email").value.trim();

    if (nombreCliente && emailCliente && carrito.productos.length > 0) {
        let resumenProductos = "";
        carrito.productos.forEach(p => {
            resumenProductos += `
                <li>${p.nombre} - Cantidad: ${p.cantidad} - Total: $${p.precio * p.cantidad}</li>
            `;
        });

        resultadoCotizacion.innerHTML = `
            <div class="alert alert-success mt-3">
                Orden guardada correctamente: <br>
                Cliente: <strong>${nombreCliente}</strong><br>
                Email: <strong>${emailCliente}</strong><br>
                <ul>${resumenProductos}</ul>
                <strong>Total general: $${carrito.calcularTotal()}</strong>
            </div>
        `;
    } else {
        resultadoCotizacion.innerHTML = `
            <div class="alert alert-danger mt-3">
                Por favor, completa todos los campos correctamente y agrega productos al carrito.
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