<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Students'" @open-modal="handleCreate"></HeaderComponent>

        <!-- contendedor -->
        <slideStudent @edit="handleEdit" @delete="handleDelete" @view-report-card="handleViewReportCard"></slideStudent>

        <!-- modal de editar y crear -->
        <modalCrearEditar v-model="isModalOpen" @emitido="fetchAll()" :student-data="requestStudentData"></modalCrearEditar>

        <!-- modal de detalle del estudiante -->
        <modalDetailStudents v-model="isDetailStudentOpen" :studentFull="fullStudent"></modalDetailStudents>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref } from 'vue';
    import slideStudent from './components/slideStudent.vue';
    import modalCrearEditar from './components/modalCrearEditar.vue';
    import { useStudents } from '@/composables/useStudent';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
    import modalDetailStudents from './components/modalDetailStudents.vue';
    import { StudentEditResponse, StudentFullResponse } from '@/interfaces/students/studentInterface';

    const isModalOpen = ref(false);
    const isDetailStudentOpen = ref(false);
    const studentState = useStudents();
    const requestStudentData = ref<StudentEditResponse>();
    const fullStudent = ref<StudentFullResponse>();


    // 2. Proveemos ese estado exacto al hijo
    provide("studentContext", studentState);
    const { loading, fetchAll, getOntetoEdit, deleteRecord, getDetail } = studentState;

    const handleCreate = () => {
        requestStudentData.value = undefined;

        isModalOpen.value = true;
    }

    //manejar edicion
    const handleEdit = async(id:number)=> {
        try {
            const data = await getOntetoEdit(id);
            requestStudentData.value = data;
            
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

    const handleViewReportCard = async (id: number) => {
        try {
            const data = await getDetail(id);
            fullStudent.value = data;
            isDetailStudentOpen.value = true;
        } catch (error) {
            console.error("No se pudo cargar la información detallada" + error);
            throw error;
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

<style scoped>
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