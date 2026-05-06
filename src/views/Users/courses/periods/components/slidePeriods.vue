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

                    <template #cell-createdAt="{ row }">
                        <span>{{ formatDate(row.createdAt) }}</span>
                    </template>

                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="editRow(row)">Update</button>
                            <button @click="deleteRow(row)">Delete</button>

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
    import { formatDate } from '@/utils/FormatDates';
    import type { usePeriod } from '@/composables/usePeriod';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import { PeriodTableRow } from '@/interfaces/Period/periodInterface';
    import FilterWrapper from '@/components/templates/FilterWrapper.vue';
    import FilterComponent from '@/components/generics/FilterComponent.vue';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';
    import { StatusEnum } from '@/enum/StatusEnum';

    const {
        records,
        pagination,
        fetchAll
    } = inject('periodContext') as ReturnType<typeof usePeriod>;

    //VARIABLES
    const showFilters = ref(false);

    const page = pagination.page;
    const size = pagination.size;
    const totalElements = pagination.totalElements;
    const changePage = pagination.changePage;

    //emits
    const emit = defineEmits<{
        (e: 'edit', id: number): void,
        (e: 'delete', id: number): void,
        (e: 'toggle-status', id: number, newStatus:StatusEnum): void,
        (e: 'view-details', id: number): void
    }>();


    //tabla
    const columns: ColumnDefinition<PeriodTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
        { key: 'createdAt', label: 'Created At' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
    ];

    function editRow(record: PeriodTableRow) {
        emit('edit', record.id)
    }

    function deleteRow(record: PeriodTableRow) {
        emit('delete', record.id)
    }

    function toggleStatus(record: PeriodTableRow) {
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