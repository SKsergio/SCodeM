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
    import { DegreeDetailTableRow } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
    import type { useDegreeDetail } from '@/composables/useDegreeDetail';
    import FilterWrapper from '@/components/templates/FilterWrapper.vue';
    import FilterComponent from '@/components/generics/FilterComponent.vue';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';

    const {
        records,
        pagination,
        fetchAll
    } = inject('degreDetailContext') as ReturnType<typeof useDegreeDetail>;

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
        (e: 'view-details', id:number):void
    }>();


    //tabla
    const columns: ColumnDefinition<DegreeDetailTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'fullName', label: 'Name' },
        { key: 'degreeName', label: 'Degree Name' },
        { key: 'sectionName', label: 'Section Name' },
        { key: 'tutorName', label: 'Tutor' },
        { key: 'ability', label: 'Ability' },
        { key: 'year', label: 'year' },
        { key: 'actions', label: 'Actions' }
    ];

    function editRow(record:DegreeDetailTableRow) {
        emit('edit', record.id)
    }

    function deleteRow(record:DegreeDetailTableRow) {
        emit('delete', record.id)
    }

    const handleFilters = async (newFilters: Record<string, any>) => {
        pagination.changePage(0);
        await fetchAll(newFilters);
    }
</script>

<style>
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