<template>
    <div class="slide__container">
        <!-- filtros -->
        <div class="conatiner_crud">
            <section class="table__container">
                <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size"
                    :max-pages-shown="5" @change="changePage">
                </PaginacionComponent>
                <h1>Current student in this course</h1>
                <TableGridComponent :rows="records" :columns="columns" :length="totalElements">

                    <!-- <template #cell-actions="{ row }">
                        <div class="actions">
                            <button v-if="row.status === StatusEnum.OPEN" @click="toggleStatus(row)">
                                Close
                            </button>

                            <button v-else @click="toggleStatus(row)">
                                Open
                            </button>
                        </div>
                    </template> -->

                </TableGridComponent>
            </section>
        </div>

        <div class="add_section">
            <section class="btn_search_section">
                <BtnSearchComponent></BtnSearchComponent>
            </section>
            <section class="result__search">
                <h1>Resultados de la busqueda</h1>
            </section>
            <section class="generate_inscription_section">
                <button>generar inscripcion</button>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, inject } from 'vue';
    import type { useEnrollmentDegrees } from '@/composables/useEnrollmentDegree';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import { EnrollmentDegreeTableRow } from '@/interfaces/EnrollmentDegree/EnrollmentDegreeInterface';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import { StatusEnum } from '@/enum/StatusEnum';
    import BtnSearchComponent from '@/components/buttons/BtnSearchComponent.vue';

    const {
        records,
        pagination,
    } = inject('enrollmentContext') as ReturnType<typeof useEnrollmentDegrees>;

    //VARIABLES
    const page = pagination.page;
    const size = pagination.size;
    const totalElements = pagination.totalElements;
    const changePage = pagination.changePage;

    //emits
    const emit = defineEmits<{
        (e: 'toggle-status', id: number, newStatus: StatusEnum): void,
        (e: 'view-details', id: number): void
    }>();


    //tabla
    const columns: ColumnDefinition<EnrollmentDegreeTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'studentName', label: 'Student Name' },
        { key: 'degreeName', label: 'Degree Name' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
    ];

    function toggleStatus(record: EnrollmentDegreeTableRow) {
        emit('toggle-status', record.id, record.status)
    }
</script>

<style scoped>
@import url('@/css/variables.css');

.slide__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.conatiner_crud, .add_section{
    width: 94%;
    margin: 0 auto;
}
.add_section{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.conatiner__data_load {
    display: flex;
    flex-direction: column;
    position: relative;
}

.table__container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    display: flex;
    padding: 10px;
}
</style>