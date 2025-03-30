<template>
    <!-- body to the system -->
    <main>
        <EjemploComponent></EjemploComponent>
    </main>
    <!-- menu container -->
    <MenuComponent class="aside" ref="menuDaD"></MenuComponent>
    <!-- responsive boton -->
    <div class="menu">
        <MenuBtnComponent @click="hide_sickMenu()"></MenuBtnComponent>
    </div>


</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import EjemploComponent from './components/buttons/EjemploComponent.vue';
    import MenuComponent from './components/unics/MenuComponent.vue';
    import MenuBtnComponent from './components/buttons/MenuBtnComponent.vue';

    //menu
    const menuDaD: Ref<HTMLElement | null> = ref(null)//manejando tipos del DOM con ts
    const hide_sickMenu = ()=>{
        alert('eSTOY AQUI')
        console.log('eSTOY');
        
        menuDaD.value?.classList.toggle('change_menuCt')
    }
</script>

<style scoped>
    .aside {
        transition: all .4s ease;
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
    .change_menuCt{
        left: 300px;
    }
/* la idea es que al darle clic al componente del boton responsive del menu el contenido se ajuste, para lograr
esto lo haremos con props para mandarle el evento al boton y que cambie los tamanios del layaout */
</style>