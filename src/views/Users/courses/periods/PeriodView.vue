<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->

        <HeaderComponent :show-add="true" :title="'Periodos'" @open-modal="handleCreate()">
        </HeaderComponent>


        <!-- contendedor -->
        <slidePeriods @edit="handleEdit" @delete="handleDelete" @toggle-status="handleStatus">
        </slidePeriods>

        <!-- modal de editar y crear -->
        <modalCrearEditar v-model="isModalOpen" @emitido="fetchAll()" :degree-detail="degreeSpecificList" :period="requestPeriodData"></modalCrearEditar>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue';
import slidePeriods from './components/slidePeriods.vue';
import modalCrearEditar from './components/modalCrearEditar.vue';
import { usePeriod } from '@/composables/usePeriod';
import Load2Component from '@/components/loaders/Load2Component.vue';
import HeaderComponent from '@/components/templates/HeaderComponent.vue';
import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
import { PeriodEditResponse } from '@/interfaces/Period/periodInterface';
import { CloseRecordAlert } from '@/components/alerts/CloseRecord';
import { OpenRecordAlert } from '@/components/alerts/OpenRecord';
import { StatusEnum } from '@/enum/StatusEnum';
import { statusRequest } from '@/interfaces/StatusRequest';
import { useDegreeDetail } from '@/composables/useDegreeDetail';
import { DegreeDetailSimpleResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
import { ErrorAlert } from '@/components/alerts/ErrorAlert.js';
import { ApiError } from '@/interfaces/ApiError.js';


const isModalOpen = ref(false);
const periodState = usePeriod();
const requestPeriodData = ref<PeriodEditResponse>();

// 2. Proveemos ese estado exacto al hijo
provide("periodContext", periodState);
const { loading, fetchAll, getOntetoEdit, deleteRecord, changeStatus } = periodState;

//servicio de degreeDetail
const degreeSpecificService = useDegreeDetail();
const degreeSpecificList = ref<DegreeDetailSimpleResponse[]>([]);


const handleCreate = () => {
    requestPeriodData.value = undefined;

    isModalOpen.value = true;
}

//manejar edicion
const handleEdit = async (id: number) => {
    try {
        const data = await getOntetoEdit(id);
        requestPeriodData.value = data;
        console.log(requestPeriodData.value);
        isModalOpen.value = true;
    } catch (error) {
        ErrorAlert(error as ApiError);
        console.error("No se pudo cargar la información para editar");
        console.error(error);
    }
}

//manjear eliminacion
const handleDelete = async (id: number) => {
    try {
        ShowDeleteAlert(() => deleteRecord(id));
    } catch (error) {
        ErrorAlert(error as ApiError);
        console.error("No se pudo cargar la información para editar");
        console.error(error);
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
        CloseRecordAlert(() => changeStatus(id, newStatus), "Periodo", "esta accion afectara los cursos asociados")
    } else if (oldStatus == StatusEnum.CLOSED) {
        const newStatus = statusIntitial()
        newStatus.newStatus = StatusEnum.OPEN
        OpenRecordAlert(() => changeStatus(id, newStatus), "Periodo", "esta accion afectara los cursos asociados")
    }
}


onMounted(async () => {
    try {
        await fetchAll();
        const [degreeSpecific] = await Promise.all([
            degreeSpecificService.getSelects(),
        ])

        degreeSpecificList.value = degreeSpecific;
    } catch (e) {
        ErrorAlert(e as ApiError);
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