<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Evaluations'" @open-modal="handleCreate()"></HeaderComponent>

        <!-- contendedor -->
        <slideEvaluations @edit="handleEdit" @delete="handleDelete"></slideEvaluations>

        <!-- modal de editar y crear -->
        <ModalCrearEditar v-model="isModalOpen" @emitido="fetchAll()" :evaluation="requestEvaluationData"
            :courses="courseList">
        </ModalCrearEditar>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useCourse } from '@/composables/useCourse';
    import ModalCrearEditar from './components/modalCrearEditar.vue';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import slideEvaluations from './components/slideEvaluations.vue';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
    import { EvaluationEditResponse } from '@/interfaces/evaluations/EvaluationInterface';
    import { useEvaluations } from '@/composables/useEvaluations';
    import { CourseSimpleResponse } from '@/interfaces/Course/CourseInterface';

    const isModalOpen = ref(false);
    const evaluationState = useEvaluations();
    const requestEvaluationData = ref<EvaluationEditResponse>();

    //servicios para selects
    const courseService = useCourse();

    //selects
    const courseList = ref<CourseSimpleResponse[]>([]);


    provide("evaluationContext", evaluationState);
    const { loading, fetchAll, deleteRecord, getOntetoEdit } = evaluationState

    const handleCreate = () => {
        requestEvaluationData.value = undefined;

        // 2. Ahora sí, abrimos el modal
        isModalOpen.value = true;
    }

    //manejar edicion
    const handleEdit = async (id: number) => {
        try {
            const data = await getOntetoEdit(id);
            requestEvaluationData.value = data;

            isModalOpen.value = true;
        } catch (error) {
            console.error("No se pudo cargar la información para editar");
            console.error(error);
        }
    }

    //manjear eliminacion
    const handleDelete = async (id: number) => {
        try {
            ShowDeleteAlert(() => deleteRecord(id));
        } catch (error) {
            console.error("No se pudo eliminar el curso");
            console.error(error);
        }
    }


    onMounted(async () => {
        try {
            await fetchAll();
            const [courses] = await Promise.all([
                courseService.getSelects(),

            ])

            courseList.value = courses;

        } catch (e) {
            console.error('Falló la carga inicial', e);
            //argar un swal de error general
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
