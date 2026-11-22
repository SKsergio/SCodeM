<template>
    <BaseModalComponent v-model="show" :title="modalTitle"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">
            <div class="form_wrapper">

                <section class="names box_panel">
                    <div class="input__ct">
                        <label for="name">Name</label>
                        <input class="input_st" type="text" id="name" v-model="newEvaluation.name">
                    </div>
                    <div class="input__ct">
                        <label for="ability">Percentage</label>
                        <input class="input_st" type="number" max="50" min="0" id="ability"
                            v-model.number="newEvaluation.percentage">
                    </div>
                </section>

                <section class="inputs_modal box_panel ">
                    <div class=" description_modal">
                        <label for="description">Description</label>
                        <input class="input_st" type="text" id="description" v-model="newEvaluation.description">
                    </div>
                    <div class="form-group">
                        <label>Course <span v-if="isEdit" class="hint">(cannot be changed)</span></label>

                        <Multiselect v-model="newEvaluation.courseId" :options="courseOptions" valueProp="id"
                            label="name" class="custom-select-modal" :searchable="true" :disabled="isEdit"
                            placeholder="select a course..."
                            noOptionsText="The list is empty" noResultsText="No results found" />
                    </div>

                     <div class="form-group">
                        <label>Period</label>
                        <Multiselect v-model="newEvaluation.periodId" class="custom-select-modal" :options="openPeriods"
                            valueProp="id" label="name" :searchable="true" :loading="loadingPeriods"
                            placeholder="Select a period..." noOptionsText="The course has no open periods"
                            noResultsText="No results found" />
                    </div>

                </section>

                <section class="box_panel">
                    <DateRangeField v-model:start-date="newEvaluation.startDate"
                        v-model:end-date="newEvaluation.endDate" :range="periodRange"
                        empty-text="Select a period to see the available date range." />
                </section>
            </div>

            <div class="previsualizar box_panel">
                <div class="expediente-header">
                    <h2>Previewer</h2>
                </div>

                <div class="expediente-content">
                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>Course Name</label>
                                <p>{{ getCourseName(newEvaluation.courseId) }}</p>
                            </div>
                            <div class="field">
                                <label>Name</label>
                                <p>{{ newEvaluation.name }}</p>
                            </div>
                            <div class="field">
                                <label>Description</label>
                                <p>{{ newEvaluation.description }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field half">
                                <label>Start Date</label>
                                <p>{{ newEvaluation.startDate }}</p>
                            </div>
                            <div class="field half">
                                <label>End Date</label>
                                <p>{{ newEvaluation.endDate }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div>
                            <div class="field half">
                                <label>Available Percentage</label>
                                <p>{{ percentageAvaliable }}%</p>
                            </div>
                        </div>
                        <div class="field half">
                            <label>Period</label>
                            <p>{{ selectedPeriod?.name ?? '—' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="btn_section">
            <BtnSaveComponent @save_click="sendData"></BtnSaveComponent>
            <BtnCleanComponent @clean_click="clean_form"></BtnCleanComponent>
            <BtnCancelComponent @cancel_click="closeModal"></BtnCancelComponent>
        </section>
    </BaseModalComponent>

</template>

<script lang="ts" setup>

import Multiselect from '@vueform/multiselect';
import CloseIcon from '~icons/ri/close-large-line'
import '@vueform/multiselect/themes/default.css';
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { type CourseSimpleResponse } from '@/interfaces/Course/CourseInterface';
import { computed, inject, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { type ApiError } from '@/interfaces/ApiError';
import { useEvaluations } from '@/composables/useEvaluations';
import { type EvaluationEditResponse, type EvaluationRequest } from '@/interfaces/evaluations/EvaluationInterface';
import { useCourse } from '@/composables/useCourse';
import { usePeriod } from '@/composables/usePeriod';
import { type PeriodResponse } from '@/interfaces/Period/periodInterface';
import DateRangeField from '@/components/generics/DateRangeField.vue';
import { type DateRange, getDateRangeError } from '@/utils/dateRange';
import { StatusEnum } from '@/enum/StatusEnum';

const { getPercentage, percentageAvaliable } = useCourse();
const { getByCourse, getOntetoEdit: getPeriodToEdit } = usePeriod();

const {
    createRecord,
    updateRecord,
} = inject("evaluationContext") as ReturnType<typeof useEvaluations>

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean,
    evaluation?: EvaluationEditResponse,
    courses?: CourseSimpleResponse[]
}>();



const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()


const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const isEdit = computed(() => !!props.evaluation?.id)
const modalTitle = computed(() => isEdit.value ? 'Edit Evaluation' : 'Register new Evaluation')

const courseOptions = computed(() =>
    isEdit.value ? props.courses : props.courses?.filter(c => c.status === StatusEnum.OPEN)
)

//INICIALIZACIONES
const getInitialEvaluation = (): EvaluationRequest => ({
    name: '',
    description: '',
    percentage: null,
    periodId: null,
    startDate: '',
    endDate: '',
    courseId: null as unknown as number
})
const newEvaluation = ref<EvaluationRequest>(getInitialEvaluation());

const clean_form = () => {
    //al editar el curso no se puede cambiar, asi que se conserva
    const courseId = isEdit.value ? newEvaluation.value.courseId : getInitialEvaluation().courseId
    newEvaluation.value = { ...getInitialEvaluation(), courseId }
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen && props.evaluation) {
            const { id: _id, ...cleanData } = props.evaluation;
            newEvaluation.value = { ...getInitialEvaluation(), ...cleanData };
            findCourseOfPeriod(cleanData.periodId);
        } else {
            newEvaluation.value = getInitialEvaluation()
        }
    }
)

const findCourseOfPeriod = async (periodId: number | null) => {
    if (!periodId) return
    try {
        const period = await getPeriodToEdit(periodId)
        if (newEvaluation.value.periodId === periodId) {
            newEvaluation.value.courseId = period.courseId
        }
    } catch (error) {
        ErrorAlert(error as ApiError)
    }
}

const coursePeriods = ref<PeriodResponse[]>([])
const loadingPeriods = ref(false)

const openPeriods = computed(() => coursePeriods.value.filter(p => p.status === StatusEnum.OPEN))
const selectedPeriod = computed(() => coursePeriods.value.find(p => p.id === newEvaluation.value.periodId))
const periodRange = computed<DateRange | null>(() =>
    selectedPeriod.value ? { startDate: selectedPeriod.value.startDate, endDate: selectedPeriod.value.endDate } : null
)

const findPeriods = async (courseId: number | null) => {
    coursePeriods.value = []
    if (!courseId) return

    loadingPeriods.value = true
    try {
        const periods = await getByCourse(courseId)
        if (newEvaluation.value.courseId !== courseId) return
        coursePeriods.value = periods
        if (!openPeriods.value.some(p => p.id === newEvaluation.value.periodId)) {
            newEvaluation.value.periodId = null
        }
    } catch (error) {
        ErrorAlert(error as ApiError)
    } finally {
        loadingPeriods.value = false
    }
}

watch(() => newEvaluation.value.courseId, findPeriods)

const findPercentage = async () => {
    percentageAvaliable.value = 0
    const { courseId, periodId } = newEvaluation.value
    if (!courseId || !periodId) return
    try {
        await getPercentage(courseId, periodId);
    } catch (error) {
        ErrorAlert(error as ApiError)
    }
}

watch(() => [newEvaluation.value.courseId, newEvaluation.value.periodId], findPercentage)

const closeModal = () => {
    show.value = false
}

const validateForm = (): string | null => {
    // Validar campos requeridos no estén vacíos
    if (!newEvaluation.value.name) {
        return 'The name is required'
    }
    if (!newEvaluation.value.periodId) {
        return 'Select a period'
    }
    if (!newEvaluation.value.description) {
        return 'The description is required'
    }
    if (!newEvaluation.value.startDate) {
        return 'The start date is required'
    }
    if (!newEvaluation.value.endDate) {
        return 'The end date is required'
    }
    if (!newEvaluation.value.courseId) {
        return 'Select a course'
    }
    const dateError = getDateRangeError(newEvaluation.value.startDate, newEvaluation.value.endDate, periodRange.value)
    if (dateError) {
        return dateError
    }
    const percentage = newEvaluation.value.percentage
    if (percentage === null || Number.isNaN(percentage) || percentage <= 0) {
        return 'The percentage must be greater than 0'
    }
    return null
}

const saveData = async () => {
    try {
        if (props.evaluation?.id) {
            await updateRecord(props.evaluation.id, newEvaluation.value)
        } else {
            await createRecord(newEvaluation.value)
        }
    } catch (error) {
        throw error
    }
}

const sendData = async () => {
    const validationError = validateForm()

    if (validationError) {
        const errorObj: ApiError = {
            status: 400,
            message: validationError,
        }
        ErrorAlert(errorObj)
        return
    }

    try {
        const ok = await ShowCreateAlert(saveData)


        if (ok) {
            closeModal()
            emit('emitido', true)
        }
    } catch (error) {
        ErrorAlert(error as ApiError)
    }


}

//obtener los nombres por id
const getCourseName = (id: number | null) => {
    if (!id) return
    let courseCurrent = props.courses?.find(c => c.id === id)
    if (courseCurrent) {
        return courseCurrent?.name
    } else {
        return "sin nombre";
    }
}


</script>

<style scoped>
.inputs_modal {
    flex-direction: column;
}

.description_modal {
    width: 100%;
}

.hint {
    font-weight: 400;
    color: var(--color-text1);
}
</style>