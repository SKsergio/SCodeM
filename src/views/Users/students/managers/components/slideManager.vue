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

                    <template #cell-routePhoto="{ row }">
                        <img v-if="row.routePhoto" :src="baseUrl + row.routePhoto" class="img_file"
                            alt="Foto de perfil" />
                        <span v-else>Sin foto</span>
                    </template>
                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="editRow(row)">Editar</button>
                            <button @click="deleteRow(row)">ELiminar</button>
                            <button @click="openCompleteInfo(row)">Complete Info</button>
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
    import { useRouter } from 'vue-router';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import { ManagerTableRow } from '@/interfaces/managers/ManagerInterface';
    import type { useManagers } from '@/composables/useManagers';
    import FilterWrapper from '@/components/templates/FilterWrapper.vue';
    import FilterComponent from '@/components/generics/FilterComponent.vue';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';

    const router = useRouter();

    const {
        records,
        pagination,
        fetchAll
    } = inject('managerContext') as ReturnType<typeof useManagers>;


    //VARIABLES
    const showFilters = ref(false);
    // const prefijo = import.meta.env.VITE_API_PREFIX;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const page = pagination.page;
    const size = pagination.size;
    const totalElements = pagination.totalElements;
    const changePage = pagination.changePage;

    //emits
    const emit = defineEmits<{
        (e: 'edit', id: number): void,
        (e: 'delete', id: number): void,
        (e: 'view-details', id: number): void
        (e: 'manage-students', id: number): void
    }>();


    //tabla
    const columns: ColumnDefinition<ManagerTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'fullName', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'Age' },
        { key: 'dui', label: 'DUI' },
        { key: 'routePhoto', label: 'Photo' },
        { key: 'createdAt', label: 'Created At' },
        { key: 'actions', label: 'Actions' }
    ];

    function editRow(record: ManagerTableRow) {
        emit('edit', record.id)
    }


    function deleteRow(record: ManagerTableRow) {
        emit('delete', record.id)
    }

    function openCompleteInfo(record: ManagerTableRow) {
        router.push({
        name: 'ManagerFullMagnament', 
            query: { 
                managerId: record.id 
            }
        });
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