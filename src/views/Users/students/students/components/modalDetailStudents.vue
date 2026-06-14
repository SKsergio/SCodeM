<template>
    <BaseModalComponent v-model="show" title="Record of notes" :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_table_container">
            <section class="table__container">

                <TableGridComponent :rows="tableRows" :columns="columns" :length="tableRows.length">

                    <template #cell-status="{ row }">
                        <span :style="{ color: row.status === 'APROBADO' ? 'green' : 'red', fontWeight: 'bold' }">
                            {{ row.status }}
                        </span>
                    </template>

                </TableGridComponent>
            </section>
        </div>

        <section class="btn_section">
            <BtnCancelComponent @click="closeModal"></BtnCancelComponent>
        </section>
    </BaseModalComponent>

</template>

<script lang="ts" setup>

import TableGridComponent from '@/components/templates/TableGridComponent.vue';
import type { useStudents } from '@/composables/useStudent';
import CloseIcon from '~icons/ri/close-large-line'
import '@vueform/multiselect/themes/default.css';
import '@vuepic/vue-datepicker/dist/main.css'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { computed, inject, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
import { StudentFullResponse } from '@/interfaces/students/studentInterface';
import { Gender } from '@/enum/GenderEnum';
import { ReportCardTableRow } from '@/interfaces/students/AcademicReportInterface';


//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean,
    studentFull?: StudentFullResponse
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()


const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const {
    getAcademicReport,
    courses
} = inject("studentContext") as ReturnType<typeof useStudents>

const closeModal = () => {
    show.value = false
}


const getInitialFullEvaluation = (): StudentFullResponse => ({
    id: 0,
    fullName: '',
    address: '',
    phoneNumber: '',
    gender: Gender.M,
    birthDate: '',
    carnet: '',
    routePhoto: '',
    email: '',
    age: 0,
    currentDegree: '',
    gradeDetailId: 0,
});

const newStudent = ref<StudentFullResponse>(getInitialFullEvaluation());
const prefijo = import.meta.env.VITE_BASE_URL;


watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            if (isOpen && props.studentFull) {

                const { id, routePhoto, ...cleanData } = props.studentFull;

                newStudent.value = {
                    ...cleanData,
                    photo: null
                } as unknown as StudentFullResponse;

                if (props.studentFull.routePhoto) {
                    photoPreview.value = `${prefijo}${props.studentFull.routePhoto}`;
                } else {
                    photoPreview.value = '';
                }
            } else {
                console.log("luego vemos que pongo aca :c");
                ;
            }
        } else {
            console.log("luego vemos que pongo aca :c");
        }
    }
)

watch(
    () => props.modelValue,
    (isOpen) => {
        // Si se abre el modal y ya tenemos los IDs listos, disparamos
        if (isOpen && props.studentFull?.id && props.studentFull?.gradeDetailId) {
            getAcademicReport(props.studentFull.id, props.studentFull.gradeDetailId);
        }
    }
);

const photoPreview = ref<string>('')

const tableRows = computed<ReportCardTableRow[]>(() => {
    return courses.value.map(course => ({
        id: course.courseId, 
        courseId: course.courseId,
        courseName: course.courseName,
        finalScore: course.finalScore,
        evaluatedPercentage: course.evaluatedPercentage,
        status: course.status
    }));
});

const columns: ColumnDefinition<ReportCardTableRow>[] = [
    { key: 'courseName', label: 'Course' },
    { key: 'finalScore', label: 'Final Score' },
    { key: 'evaluatedPercentage', label: 'Percentage' },
    { key: 'status', label: 'Status' },
];


</script>

<style scoped>
.table__container {
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.description_modal {
    width: 100%;
}

.panel__info {
    background-color: var(--color-primary);
    border: 1px solid var(--color-fourth);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    font-family: var(--font-v1);
    font-size: 15px;
}
</style>