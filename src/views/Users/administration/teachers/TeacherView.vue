<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <div class="slide_container">
            <HeaderComponent :title="'Teachers'" @open-modal="isModalOpen = true"></HeaderComponent>

            <!-- filtros -->
            <BtnFilterComponent @click="showFilters = !showFilters" />
            <!-- <FilterWrapper v-if="showFilters" >
                <filters-component :endpoint="endpoint" :store_id="storeId" :config="degreeFilters"></filters-component>
            </FilterWrapper> -->
            <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size" :max-pages-shown="5"
                @change="changePage">
            </PaginacionComponent>
            <div class="conatiner_crud">
                <section class="table__container">
                    <TableGridComponent :rows="records" :columns="columns" :length="totalElements">

                        <template #cell-createdAt="{ row }">
                            <span>{{ formatDate(row.createdAt) }}</span>
                        </template>

                        <template #cell-routePhoto="{ row }">
                            <img v-if="row.routePhoto" :src="prefijo + row.routePhoto" class="img_file" />
                            <span v-else>Sin foto</span>
                        </template>

                        <template #cell-actions="{ row }">
                            <div class="actions">
                                <button @click="editRow()">Editar</button>
                                <button @click="deleteRow()">Eliminar</button>
                            </div>
                        </template>

                    </TableGridComponent>
                </section>
            </div>
            <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size" :max-pages-shown="5"
                @change="changePage">
            </PaginacionComponent>
        </div>

        <modalComponent v-model="isModalOpen" @emitido="fetchAll()"></modalComponent>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTeachers } from '@/composables/useTeachers';
import HeaderComponent from '@/components/templates/HeaderComponent.vue';
import TableGridComponent from '@/components/templates/TableGridComponent.vue';
import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
import { TeacherTableRow } from '@/interfaces/Teacher/TeacherInterface';
import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';
import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';

import { formatDate } from '@/utils/FormatDates';
import FilterWrapper from '@/components/templates/FilterWrapper.vue';
import FiltersComponent from '@/components/generics/FiltersComponent.vue';
//filtrs momentaneos vacios
import { degreeFilters } from '../../degrees/degree/filters';
import modalComponent from './components/modalComponent.vue';

const isModalOpen = ref(false);
const showFilters = ref(false);
const prefijo = import.meta.env.VITE_API_PREFIX;

const {
    records,
    loading,
    error,
    pagination,
    fetchAll
} = useTeachers();


const page = pagination.page;
const size = pagination.size;
const totalElements = pagination.totalElements;
const changePage = pagination.changePage;

const columns: ColumnDefinition<TeacherTableRow>[] = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
    { key: 'dui', label: 'DUI' },
    { key: 'routePhoto', label: 'Photo' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Actions' }
];

function editRow() {
    console.log('hola');
}

function deleteRow() {
    console.log('hola');
}
onMounted(async () => {
    try {
        await fetchAll();
        console.log('Datos cargados exitosamente');
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