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

## Nivel de dificultad de adaptacion

La clasificacion se fundamenta en criterios tecnicos medibles:

| Aspecto | Nivel | Justificacion |
|----------|--------|---------------|
| Curva de aprendizaje | Baja | Sintaxis cercana a HTML y JavaScript tradicional |
| Configuracion inicial | Baja a Media | Puede usarse por CDN sin entorno complejo o mediante Vite |
| Documentacion | Alta | Documentacion oficial clara, estructurada y con ejemplos prácticos |

Vue se considera de dificultad baja a media porque:

- Permite integracion progresiva sin reescribir todo el proyecto.
- Mantiene separación clara entre template, logica y estilos.
- El sistema reactivo esta integrado sin necesidad de librerias externas.

No se clasifica como alta porque no requiere TypeScript obligatorio ni una arquitectura rigida inicial.

---

##  Ejemplo de codigo - "Antes y después"

### Antes (JavaScript puro)
[Ver script.js – línea 37](https://github.com/inakitrapiella/ProgWeb_1/blob/dff8913d160465ae920d408eb9113d165035bba5/script.js#L37C1-L37C76)


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