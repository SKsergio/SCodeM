<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Teachers'" @open-modal="isModalOpen = true"></HeaderComponent>

        <!-- contendedor -->
        <slideTeacher @edit="handleEdit" @delete="handleDelete"></slideTeacher>

        <!-- modal de editar y crear -->
        <modalCrearEditar v-model="isModalOpen" @emitido="fetchAll()" :teacher-data="requestTeacherData"></modalCrearEditar>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue';
import slideTeacher from './components/slideTeacher.vue';
import modalCrearEditar from './components/modalCrearEditar.vue';
import { useTeachers } from '@/composables/useTeachers';
import Load2Component from '@/components/loaders/Load2Component.vue';
import HeaderComponent from '@/components/templates/HeaderComponent.vue';
import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
import { TeacherEditResponse } from '@/interfaces/Teacher/TeacherInterface';

const isModalOpen = ref(false);
const teacherState = useTeachers();
const requestTeacherData = ref<TeacherEditResponse>();

// 2. Proveemos ese estado exacto al hijo
provide("teacherContext", teacherState);
const { loading, fetchAll, getOntetoEdit, deleteRecord } = teacherState;

//manejar edicion
const handleEdit = async(id:number)=> {
    try {
        const data = await getOntetoEdit(id);
        requestTeacherData.value = data;
        console.log(requestTeacherData.value);
        
        isModalOpen.value = true;
    } catch (error) {
        console.error("No se pudo cargar la información para editar");
        console.error(error);
    }
}

//manjear eliminacion
const handleDelete = async(id:number) =>{
    try {
        ShowDeleteAlert(()=>deleteRecord(id));
    } catch (error) {
        console.error("No se pudo cargar la información para editar");
        console.error(error);
    }
}


onMounted(async () => {
    try {
        await fetchAll();
    } catch (e) {
        console.error('Falló la carga inicial', e);
    }
})
</script>

<style>
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