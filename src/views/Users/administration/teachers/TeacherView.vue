<template>
    <div class="conatiner__data_load">
    <div class="loadeer_container" v-if="loading">
       <Load2Component></Load2Component>
    </div>

    <div class="slide_container">
        <HeaderComponent :title="'Teachers'" @open-modal="isModalOpen = true"></HeaderComponent>

        <div class="container_crud">
            <section class="table__container">
                <TableGridComponent></TableGridComponent>
            </section>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { useTeachers } from '@/composables/useTeachers';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
import { ColumnDefinition } from '@/interfaces/templates/TableInterface';

    const isModalOpen = ref(false);

    const {
        records,
        loading,
        error,
        pagination,
        fetchAll
    } = useTeachers();

    const columns: ColumnDefinition<>

    onMounted(async () => {
        try {
            await fetchAll();
            console.log('Datos cargados exitosamente');
        } catch (e) {
            console.error('Falló la carga inicial', e);
        }
    })
</script>

<style></style>