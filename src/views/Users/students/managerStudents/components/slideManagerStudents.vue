<template>
    <div class="slide__container">
        <div class="conatiner_crud">

            <div class="add_section">
                <section class="result__search">
                    <h1>Estudiantes</h1>
                </section>

                <section class="btn_search_section">
                    <label for="">Search Students</label>
                    <Multiselect class="custom-select-modal" v-model="alumnoSeleccionadoId" placeholder="Buscar alumnos..."
                        :options="fetchStudents" :searchable="true" :filter-results="false" :resolve-on-load="false"
                        :min-chars="2" :delay="300" :append-to-body="true" @select="onStudentSelect">
                        <template v-slot:noresults>
                            <span>No students found.</span>
                        </template>
                    </Multiselect>
                </section>

                <section class="generate_inscription_section">
                    <h1>Estudiantes por agregar</h1>
                    <TableGridComponent :rows="pendingStudents" :columns="columnsPending" :length="pendingStudents.length">

                        <template #cell-routePhoto="{ row }">
                            <img v-if="row.routePhoto" :src="prefijo + row.routePhoto" class="img_file" />
                            <span v-else>Sin foto</span>
                        </template>

                        <template #cell-relationType="{ row }">
                            <Multiselect class="custom-select-modal" v-model="row.relationType"
                                placeholder="parentezco..." :options="parentTypeOptions"
                                :append-to-body="true">
                            </Multiselect>
                        </template>

                        <template #cell-emergencyContact="{ row }">
                            <div class="checkbox_cell">
                                <input type="checkbox" v-model="row.emergencyContact" />
                            </div>
                        </template>

                        <template #cell-actions="{ row }">
                            <div class="actions">
                                <button :disabled="!row.relationType" @click="saveNewStudent(row)">Guardar</button>
                                <button @click="$emit('remove-student', row.id)">Quitar</button>
                            </div>
                        </template>

                    </TableGridComponent>
                </section>
            </div>

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
                        <Multiselect class="custom-select-modal" v-model="row.relationType"
                            placeholder="parentezco..." :options="parentTypeOptions"
                            :filter-results="false" :resolve-on-load="false"
                            :append-to-body="true">
                            <template v-slot:noresults>
                                <span>No students found.</span>
                            </template>
                        </Multiselect>
                    </template>

                    <template #cell-emergencyContact="{ row }">
                        <div class="checkbox_cell">
                            <input type="checkbox" v-model="row.emergencyContact" />
                        </div>
                    </template>

                    <template #cell-actions="{ row }">
                        <div class="actions">
                            <button @click="deleteRow(row)">Delete</button>
                            <button @click="toggleRelation(row)">Editar</button>
                        </div>
                    </template>

                </TableGridComponent>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, inject, onMounted, onUnmounted } from 'vue';
    import Multiselect from '@vueform/multiselect';
    import '@vueform/multiselect/themes/default.css';
    import type { useManagerStudents } from '@/composables/useManagerStudents';
    import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
    import TableGridComponent from '@/components/templates/TableGridComponent.vue';
    import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import { AssignedStudentsTableRow, PendingManagerStudentRow } from '@/interfaces/ManagerStudents/ManagerStudentsInterface';
    import { ParentType } from '@/enum/ParentType';

    const prefijo = import.meta.env.VITE_BASE_URL;

    const props = defineProps<{
        pendingStudents: PendingManagerStudentRow[],
        fetchStudents: (query: string) => Promise<any[]>
    }>();

    const emit = defineEmits<{
        (e: 'toggle-relation', id: number, newRelationType: ParentType, newEmergencyContact: boolean): void,
        (e: 'view-details', id: number): void,
        (e: 'add-student', student: StudentSimpleResponse): void,
        (e: 'remove-student', studentId: number): void,
        (e: 'save-student', row: PendingManagerStudentRow): void,
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

    //parent type options
    const parentTypeOptions = [
        { value: ParentType.PADRE, label: 'Padre' },
        { value: ParentType.MADRE, label: 'Madre' },
        { value: ParentType.ABUELO, label: 'Abuelo' },
        { value: ParentType.ABUELA, label: 'Abuela' },
        { value: ParentType.TIO, label: 'Tío' },
        { value: ParentType.HERMANO, label: 'Hermano' }
    ];

    // El dropdown del Multiselect se teletransporta a <body> (append-to-body),
    // asi que las variables de tema de .custom-select-modal no le llegan por herencia.
    // Mientras este componente esta montado, le damos las mismas variables a <body>.
    onMounted(() => {
        document.body.classList.add('manager-students-ms-theme');
    });

    onUnmounted(() => {
        document.body.classList.remove('manager-students-ms-theme');
    });

    const { studentsByManager, paginationPreAsociated } = inject('managerStudentsContext') as ReturnType<typeof useManagerStudents>;
    const page = paginationPreAsociated.page;
    const size = paginationPreAsociated.size;
    const totalElements = paginationPreAsociated.totalElements;
    const changePage = paginationPreAsociated.changePage;


    const columns: ColumnDefinition<AssignedStudentsTableRow>[] = [
        { key: 'studentId', label: 'ID' },
        { key: 'fullName', label: 'Student Name', width: '200px' },
        { key: 'carnet', label: 'Carnet', width: '90px' },
        { key: 'relationType', label: 'Kinship', width: '250px' },
        { key: 'emergencyContact', label: 'Emergency Contact', width: '190px' },
        { key: 'routePhoto', label: 'Photo', width: '100px' },
        { key: 'age', label: 'Age' },
        { key: 'actions', label: 'Actions' }
    ];


    const columnsPending: ColumnDefinition<PendingManagerStudentRow>[] = [
        { key: 'id', label: 'ID' },
        { key: 'fullName', label: 'Student Name', width: '200px' },
        { key: 'carnet', label: 'Carnet', width: '90px' },
        { key: 'email', label: 'Email' },
        { key: 'relationType', label: 'Kinship', width: '250px' },
        { key: 'emergencyContact', label: 'Emergency Contact', width: '190px' },
        { key: 'routePhoto', label: 'Photo', width: '100px' },
        { key: 'age', label: 'Age' },
        { key: 'actions', label: 'Actions' }
    ];

    function toggleRelation(record: AssignedStudentsTableRow) {
        emit('toggle-relation', record.id, record.relationType, record.emergencyContact)
    }

    function deleteRow(record: AssignedStudentsTableRow) {
        emit('delete', record.id)
    }

    function saveNewStudent(record: PendingManagerStudentRow) {
        if (!record.relationType) return;
        emit('save-student', record)
    }
</script>

<style>
/* Mismos valores que .custom-select-modal (globalClases.css), pero aplicados a
   body solo mientras este componente vive, para que el dropdown teletransportado
   con append-to-body herede el theming sin afectar al resto de la app. */
body.manager-students-ms-theme {
    --ms-bg: var(--color-primary);
    --ms-font-color: #ffffff;
    --ms-border-color: #3f4041;
    --ms-border-width: 1px;
    --ms-radius: 6px;

    --ms-ring-width: 1px;
    --ms-ring-color: #3b82f6;

    --ms-dropdown-bg: var(--color-sixth);
    --ms-dropdown-border-color: #3f4041;

    --ms-option-color: #ffffff;

    --ms-option-bg-pointed: var(--color-fourth);
    --ms-option-color-pointed: #ffffff;

    --ms-option-bg-selected: #3b82f6;
    --ms-option-color-selected: var(--color-lines);

    --ms-caret-color: #ffffff;
    --ms-clear-color: #ffffff;
    --ms-spinner-color: #3b82f6;
}
</style>

<style scoped>
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

.checkbox_cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkbox_cell input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}
</style>