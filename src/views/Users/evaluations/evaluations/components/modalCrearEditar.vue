<template>
    <BaseModalComponent v-model="show" title="Register new Evaluation"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">
            <div class="form_wrapper">

                <section class="selects_modal box_panel">
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
                        <label>Course</label>

                        <Multiselect v-model="newEvaluation.courseId" :options="props.courses" valueProp="id"
                            label="name" class="custom-select-modal" :searchable="true" placeholder="select a course..."
                            noOptionsText="The list is empty" noResultsText="No results found" />
                    </div>
                    
                </section>

                <section class="box_panel">
                    <div class="input__ct">
                        <label for="ability">Start Date</label>
                         <VueDatePicker v-model="newEvaluation.startDate" locale="es" format="yyyy-MM-dd"
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" :enable-time-picker="false"
                            auto-apply />
                    </div>

                    <div class="input__ct">
                        <label for="year">End Date</label>
                        <VueDatePicker v-model="newEvaluation.endDate" locale="es" format="yyyy-MM-dd"
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" :enable-time-picker="false"
                            auto-apply />
                    </div>
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
                        <div >
                            <div class="field half">
                                <label>Available Percentage</label>
                                <p>{{ percentageAvaliable }}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="btn_section">
            <BtnSaveComponent @save_click="sendData"></BtnSaveComponent>
            <BtnCleanComponent @clean_click="clean_form"></BtnCleanComponent>
            <BtnCancelComponent @click="closeModal"></BtnCancelComponent>
        </section>
    </BaseModalComponent>

</template>

<script lang="ts" setup>

import Multiselect from '@vueform/multiselect';
import CloseIcon from '~icons/ri/close-large-line'
import '@vueform/multiselect/themes/default.css';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { CourseSimpleResponse } from '@/interfaces/Course/CourseInterface';
import { computed, inject, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { ApiError } from '@/interfaces/ApiError';
import { useEvaluations } from '@/composables/useEvaluations';
import { EvaluationEditResponse, EvaluationRequest } from '@/interfaces/evaluations/EvaluationInterface';
import { useCourse } from '@/composables/useCourse';

//inyeccion de funcines
const { getPercentage, percentageAvaliable } = useCourse();

const {
    createRecord,
    updateRecord,
} = inject("evaluationContext") as ReturnType<typeof useEvaluations>

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean,
    evaluation?: EvaluationEditResponse
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

//INICIALIZACIONES
const getInitialEvaluation = (): EvaluationRequest => ({
    name: '',
    description: '',
    percentage: null,
    startDate: '',
    endDate: '',
    courseId: null as unknown as number
})
const newEvaluation = ref<EvaluationRequest>(getInitialEvaluation());

const clean_form = () => {
    newEvaluation.value = getInitialEvaluation()
    percentageAvaliable.value = 0;
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            if (isOpen && props.evaluation) {

                const { ...cleanData } = props.evaluation;

                newEvaluation.value = {
                    ...cleanData,
                };
            } else {
                clean_form();
            }
        } else {
            clean_form()
        }
    }
)

watch(
    () => newEvaluation.value.courseId,
    (courseId) => {
        if (courseId) {
            findPercentage();
        }
    }
)

const closeModal = () => {
    show.value = false
}

const validateForm = (): string | null => {
    // Validar campos requeridos no estén vacíos
    if (!newEvaluation.value.name) {
        return 'The name is required'
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
    return null
}
const findPercentage = async () => {
    if (newEvaluation.value.courseId) {
        try {
            await getPercentage(newEvaluation.value.courseId);
        } catch (error) {
            console.error('Error al obtener el porcentaje:', error);
        }
    }
}

const saveData = async () => {
    try {
        if (props.evaluation?.id) {
            await updateRecord(props.evaluation.id, newEvaluation.value)
        } else {
            await createRecord(newEvaluation.value)
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
.inputs_modal{
    flex-direction: column;
}
.description_modal{
    width: 100%;
}
</style>