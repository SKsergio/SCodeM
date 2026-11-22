<template>
    <BaseModalComponent v-model="show" :title="modalTitle" :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">
            <!-- FORMULARIO -->
            <div class="form_wrapper period_form">

                <!-- Datos generales -->
                <section class="box_panel panel_col">
                    <h3 class="section-title section-title--divided">General</h3>

                    <div class="input__ct">
                        <label for="period-name">Name <span class="hint">(max. 50)</span></label>
                        <input class="input_st" type="text" id="period-name" maxlength="50"
                            placeholder="Ej. Trimestre I" v-model.trim="newPeriod.name">
                    </div>

                    <div class="form-group">
                        <label>Course <span v-if="isEdit" class="hint">(cannot be changed)</span></label>
                        <Multiselect v-model="newPeriod.courseId" :options="courseOptions" valueProp="id" label="name"
                            class="custom-select-modal" :searchable="true" :disabled="isEdit"
                            placeholder="Select a specific course..." noOptionsText="The list is empty"
                            noResultsText="No results found" />
                    </div>
                </section>

                <!-- Fechas -->
                <section class="box_panel panel_col">
                    <h3 class="section-title section-title--divided">Period Dates</h3>

                    <DateRangeField v-model:start-date="newPeriod.startDate" v-model:end-date="newPeriod.endDate"
                        :range="courseRange" :loading="loadingRange"
                        empty-text="Select a course to see the available date range." />
                </section>

                <!-- Peso -->
                <section class="box_panel panel_col">
                    <h3 class="section-title section-title--divided">Weight</h3>

                    <div class="input__ct">
                        <label for="period-weight">
                            Weight <span v-if="newPeriod.courseId" class="hint">(available: {{ availableWeight }}%)</span>
                        </label>
                        <input class="input_st" type="number" min="0" :max="availableWeight" step="0.01"
                            id="period-weight" v-model.number="newPeriod.weight">
                    </div>
                </section>
            </div>

            <!-- PREVISUALIZADOR -->
            <aside class="previsualizar box_panel">
                <div class="expediente-header">
                    <h2>PREVIEW</h2>
                </div>

                <div class="expediente-content">
                    <div class="field">
                        <label>Name</label>
                        <p>{{ newPeriod.name || EMPTY }}</p>
                    </div>
                    <div class="field">
                        <label>Course</label>
                        <p>{{ getCourseName(newPeriod.courseId) }}</p>
                    </div>

                    <div class="divider"></div>

                    <div class="field-row">
                        <div class="field">
                            <label>Start Date</label>
                            <p>{{ newPeriod.startDate || EMPTY }}</p>
                        </div>
                        <div class="field">
                            <label>End Date</label>
                            <p>{{ newPeriod.endDate || EMPTY }}</p>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field">
                        <label>Weight</label>
                        <p>{{ newPeriod.weight ? `${newPeriod.weight} %` : EMPTY }}</p>
                    </div>
                </div>
            </aside>

            <!-- PERIODOS QUE YA TIENE EL CURSO -->
            <aside class="box_panel periods_list">
                <div class="expediente-header">
                    <h2>COURSE PERIODS</h2>
                </div>

                <p v-if="!newPeriod.courseId" class="periods_empty">
                    Select a course to see the periods it already has.
                </p>
                <p v-else-if="loadingPeriods" class="periods_empty">Loading periods...</p>
                <p v-else-if="otherPeriods.length === 0" class="periods_empty">
                    This course has no other periods yet.
                </p>

                <template v-else>
                    <ul class="periods_items">
                        <li v-for="period in otherPeriods" :key="period.id" class="period_item">
                            <div class="period_item__head">
                                <span class="period_item__name">{{ period.name || 'Sin nombre' }}</span>
                                <span class="period_item__weight">{{ period.weight }}%</span>
                            </div>
                            <div class="period_item__meta">
                                <span>{{ period.startDate }} &rarr; {{ period.endDate }}</span>
                                <span>{{ period.status }}</span>
                            </div>
                        </li>
                    </ul>
                    <p class="periods_total">
                        Used weight: <strong>{{ usedWeight }}%</strong> &middot;
                        Available: <strong>{{ availableWeight }}%</strong>
                    </p>
                </template>
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
import { computed, inject, ref, watch } from 'vue';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import CloseIcon from '~icons/ri/close-large-line'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { type PeriodEditResponse, type PeriodRequest, type PeriodResponse } from '@/interfaces/Period/periodInterface';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import type { usePeriod } from '@/composables/usePeriod';
import { useCourse } from '@/composables/useCourse';
import DateRangeField from '@/components/generics/DateRangeField.vue';
import { type DateRange, getDateRangeError } from '@/utils/dateRange';
import { type ApiError } from '@/interfaces/ApiError';
import { type CourseSimpleResponse } from '@/interfaces/Course/CourseInterface';
import { StatusEnum } from '@/enum/StatusEnum';

const {
    createRecord,
    updateRecord,
    getByCourse
} = inject("periodContext") as ReturnType<typeof usePeriod>

