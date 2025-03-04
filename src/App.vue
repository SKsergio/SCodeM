<template>
    <!-- body to the system -->
    <main>
        <EjemploComponent></EjemploComponent>
    </main>

    <!-- menu container -->
    <div class="menu">
        <MenuBtnComponent></MenuBtnComponent>
    </div>
    <aside class="aside">
        <MenuComponent></MenuComponent>
    </aside>
</template>

<script setup lang="ts">
import EjemploComponent from './components/buttons/EjemploComponent.vue';
import MenuComponent from './components/unics/MenuComponent.vue';
import MenuBtnComponent from './components/buttons/MenuBtnComponent.vue';


</script>

<style scoped>
    .aside {
        transition: all .6s ease;
    }
    /* menu icon responsive */
    .menu {
        position: fixed;
        right: 15px;
        top: 15px;
        display: none;
        z-index: 100;
    }

    @media (max-width:820px) {
        .menu {
            display: flex;
        }
    }
/* la idea es que al darle clic al componente del boton responsive del menu el contenido se ajuste, para lograr
esto lo haremos con props para mandarle el evento al boton y que cambie los tamanios del layaout */
</style>