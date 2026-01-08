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
                    <TableGridComponent :rows="tableRows" :columns="columns" :length="lengthRecords">
                        <template #cell="{ row, column }">

                            <!-- Foto -->
                            <img v-if="column.key === 'file' && row.file?.url" :src="row.file.url" class="img_file" />

                            <!-- botones-->
                            <div v-else-if="column.key === 'actions'" class="actions">
                                <button @click="editRow(row)">Editar</button>
                                <button @click="deleteRow(row)">Eliminar</button>
                            </div>

                            <span v-else>{{ row[column.key] }}</span>
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

    import { onMounted, ref, computed } from 'vue';
    import { StudentManagerResponse, StudentManagerTableRow } from '@/interfaces/students/StudentManagers';
    import { storeToRefs } from 'pinia'
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';

    //VARIABLES
    const isModalOpen = ref(false);

    const storeGeneric = useCatalogueStore<StudentManagerResponse>('catalogue-studentsManagers', 'students/studentsManagers')();
    const { records, lengthRecords } = storeToRefs(storeGeneric)
    const tableRows = computed(() => records.value as StudentManagerTableRow[])

    //TABLE STRUCTURE
    const columns: ColumnDefinition<StudentManagerTableRow>[] = [
        { key: 'first_name', label: 'Nombre' },
        { key: 'first_last_name', label: 'Apellido' },
        { key: 'email', label: 'Correo' },
        { key: 'age', label: 'Edad' },
        { key: 'file', label: 'Foto' },
        { key: 'actions', label: 'Acciones' },
    ]

    onMounted(() => {
        callRecords();
    })

    function editRow(row:StudentManagerResponse){
        console.log('hola');
    }

    function deleteRow(row:StudentManagerResponse){
        console.log('hola');
    }


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
