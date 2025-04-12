<template>
    <!-- body to the system -->
    <main class="container__main">
        <router-view class="container__view" />
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
    import MenuBtnComponent from '@/components/buttons/MenuBtnComponent.vue';
    import MenuComponent from '@/components/unics/MenuComponent.vue';

    const isActive = ref(false)
    //menu
    const hide_sickMenu = ()=>{
        isActive.value = !isActive.value;
    }
</script>

<style scoped>
    @import url('../../css/content.css');
</style>