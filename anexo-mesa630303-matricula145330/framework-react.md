# Framework - React

##  Descripción general

React es una biblioteca (pero también considerado framework) de JavaScript desarrollada por Meta (Facebook) para construir interfaces de usuario interactivas y reutilizables mediante componentes.

- Orientado a componentes.
- DOM virtual que mejora el rendimiento.
- Amplio ecosistema (React Router, Redux, etc.).

---

##  Motivación y justificación

React permite dividir la aplicación en componentes reutilizables. En este proyecto, cada parte (selector de hamburguesas, carrito, cotizador, etc.) podría ser un componente separado, haciendo el mantenimiento más escalable y ordenado.

---

## Nivel de dificultad de adaptacion

Se considera una *curva de aprendizaje media* en base a los siguientes criterios objetivos:

- Requiere comprender el concepto de componentes reutilizables.
- Introduce JSX, que combina HTML y JavaScript en el mismo archivo.
- Es necesario configurar un entorno moderno (Node.js, Vite o Create React App).
- Manejo del estado (useState, props) implica cambiar la logica imperativa por logica declarativa.

No se considera alta porque:
- La sintaxis es cercana a JavaScript moderno.
- Existe abundante documentación oficial y comunidad activa.
- Puede aprenderse progresivamente comenzando por componentes simples.

Por estos, se clasifica como dificultad *media* y no baja (por el cambio conceptual) ni alta (por su buena documentacion y adopción masiva).

---

##  Ejemplo de código - "Antes y después"

**Actualmente (JavaScript puro):**

[Ver script.js – línea 37](https://github.com/inakitrapiella/ProgWeb_1/blob/dff8913d160465ae920d408eb9113d165035bba5/script.js#L37C1-L37C76)


```js
const hamburguesaSelector = document.getElementById("hamburguesaSelector");
hamburguesas.forEach(h => {
  const option = document.createElement("option");
  option.textContent = h.nombre;
  hamburguesaSelector.appendChild(option);
});
```
### Con react

```js
function HamburguesaSelector({ hamburguesas }) {
  return (
    <select>
      {hamburguesas.map(h => (
        <option key={h.id} value={h.precio}>
          {h.nombre}
        </option>
      ))}
    </select>
  );
}