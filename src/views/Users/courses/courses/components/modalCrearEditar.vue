<template>
    <BaseModalComponent v-model="show" :title="modalTitle" :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container course_form">
            <!-- FORMULARIO -->
            <div class="form_wrapper">

                <!-- Asignacion -->
                <section class="box_panel panel_col">
                    <h3 class="section-title section-title--divided">Assignment</h3>

                    <div class="form-group">
                        <label>Degree Detail</label>
                        <Multiselect v-model="newCourse.gradeDetailId" :options="props.degreeDetail" valueProp="id"
                            label="fullName" class="custom-select-modal" :searchable="true"
                            placeholder="Select a specific degree..." noOptionsText="The list is empty"
                            noResultsText="No results found" />
                    </div>

                    <div class="row_2">
                        <div class="form-group">
                            <label>Teacher</label>
                            <Multiselect v-model="newCourse.teacherId" class="custom-select-modal"
                                :options="props.teachers" valueProp="id" label="fullName" :searchable="true"
                                placeholder="Select a teacher..." noOptionsText="The list is empty"
                                noResultsText="No results found" />
                        </div>

                        <div class="form-group">
                            <label>Subject</label>
                            <Multiselect v-model="newCourse.subjectId" class="custom-select-modal"
                                :options="props.subjects" valueProp="id" label="name" :searchable="true"
                                placeholder="Select a subject..." noOptionsText="The list is empty"
                                noResultsText="No results found" />
                        </div>
                    </div>
                </section>

                <!-- Periodo -->
                <section class="box_panel panel_col">
                    <h3 class="section-title section-title--divided">Course Period</h3>

                    <DateRangeField v-model:start-date="newCourse.startDate" v-model:end-date="newCourse.endDate"
                        :range="dateAvailable" :loading="loadingRange"
                        empty-text="Select a degree detail to see the available date range." />
                </section>

                <!-- Evaluacion -->
                <section class="box_panel panel_col">
                    <h3 class="section-title section-title--divided">Evaluation</h3>

                    <div class="input__ct input__ct--narrow">
                        <label for="valority-unity">Valority Unity <span class="hint">(0 - 50)</span></label>
                        <input class="input_st" type="number" max="50" min="0" id="valority-unity"
                            v-model.number="newCourse.valorityUnity">
                    </div>
                </section>
            </div>

            <!-- PREVISUALIZADOR -->
            <aside class="previsualizar box_panel">
                <div class="expediente-header">
                    <h2>PREVIEW</h2>
                </div>

                <div class="expediente-content">
                    <div class="field-group">
                        <div class="field">
                            <label>Degree Detail</label>
                            <p>{{ getDegreeDetailName(newCourse.gradeDetailId) }}</p>
                        </div>
                        <div class="field">
                            <label>Teacher</label>
                            <p>{{ getTeacherName(newCourse.teacherId) }}</p>
                        </div>
                        <div class="field">
                            <label>Subject</label>
                            <p>{{ getSubjectName(newCourse.subjectId) }}</p>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-row">
                        <div class="field">
                            <label>Start Date</label>
                            <p>{{ newCourse.startDate || EMPTY }}</p>
                        </div>
                        <div class="field">
                            <label>End Date</label>
                            <p>{{ newCourse.endDate || EMPTY }}</p>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field">
                        <label>Unity Value</label>
                        <p>{{ newCourse.valorityUnity ?? EMPTY }}</p>
                    </div>
                </div>
            </aside>
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
import { type CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
import { type DegreeDetailSimpleResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
import { type TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
import { computed, inject, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { type ApiError } from '@/interfaces/ApiError';
import { type CourseEditResponse, type CourseRequest } from '@/interfaces/Course/CourseInterface';
import { useCourse } from '@/composables/useCourse';
import { useDegreeDetail } from '@/composables/useDegreeDetail';
import DateRangeField from '@/components/generics/DateRangeField.vue';
import { getDateRangeError } from '@/utils/dateRange';

//inyeccion de funciones del contexto del curso (instancia compartida con la vista)
const {
    createRecord,
    updateRecord
} = inject("courseContext") as ReturnType<typeof useCourse>

//instancia propia del modal, solo se usa para consultar el rango de fechas
const { getRangeDates, dateAvailable } = useDegreeDetail()

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean
    course?: CourseEditResponse
    degreeDetail?: DegreeDetailSimpleResponse[]
    teachers?: TeacherSimpleResponse[]
    subjects?: CatalogueSimpleResponse[]
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const EMPTY = '—'
const modalTitle = computed(() => props.course?.id ? 'Edit Course' : 'Register New Course')

//INICIALIZACIONES
const getInitialCourse = (): CourseRequest => ({
    valorityUnity: null as unknown as number,
    gradeDetailId: null,
    teacherId: null,
    subjectId: null,
    startDate: "",
    endDate: "",
})
const newCourse = ref<CourseRequest>(getInitialCourse());

const clean_form = () => {
    newCourse.value = getInitialCourse()
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen && props.course) {
            const { id: _id, ...courseData } = props.course;
            newCourse.value = { ...courseData };
        } else {
            clean_form();
        }
    }
)

//RANGO DE FECHAS DISPONIBLES
const loadingRange = ref(false)

const findDateRange = async (gradeDetailId: number | null) => {
    dateAvailable.value = undefined
    if (!gradeDetailId) return

    loadingRange.value = true
    try {
        await getRangeDates(gradeDetailId)
    } catch (error) {
        console.error('Error al obtener las fechas disponibles:', error);
        ErrorAlert(error as ApiError)
    } finally {
        loadingRange.value = false
    }

    //si mientras se esperaba la respuesta el usuario cambio de grado, se descarta
    if (newCourse.value.gradeDetailId !== gradeDetailId) {
        dateAvailable.value = undefined
    }
}

watch(() => newCourse.value.gradeDetailId, findDateRange)

const closeModal = () => {
    show.value = false
}

const validateForm = (): string | null => {
    if (!newCourse.value.gradeDetailId) {
        return 'Select a degree detail'
    }
    if (!newCourse.value.teacherId) {
        return 'Select a teacher'
    }
    if (!newCourse.value.subjectId) {
        return 'Select a subject'
    }
    if (!newCourse.value.startDate || !newCourse.value.endDate) {
        return 'Start date and end date are required'
    }
    if (!dateAvailable.value) {
        return 'The available date range for this degree could not be loaded'
    }
    const dateError = getDateRangeError(newCourse.value.startDate, newCourse.value.endDate, dateAvailable.value)
    if (dateError) {
        return dateError
    }
    const unity = newCourse.value.valorityUnity
    if (unity === null || unity === undefined || Number.isNaN(unity)) {
        return 'Valority Unity is required'
    }
    if (unity < 0 || unity > 50) {
        return 'Valority Unity must be between 0 and 50'
    }
    return null
}

const saveData = async () => {
    try {
        if (props.course?.id) {
            await updateRecord(props.course.id, newCourse.value)
        } else {
            await createRecord(newCourse.value)
        }
    } catch (error) {
        console.log("ocurrio un error: " + error);
        throw error;
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

    const ok = await ShowCreateAlert(saveData)

    if (ok) {
        closeModal()
        emit('emitido', true)
    }
}

//obtener los nombres por id
const getDegreeDetailName = (id: number | null) => {
    if (!id) return EMPTY
    return props.degreeDetail?.find(dg => dg.id === id)?.fullName ?? "sin nombre"
}

const getSubjectName = (id: number | null) => {
    if (!id) return EMPTY
    return props.subjects?.find(sb => sb.id === id)?.name ?? "sin nombre"
}

const getTeacherName = (id: number | null) => {
    if (!id) return EMPTY
    return props.teachers?.find(tc => tc.id === id)?.fullName ?? "sin nombre"
}
</script>

<style scoped>
.modal-width-pt {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.theme-modal-manager {
    background-color: var(--color-sixth) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
    padding: 0 !important;
    border: 1px solid var(--color-fourth) !important;
    border-radius: 12px;
}

.form-group label,
.input__ct label {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-content);
}

.hint {
    font-weight: 400;
    color: var(--color-text1);
}

/* previsualizador */
.previsualizar {
    position: sticky;
    top: 0;
    align-self: start;
}

.previsualizar .field-group {
    gap: 12px;
}

@media (max-width: 860px) {
    .course_form {
        grid-template-columns: 1fr;
        padding: 20px;
    }
}
</style>
