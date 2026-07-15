<template>
    <div class="slide__container">
        <div class="conatiner_crud">
            <section class="table__container">
                <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size"
                    :max-pages-shown="5" @change="changePage">
                </PaginacionComponent>
                <h1>Current student in this Degree</h1>
                <TableGridComponent :rows="recordSelect" :columns="columns" :length="totalElements">

                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="deleteRow(row)">Delete</button>
                        </div>
                    </template>

                </TableGridComponent>
            </section>
        </div>

        <div class="add_section">

            <section class="result__search">
                <h1>Students to enroll</h1>
            </section>

            <section class="btn_search_section">
                <label for="">Search Students</label>
                <Multiselect class="custom-select-modal" v-model="alumnoSeleccionadoId" placeholder="Buscar alumnos..."
                    :options="fetchStudents" :searchable="true" :filter-results="false" :resolve-on-load="false"
                    :min-chars="2" :delay="300" @select="onStudentSelect">
                    <template v-slot:noresults>
                        <span>No students found.</span>
                    </template>
                </Multiselect>
            </section>


            <section class="generate_inscription_section">
                <h1>student to this Degree</h1>
                <div>
                    <button :disabled="alumnosPreInscritos.length === 0" @click="$emit('generate-enrollment')">
                        Generar inscripción
                    </button>
                </div>
                <TableGridComponent :rows="alumnosPreInscritos" :columns="columnsStudents"
                    :length="alumnosPreInscritos.length">

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

    const prefijo = import.meta.env.VITE_BASE_URL;


    const props = defineProps<{
        alumnosPreInscritos: StudentSimpleResponse[],
        fetchStudents: (query: string) => Promise<any[]>
    }>();

    const emit = defineEmits<{
        (e: 'toggle-status', id: number, newStatus: StatusEnum): void,
        (e: 'view-details', id: number): void,
        (e: 'add-student', student: StudentSimpleResponse): void,
        (e: 'remove-student', studentId: number): void,
        (e: 'generate-enrollment'): void,
        (e: 'delete', id: number): void,
    }>();

    // --- ESTADO LOCAL DEL MULTISELECT ---
    const alumnoSeleccionadoId = ref(null);

    const onStudentSelect = (selectedOption: any, optionObject: any) => {
        if (optionObject && optionObject.originalData) {
            emit('add-student', optionObject.originalData);

            setTimeout(() => {
                alumnoSeleccionadoId.value = null;
            }, 100);
        }
    };

    const { recordSelect, paginationPreInscription } = inject('enrollmentContext') as ReturnType<typeof useEnrollmentDegrees>;
    const page = paginationPreInscription.page;
    const size = paginationPreInscription.size;
    const totalElements = paginationPreInscription.totalElements;
    const changePage = paginationPreInscription.changePage;


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

    function deleteRow(record: EnrollmentDegreeTableRow) {
        emit('delete', record.id)
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
    margin-bottom: 30px;
}

.conatiner_crud,
.add_section {
    width: 94%;
    margin: 0 auto;
    font-family: var(--font-v2);
}

.add_section {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    flex-direction: column;
}

.btn_search_section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: start;
    gap: 10px;
}

.generate_inscription_section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
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