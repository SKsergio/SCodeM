<template>
    <div class="slide__container">
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

             <section class="result__search">
                <h1>Students to enroll</h1>
            </section>

            <section class="btn_search_section">
                <label for="">Search Students</label>
                <Multiselect
                    v-model="alumnoSeleccionadoId"
                    placeholder="Buscar alumnos..."
                    :options="fetchStudents"
                    :searchable="true"
                    :filter-results="false"
                    :resolve-on-load="false"
                    :min-chars="2"
                    :delay="300"
                    @select="onStudentSelect"
                >
                    <template v-slot:noresults>
                        <span>No students found.</span>
                    </template>
                </Multiselect>
            </section>

            
            <section class="generate_inscription_section">
                <h1>Current student in this course</h1>
                <TableGridComponent :rows="alumnosPreInscritos" :columns="columnsStudents" :length="alumnosPreInscritos.length">

                     <template #cell-routePhoto="{ row }">
                        <img v-if="row.routePhoto" :src="prefijo + row.routePhoto" class="img_file" />
                        <span v-else>Sin foto</span>
                    </template>

                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="$emit('remove-student', row.id)">Quitar</button>
                        </div>
                    </template>

                </TableGridComponent>
                
                <button 
                    :disabled="alumnosPreInscritos.length === 0" 
                    @click="$emit('generate-enrollment')"
                >
                    Generar inscripción
                </button>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, inject } from 'vue';
    import Multiselect from '@vueform/multiselect';
    import type { useEnrollmentDegrees } from '@/composables/useEnrollmentDegree';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import { EnrollmentDegreeTableRow } from '@/interfaces/EnrollmentDegree/EnrollmentDegreeInterface';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import { StatusEnum } from '@/enum/StatusEnum';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import { StudentTableRow } from '@/interfaces/students/studentInterface';

    const prefijo = import.meta.env.VITE_API_PREFIX;


    const props = defineProps<{
        alumnosPreInscritos: StudentSimpleResponse[],
        fetchStudents: (query: string) => Promise<any[]> 
    }>();

    const emit = defineEmits<{
        (e: 'toggle-status', id: number, newStatus: StatusEnum): void,
        (e: 'view-details', id: number): void,
        (e: 'add-student', student: StudentSimpleResponse): void,
        (e: 'remove-student', studentId: number): void,
        (e: 'generate-enrollment'): void
    }>();

    // --- ESTADO LOCAL DEL MULTISELECT ---
    const alumnoSeleccionadoId = ref(null);

    // Cuando el usuario hace clic en una opción del select
    const onStudentSelect = (selectedOption: any, optionObject: any) => {
        if (optionObject && optionObject.originalData) {
            // Emitimos el objeto original completo al padre
            emit('add-student', optionObject.originalData);
            
            // Limpiamos el buscador para la siguiente búsqueda
            setTimeout(() => {
                alumnoSeleccionadoId.value = null;
            }, 100);
        }
    };

    const { records, pagination } = inject('enrollmentContext') as ReturnType<typeof useEnrollmentDegrees>;
    const page = pagination.page;
    const size = pagination.size;
    const totalElements = pagination.totalElements;
    const changePage = pagination.changePage;
    

    const columns: ColumnDefinition<EnrollmentDegreeTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'studentName', label: 'Student Name' },
        { key: 'degreeName', label: 'Degree Name' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
    ];

    const columnsStudents: ColumnDefinition<StudentTableRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'fullName', label: 'Full Name' },
        { key: 'carnet', label: 'Carnet' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'Age' },
        { key: 'routePhoto', label: 'Photo' },
        { key: 'actions', label: 'Actions' }
    ];

    function toggleStatus(record: EnrollmentDegreeTableRow) {
        emit('toggle-status', record.id, record.status)
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
@import url('@/css/variables.css');

.slide__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.conatiner_crud,
.add_section {
    width: 94%;
    margin: 0 auto;
}

.add_section {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    /* align-content: center; */
    flex-direction: column;
}

.btn_search_section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: start;
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
.img_file {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}
</style>