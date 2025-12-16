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

##  Nivel de dificultad de adaptación

- Curva de aprendizaje media.
- Requiere configurar un entorno (como Vite o CRA).
- JSX puede requerir adaptación si se viene de JS puro.

---

##  Ejemplo de código - "Antes y después"

**Actualmente (JavaScript puro):**

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