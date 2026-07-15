<template>
    <div class="slide__container">
        <div class="conatiner_crud">
            <section class="table__container">
                <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size"
                    :max-pages-shown="5" @change="changePage">
                </PaginacionComponent>
                <h1>Estudiantes asignados</h1>
                <TableGridComponent :rows="studentsByManager" :columns="columns" :length="totalElements">

                     <template #cell-routePhoto="{ row }">
                        <img v-if="row.routePhoto" :src="prefijo + row.routePhoto" class="img_file" />
                        <span v-else>Sin foto</span>
                    </template>

                    <template #cell-relationType="{ row }">
                        <select v-model="row.relationType" @change="$emit('update-relation', row.id, row.relationType)">
                            <option value="PARENT">Padre/Madre</option>
                            <option value="GUARDIAN">Tutor</option>
                            <option value="OTHER">Otro</option>
                        </select>
                    </template>

                    <template #cell-emergencyContact="{ row }">
                        <input
                            type="checkbox"
                            v-model="row.emergencyContact"
                            @change="$emit('update-emergency-contact', row.id, row.emergencyContact)"
                        />
                    </template>

                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="deleteRow(row)">Delete</button>
                            <button @click="deleteRow(row)">Editar</button>
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
    import type { useManagerStudents } from '@/composables/useManagerStudents';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import { EnrollmentDegreeTableRow } from '@/interfaces/EnrollmentDegree/EnrollmentDegreeInterface';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import { StatusEnum } from '@/enum/StatusEnum';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import { StudentTableRow } from '@/interfaces/students/studentInterface';
    import { AssignedStudentsTableRow } from '@/interfaces/ManagerStudents/ManagerStudentsInterface';

    const prefijo = import.meta.env.VITE_BASE_URL;


    const props = defineProps<{
        // alumnosPreInscritos: StudentSimpleResponse[],
        // fetchStudents: (query: string) => Promise<any[]>
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

    const { studentsByManager, paginationPreAsociated } = inject('managerStudentsContext') as ReturnType<typeof useManagerStudents>;
    const page = paginationPreAsociated.page;
    const size = paginationPreAsociated.size;
    const totalElements = paginationPreAsociated.totalElements;
    const changePage = paginationPreAsociated.changePage;


    const columns: ColumnDefinition<AssignedStudentsTableRow>[] = [
        { key: 'studentId', label: 'ID' },
        { key: 'fullName', label: 'Student Name' },
        { key: 'carnet', label: 'Carnet' },
        { key: 'relationType', label: 'Kinship' },
        { key: 'emergencyContact', label: 'Emergency Contact' },
        { key: 'routePhoto', label: 'Photo' },
        { key: 'age', label: 'Age' },
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

    function deleteRow(record: AssignedStudentsTableRow) {
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