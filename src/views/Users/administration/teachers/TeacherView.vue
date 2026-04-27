<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Teachers'" @open-modal="isModalOpen = true"></HeaderComponent>

        <!-- contendedor -->
        <slideTeacher></slideTeacher>

        <!-- modal de editar y crear -->
        <modalCrearEditar v-model="isModalOpen" @emitido="fetchAll()"></modalCrearEditar>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue';
import slideTeacher from './components/slideTeacher.vue';
import modalCrearEditar from './components/modalCrearEditar.vue';
import { useTeachers } from '@/composables/useTeachers';
import Load2Component from '@/components/loaders/Load2Component.vue';
import HeaderComponent from '@/components/templates/HeaderComponent.vue';

const isModalOpen = ref(false);
const teacherState = useTeachers();

// 2. Proveemos ese estado exacto al hijo
provide("teacherContext", teacherState);
const { loading, fetchAll } = teacherState;


onMounted(async () => {
    try {
        await fetchAll();
    } catch (e) {
        console.error('Falló la carga inicial', e);
    }
})
</script>

<style>
.conatiner_crud {
    width: 94%;
    margin: 0 auto;
    margin-top: 15px;
}

.conatiner__data_load {
    display: flex;
    flex-direction: column;
    position: relative;
}

.table__container {
    background: var(--color-third);
    display: flex;
    padding: 40px;
    border-radius: 25px 5px 25px 5px;
}

.img_file {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}
</style>