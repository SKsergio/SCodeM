<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Evaluations'" @open-modal="handleCreate()"></HeaderComponent>

        <!-- contendedor -->
        <slideEvaluations @edit="handleEdit" @delete="handleDelete" @toggle-status="handleStatus"
            @view-details="handleViewDetails"></slideEvaluations>


        <modalDetailEvaluation :evaluation-id="selectedEvaluationId" v-model="isGradeBookOpen"
            :evaluation-full="fullEvaluation"></modalDetailEvaluation>

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
    import { EvaluationEditResponse, EvaluationFullResponse } from '@/interfaces/evaluations/EvaluationInterface';
    import { useEvaluations } from '@/composables/useEvaluations';
    import modalDetailEvaluation from './components/modalDetailEvaluation.vue';
    import { CourseSimpleResponse } from '@/interfaces/Course/CourseInterface';
    import { StatusEnum } from '@/enum/StatusEnum';
    import { statusRequest } from '@/interfaces/StatusRequest';
    import { CloseRecordAlert } from '@/components/alerts/CloseRecord';
    import { OpenRecordAlert } from '@/components/alerts/OpenRecord';

    const isModalOpen = ref(false);
    const isGradeBookOpen = ref(false);
    const selectedEvaluationId = ref<number | null>(null);
    const evaluationState = useEvaluations();
    const requestEvaluationData = ref<EvaluationEditResponse>();
    const fullEvaluation = ref<EvaluationFullResponse>();

    //servicios para selects
    const courseService = useCourse();

    //selects
    const courseList = ref<CourseSimpleResponse[]>([]);


    provide("evaluationContext", evaluationState);
    const { loading, fetchAll, deleteRecord, getOntetoEdit, changeStatus, getDetail } = evaluationState

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

    const handleViewDetails = async (id: number) => {
        try {
            const data = await getDetail(id);
            fullEvaluation.value = data;
            selectedEvaluationId.value = id;
            isGradeBookOpen.value = true;
        } catch (error) {
            console.error("No se pudo cargar la información detallada" + error);
            throw error;
        }
    }

    //manjear abriri y cerrar periodos
    const handleStatus = async (id: number, oldStatus: StatusEnum) => {
        const statusIntitial = (): statusRequest => ({
            newStatus: null as unknown as StatusEnum
        });

        if (oldStatus == StatusEnum.OPEN) {
            const newStatus = statusIntitial()
            newStatus.newStatus = StatusEnum.CLOSED
            CloseRecordAlert(() => changeStatus(id, newStatus), "Evaluación", "esta accion solo afectara a ella misma")
        } else if (oldStatus == StatusEnum.CLOSED) {
            const newStatus = statusIntitial()
            newStatus.newStatus = StatusEnum.OPEN
            OpenRecordAlert(() => changeStatus(id, newStatus), "Evaluación", "esta accion solo afectara a ella misma")
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
