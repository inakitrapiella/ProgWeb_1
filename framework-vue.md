# Framework - Vue

##  Descripción general

Vue.js es un framework progresivo de JavaScript creado por Evan You, diseñado para desarrollar interfaces de usuario de manera declarativa y eficiente. Está enfocado en la simplicidad y facilidad de integración, lo que lo hace ideal tanto para proyectos pequeños como para aplicaciones complejas.

###  Características destacadas

- Enlace bidireccional de datos con `v-model`.
- Basado en componentes reutilizables.
- Sintaxis muy cercana a HTML estándar.
- Ligero, rápido y fácil de aprender.
- Ecosistema modular: Vue Router, Pinia/Vuex, Nuxt.js.

---

##  Motivación y justificación

Vue permitiría organizar el proyecto en componentes como `<HamburguesaSelector>`, `<Carrito>`, `<Cotizador>` o `<FormularioCliente>`. Esto mejora la mantenibilidad del código y permite reutilizar lógica fácilmente.

Vue es especialmente atractivo por su **baja curva de aprendizaje**, ideal para desarrolladores con experiencia en HTML/CSS/JS. Además, puede integrarse de forma progresiva en el proyecto actual, sin necesidad de reescribirlo completamente.

---

##  Nivel de dificultad de adaptación

| Aspecto              | Nivel       |
|----------------------|-------------|
| Curva de aprendizaje | Baja        |
| Configuración inicial| Baja a media|
| Documentación        | Excelente   |

Vue puede integrarse directamente con un CDN (`<script src="...vue.js">`) o mediante un entorno más robusto como **Vite** o **Vue CLI**. Se adapta fácilmente a proyectos en evolución sin grandes reestructuraciones.

---

##  Ejemplo de código - "Antes y después"

### Antes (JavaScript puro)

```js
const hamburguesaSelector = document.getElementById("hamburguesaSelector");

menuHamburguesas.forEach(h => {
  const option = document.createElement("option");
  option.textContent = h.nombre;
  option.value = h.precio;
  hamburguesaSelector.appendChild(option);
});
```
### Con Vue
```js
<template>
  <select v-model="seleccion" @change="handleChange">
    <option v-for="h in hamburguesas" :key="h.id" :value="h.precio">
      {{ h.nombre }} - ${{ h.precio }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['hamburguesas'],
  data() {
    return {
      seleccion: null
    };
  },
  methods: {
    handleChange() {
      this.$emit('select', this.seleccion);
    }
  }
};
</script>