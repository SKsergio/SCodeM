<template>
    <div class="slide_container">
        <!-- filtros -->
        <BtnFilterComponent @click="showFilters = !showFilters" />
        <FilterWrapper v-if="showFilters">
            <FilterComponent @apply-filters="handleFilters"></FilterComponent>
        </FilterWrapper>

        <div class="conatiner_crud">
            <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size" :max-pages-shown="5"
                @change="changePage">
            </PaginacionComponent>
            <section class="table__container">
                <TableGridComponent :rows="records" :columns="columns" :length="totalElements">

                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="editRow(row)">Update</button>
                            <button @click="deleteRow(row)">Delete</button>
                            <button @click="qualifyRow(row)">Qualify</button>

                            <button v-if="row.status === StatusEnum.OPEN" @click="toggleStatus(row)">
                                Close
                            </button>

                            <button v-else @click="toggleStatus(row)">
                                Open
                            </button>
                        </div>
                    </template>

                </TableGridComponent>
            </section>
            <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size" :max-pages-shown="5"
                @change="changePage">
            </PaginacionComponent>
        </div>

    </div>
</template>

<script lang="ts" setup>
    import { ref, inject } from 'vue';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import type { useEvaluations } from '@/composables/useEvaluations';
    import FilterWrapper from '@/components/templates/FilterWrapper.vue';
    import FilterComponent from '@/components/generics/FilterComponent.vue';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';
    import { EvaluationTableRow } from '@/interfaces/evaluations/EvaluationInterface';
    import { StatusEnum } from '@/enum/StatusEnum';

    const {
        records,
        pagination,
        fetchAll
    } = inject('evaluationContext') as ReturnType<typeof useEvaluations>;

    //VARIABLES
    const showFilters = ref(false);

    const page = pagination.page;
    const size = pagination.size;
    const totalElements = pagination.totalElements;
    const changePage = pagination.changePage;

    //emits
    const emit = defineEmits<{
        (e: 'edit', id:number):void,
        (e: 'delete', id:number):void,
        (e: 'view-details', id:number):void,
        (e: 'toggle-status', id: number, newStatus:StatusEnum): void,
    }>();


    //tabla
    const columns: ColumnDefinition<EvaluationTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name Evaluation' },
        { key: 'courseName', label: 'Course Name' },
        { key: 'percentage', label: 'Percentage' },
        { key: 'endDate', label: 'End Date' },
        { key: 'daysRemaning', label: 'Days Remaining' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
    ];

    function editRow(record:EvaluationTableRow) {
        emit('edit', record.id)
    }

    function deleteRow(record:EvaluationTableRow) {
        emit('delete', record.id)
    }

    function qualifyRow(record:EvaluationTableRow) {
        emit('view-details', record.id)
    }

    function toggleStatus(record: EvaluationTableRow) {
        emit('toggle-status', record.id, record.status)
    }

    const handleFilters = async (newFilters: Record<string, any>) => {
        pagination.changePage(0);
        await fetchAll(newFilters);
    }
</script>

<style scoped>
@import url('@/css/variables.css');

.slide__cotainer {
    background: var(--color-third);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    padding: 30px;
    border-radius: 25px 5px 25px 5px;
    /* margin-bottom: 40px; */
}

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