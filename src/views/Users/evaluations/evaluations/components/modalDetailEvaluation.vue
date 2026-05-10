<template>
    <BaseModalComponent v-model="show" title="Register new Evaluation"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_table_container">
            <section class="table__container">
                <PaginacionComponent :page="page" :total-items="totalElements" :items-per-page="size"
                    :max-pages-shown="5" @change="changePage">
                </PaginacionComponent>
               <TableGridComponent :rows="editableRows" :columns="columns" :length="totalElements">
                    <template #cell-grade="{ row }">
                        <input type="number" v-model="row.grade" min="0" max="10" step="0.1" class="input-grade-style"
                            placeholder="Nota" />
                    </template>

                    <template #cell-feedback="{ row }">
                        <input type="text" v-model="row.feedback" class="input-feedback-style" placeholder="Opcional" />
                    </template>
                </TableGridComponent>
            </section>
        </div>

        <section class="btn_section">
            <BtnSaveComponent @save_click="sendData"></BtnSaveComponent>
            <BtnCancelComponent @click="closeModal"></BtnCancelComponent>
        </section>
    </BaseModalComponent>

</template>

<script lang="ts" setup>

import PaginacionComponent from '@/components/generics/PaginacionComponent.vue';
import TableGridComponent from '@/components/templates/TableGridComponent.vue';
import { useEvaluationDetail } from '@/composables/useEvaluationDetail';
import CloseIcon from '~icons/ri/close-large-line'
import '@vueform/multiselect/themes/default.css';
import '@vuepic/vue-datepicker/dist/main.css'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { computed, onMounted, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { ApiError } from '@/interfaces/ApiError';
import { ColumnDefinition } from '@/interfaces/templates/TableInterface';
import { BatchEvaluationRequestDTO, EvaluationGradebookTableRow, studentGradeRequest } from '@/interfaces/EvaluationDetail/evaluationDetailInterface';


//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean,
    evaluationId: number | null,
}>();


const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()


const evaluationDetailState = useEvaluationDetail();
const { createBatchRegistration, gradebookRecords, fetchGradeBook, paginationGradeBook } = evaluationDetailState;

const page = paginationGradeBook.page;
const size = paginationGradeBook.size;
const totalElements = paginationGradeBook.totalElements;
const changePage = paginationGradeBook.changePage;

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const columns: ColumnDefinition<EvaluationGradebookTableRow>[] = [
    { key: 'studentId', label: 'ID' },
    { key: 'studentFullName', label: 'Name' },
    { key: 'grade', label: 'Grade' },
    { key: 'feedback', label: 'Feedback' },
];


watch(
    () => props.evaluationId, 
    (newId) => {
        if (newId && props.modelValue) { 
            fetchGradeBook(newId);
        }
    },
    { immediate: true } 
);

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen && props.evaluationId) {
            fetchGradeBook(props.evaluationId);
        }
    }
);

const closeModal = () => {
    show.value = false
}

const editableRows = ref<EvaluationGradebookTableRow[]>([]);

watch(gradebookRecords, (newRecords) => {
    editableRows.value = newRecords.map(record => ({
        id: record.studentId,
        studentId: record.studentId,
        studentFullName: record.studentFullName,
        studentCode: record.studentCode,
        evaluationDetailId: record.evaluationDetailId,
        grade: record.grade,
        feedback: record.feedback
    }));
}, { immediate: true, deep: true });



const sendData = async () => {
    if (!props.evaluationId) return;

    const gradesToSend: studentGradeRequest[] = editableRows.value
        .filter(row => row.grade !== null && row.grade !== undefined && String(row.grade).trim() !== '')
        .map(row => ({
            evaluationDetailId: row.evaluationDetailId, 
            studentId: row.studentId,
            grade: Number(row.grade),
            feedback: row.feedback
        }));

    if (gradesToSend.length === 0) {
        ErrorAlert({ status: 400, message: "No hay notas ingresadas para guardar." } as ApiError);
        return;
    }

    const payload: BatchEvaluationRequestDTO = {
        evaluationId: props.evaluationId,
        grades: gradesToSend
    };

    const ok = await ShowCreateAlert(async () => {
        await createBatchRegistration(payload);
    });

    if (ok) {
        closeModal();
        emit('emitido', true);
    }
}
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
</style>