const { getRangeDates } = useCourse()

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean
    period?: PeriodEditResponse | null,
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

const EMPTY = '—'
const isEdit = computed(() => !!props.period?.id)
const modalTitle = computed(() => isEdit.value ? 'Edit Period' : 'Register New Period')

const courseOptions = computed(() =>
    isEdit.value ? props.courses : props.courses?.filter(c => c.status === StatusEnum.OPEN)
)

//INICIALIZACIONES
const getInitialPeriod = (): PeriodRequest => ({
    name: "",
    startDate: "",
    endDate: "",
    courseId: null as unknown as number,
    weight: null as unknown as number,
})
const newPeriod = ref<PeriodRequest>(getInitialPeriod());

const clean_form = () => {
    //al editar el curso no se puede cambiar, asi que se conserva
    const courseId = isEdit.value ? newPeriod.value.courseId : getInitialPeriod().courseId
    newPeriod.value = { ...getInitialPeriod(), courseId }
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen && props.period) {
            const { name, startDate, endDate, weight, courseId } = props.period;
            newPeriod.value = { name: name ?? '', startDate, endDate, weight, courseId };
        } else {
            newPeriod.value = getInitialPeriod()
        }
    }
)

const courseRange = ref<DateRange>()
const loadingRange = ref(false)

const coursePeriods = ref<PeriodResponse[]>([])
const loadingPeriods = ref(false)

const otherPeriods = computed(() => coursePeriods.value.filter(p => p.id !== props.period?.id))

const round = (value: number) => Math.round(value * 100) / 100
const usedWeight = computed(() => round(otherPeriods.value.reduce((sum, p) => sum + (p.weight ?? 0), 0)))
const availableWeight = computed(() => round(Math.max(0, 100 - usedWeight.value)))

const loadCourseData = async (courseId: number | null) => {
    courseRange.value = undefined
    coursePeriods.value = []
    if (!courseId) return

    loadingRange.value = true
    loadingPeriods.value = true
    const [range, periods] = await Promise.allSettled([getRangeDates(courseId), getByCourse(courseId)])
    loadingRange.value = false
    loadingPeriods.value = false

    if (newPeriod.value.courseId !== courseId) return

    if (range.status === 'fulfilled') courseRange.value = range.value
    if (periods.status === 'fulfilled') coursePeriods.value = periods.value

    const failed = [range, periods].find(r => r.status === 'rejected')
    if (failed) {
        console.error('Error al obtener los datos del curso:', failed.reason);
        ErrorAlert(failed.reason as ApiError)
    }
}

watch(() => newPeriod.value.courseId, loadCourseData)

const closeModal = () => {
    show.value = false
}

const getCourseName = (id: number | null) => {
    if (!id) return EMPTY
    return props.courses?.find(cr => cr.id === id)?.name ?? "sin nombre"
}

const validateForm = (): string | null => {
    const { name, courseId, startDate, endDate, weight } = newPeriod.value

    if (!name) {
        return 'The name is required'
    }
    if (name.length > 50) {
        return 'The name cannot exceed 50 characters'
    }
    if (otherPeriods.value.some(p => p.name?.toLowerCase() === name.toLowerCase())) {
        return `The course already has a period named "${name}"`
    }
    if (!courseId) {
        return 'Select a course'
    }
    if (!startDate || !endDate) {
        return 'Start date and end date are required'
    }
    if (!courseRange.value) {
        return 'The available date range for this course could not be loaded'
    }
    const dateError = getDateRangeError(startDate, endDate, courseRange.value)
    if (dateError) {
        return dateError
    }
    const overlapped = otherPeriods.value.find(p => startDate <= p.endDate && endDate >= p.startDate)
    if (overlapped) {
        return `The dates overlap with the period "${overlapped.name}" (${overlapped.startDate} - ${overlapped.endDate})`
    }
    if (weight === null || weight === undefined || Number.isNaN(weight) || weight <= 0) {
        return 'The weight must be greater than 0'
    }
    if (weight > availableWeight.value) {
        return `The course only has ${availableWeight.value}% of weight available`
    }
    return null
}

const saveData = async () => {
    try {
        if (props.period?.id) {
            await updateRecord(props.period.id, newPeriod.value)
        } else {
            await createRecord(newPeriod.value)
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
</script>

<style scoped>
.period_form {
    grid-area: 1 / 1 / 3 / 2;
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

.previsualizar {
    align-self: start;
}

/* periodos del curso */
.periods_list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-self: start;
}

.periods_empty {
    font-size: 13px;
    color: var(--color-text1);
    margin: 0;
}

.periods_items {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 240px;
    overflow-y: auto;
}

.period_item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 10px;
    border: 1px solid var(--color-fourth);
    border-radius: 8px;
}

.period_item__head,
.period_item__meta {
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

.period_item__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-content);
}

.period_item__weight {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-content);
}

.period_item__meta,
.periods_total {
    font-size: 12px;
    color: var(--color-text1);
}

.periods_total {
    margin: 0;
}

@media (max-width: 860px) {
    .period_form {
        grid-area: auto;
    }
}
</style>
