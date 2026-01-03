<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="storeGeneric.loading">
            <Load2Component></Load2Component>
        </div>

        <div class="slide_container">
            <HeaderComponent :endpoint="'students/studentsManagers'" :store_id="'catalogue-studentsManagers'"
                :title="'Students Manager'" @open-modal="isModalOpen = true">
            </HeaderComponent>
            <div class="conatiner_crud">
                <section class="table__container">
                    <TableGridComponent :rows="records" :columns=columns :length="lengthRecords">
                        <template #cell="{ row, column }">

                            <!-- ejemplo: columna Foto -->
                            <img v-if="column.key === 'file' && row.file?.url" :src="row.file.url" class="img_file" />

                            <template v-else>
                                {{ row[column.key] }}
                            </template>

                        </template>
                    </TableGridComponent>
                </section>
            </div>
        </div>

        <ModalComponent v-model="isModalOpen" @emitido="callRecords()"></ModalComponent>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import ModalComponent from './components/ModalComponent.vue';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';

    import { onMounted, ref } from 'vue';
    import { StudentManagerResponse } from '@/interfaces/students/StudentManagers';
    import { storeToRefs } from 'pinia'
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';

    //VARIABLES
    const isModalOpen = ref(false);

    const storeGeneric = useCatalogueStore<StudentManagerResponse>('catalogue-studentsManagers', 'students/studentsManagers')();
    const { records, loading, lengthRecords } = storeToRefs(storeGeneric)

    //TABLE STRUCTURE
    const columns: ColumnDefinition<StudentManagerResponse>[] = [
        { key: 'first_name', label: 'Nombre' },
        { key: 'first_last_name', label: 'Apellido' },
        { key: 'email', label: 'Correo' },
        { key: 'age', label: 'Edad' },
        { key: 'file', label: 'Foto' },
    ]

    onMounted(() => {
        callRecords();
    })


    const callRecords = async () => {
        try {
            await storeGeneric.fetchAll()
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
        }
    }
</script>

<style scoped>
.conatiner_crud {
    width: 94%;
    margin: 0 auto;
    margin-top: -16px;
}

.conatiner__data_load {
    display: flex;
    flex-direction: column;
    position: relative;
}

.table__container {
    background: var(--color-third);
    display: flex;
    padding: 30px;
    border-radius: 25px 5px 25px 5px;
}

.img_file {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}
</style>
