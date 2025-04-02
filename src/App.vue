<template>
    <!-- body to the system -->
    <main>
        <router-view></router-view>
    </main>
    <!-- menu container -->
    <MenuComponent class="aside" v-model:isActiveSignal="isActive"></MenuComponent>
    <!-- responsive boton -->
    <div class="menu">
        <MenuBtnComponent @click.stop="hide_sickMenu()"></MenuBtnComponent>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import MenuComponent from './components/unics/MenuComponent.vue';
    import MenuBtnComponent from './components/buttons/MenuBtnComponent.vue';

    const isActive = ref(false)
    //menu
    const hide_sickMenu = ()=>{
        isActive.value = !isActive.value;
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
/* la idea es que al darle clic al componente del boton responsive del menu el contenido se ajuste, para lograr
esto lo haremos con props para mandarle el evento al boton y que cambie los tamanios del layaout */
</style>