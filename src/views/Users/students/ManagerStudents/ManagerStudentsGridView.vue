<template>
    <div class="conatiner__data_load">
        <!-- <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div> -->
        <div class="slide_container">
            <HeaderComponent :endpoint="'students/studentsManagers'" :store_id="'catalogue-studentsManagers'"
                :title="'Students Manager'">
            </HeaderComponent>
            <div class="conatiner_crud">
                <section class="table__container">
                    <TableGridComponent :rows="managers" :columns=columns>
                        <template #cell="{ row, column }">

                            <!-- ejemplo: columna Foto -->
                            <img v-if="column.key === 'file'" :src="row.file.url" width="50" />

                            <!-- Default -->
                            <template v-else>
                                {{ row[column.key] }}
                            </template>

                        </template>
                    </TableGridComponent>
                </section>

            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import HeaderComponent from '@/components/templates/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import TableGridComponent from '@/components/templates/TableGridComponent.vue';
import { StudentManagerResponse } from '@/interfaces/students/StudentManagers';
import { useStudentManagerStore } from '@/store/StudentManagerStore';
import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
import { storeToRefs } from 'pinia';

const store = useStudentManagerStore();
const { managers, loading } = storeToRefs(store)

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
        await store.fetchManagers()
    } catch (error) {
        console.error("No se pudieron cargar los encargados.");
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
.table__container{
    background: var(--color-third);
    display: flex;
    padding: 30px;
    border-radius: 25px 5px 25px 5px;
}

.loadeer_container {
    position: fixed;
    top: 0;
    height: 100%;
    left: 0;
    right: 0;
    background-color: rgba(48, 46, 46, 0.822);
    z-index: 99;
}
</style>
