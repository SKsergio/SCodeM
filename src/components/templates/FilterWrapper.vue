<template>
    <Transition
        name="accordion"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
    >
        <div v-if="show" class="filters__wrapper">
            <slot />
        </div>
    </Transition>
</template>

<script setup lang="ts">
// Recibimos el estado de visibilidad directamente como Prop
defineProps<{
    show: boolean
}>();

const onEnter = (el: Element) => {
    const htmlEl = el as HTMLElement;
    // Estado inicial en 0
    htmlEl.style.height = '0';
    htmlEl.style.paddingTop = '0';
    htmlEl.style.paddingBottom = '0';
    htmlEl.style.opacity = '0';
    htmlEl.style.overflow = 'hidden'; // Corta el desborde al entrar

    // Forzar un reflow del navegador (Crucial para que CSS registre el inicio)
    void htmlEl.offsetHeight;

    // Leer el alto exacto que requiere el contenido y animar hacia él
    htmlEl.style.height = htmlEl.scrollHeight + 'px';
    htmlEl.style.paddingTop = '15px'; // Tu padding real
    htmlEl.style.paddingBottom = '15px'; // Tu padding real
    htmlEl.style.opacity = '1';
};

const onAfterEnter = (el: Element) => {
    const htmlEl = el as HTMLElement;
    // Limpieza: Dejamos que el DOM fluya natural
    htmlEl.style.height = 'auto';
    // Devolvemos a visible por si tienes un Datepicker o Dropdown que necesite salir del contenedor
    htmlEl.style.overflow = 'visible'; 
};

const onLeave = (el: Element) => {
    const htmlEl = el as HTMLElement;
    // Fijar la altura actual en píxeles antes de empezar a encoger
    htmlEl.style.height = htmlEl.getBoundingClientRect().height + 'px';
    htmlEl.style.overflow = 'hidden'; // Cortar desbordes antes de salir

    void htmlEl.offsetHeight; // Forzar reflow

    htmlEl.style.height = '0';
    htmlEl.style.paddingTop = '0';
    htmlEl.style.paddingBottom = '0';
    htmlEl.style.opacity = '0';
};
</script>

<style scoped>
.filters__wrapper {
    width: 100%;
    /* Quitamos el padding vertical de aquí, JS lo inyecta dinámicamente para que no "salte" */
    padding-left: 40px;
    padding-right: 40px;
    background-color: var(--color-fifth);
    border-bottom: 1px solid var(--color-lines);
    position: relative;
    box-shadow: 0 10px 15px -8px rgba(0, 0, 0, 0.35);

    display: flex;
    justify-content: center;
    align-items: center;

    /* Delegamos la animación a CSS, pero los valores exactos los pone JS */
    transition: height 0.3s ease-in-out, padding 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
</style>