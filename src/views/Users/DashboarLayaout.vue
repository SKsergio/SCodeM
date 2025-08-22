<template>
    <!-- overlay to use in modals -->
    <div class="overlay__modal" v-if="showModal"></div>

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
    import MenuComponent from '@/components/templates/MenuComponent.vue';
    import { useModalStore } from '@/store/CreateModel';
    import { storeToRefs } from 'pinia'

    //mostrar modales
    const ModelManage =  useModalStore();
    const {showModal} = storeToRefs(ModelManage)
    const isActive = ref(false)

    //menu
    const hide_sickMenu = ()=>{
        isActive.value = !isActive.value;
    }


</script>

<style scoped>
    @import url('../../css/content.css');
    .overlay__modal{
        position: fixed;
        background-color: rgba(26, 25, 25, 0.603);
        width: 100%;
        height: 100%;
        z-index: 20;
    }
</style>