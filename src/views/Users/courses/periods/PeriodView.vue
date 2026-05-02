<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Periods'" @open-modal="isModalOpen = true"></HeaderComponent>

        <!-- contendedor -->
        <slidePeriods @edit="handleEdit" @delete="handleDelete"></slidePeriods>

        <!-- modal de editar y crear -->
        <modalCrearEditar v-model="isModalOpen" @emitido="fetchAll()" :period="requestPeriodData"></modalCrearEditar>
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
import { PeriodResponse } from '@/interfaces/Period/periodInterface';


const isModalOpen = ref(false);
const periodState = usePeriod();
const requestPeriodData = ref<PeriodResponse>();

// 2. Proveemos ese estado exacto al hijo
provide("periodContext", periodState);
const { loading, fetchAll, getDetail, deleteRecord } = periodState;

//manejar edicion
const handleEdit = async(id:number)=> {
    try {
        const data = await getDetail(id);
        requestPeriodData.value = data;
        console.log(requestPeriodData.value);
        
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