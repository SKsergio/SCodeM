<template>
    <BaseModalComponent v-model="show" title="Register new Degree" :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">
            <div class="form_wrapper box_panel">

                <section class="selects_modal">
                    <div class="form-group">
                        <label>Degree Detail</label>

                        <Multiselect v-model="newCourse.gradeDetailId" :options="props.degreeDetail" valueProp="id"
                            label="fullName" class="custom-select-modal" :searchable="true" placeholder="select a specific degree..."
                            noOptionsText="The list is empty" noResultsText="No results found" />
                    </div>

                    <div class="form-group">
                        <label>Period</label>
                        <Multiselect v-model="newCourse.periodId" class="custom-select-modal" :options="props.periods" valueProp="id"
                            label="startDate" :searchable="true" placeholder="Select a period..." />
                    </div>

                    <div class="form-group">
                        <label>Teacher</label>
                        <Multiselect v-model="newCourse.teacherId" class="custom-select-modal" :options="props.teachers" valueProp="id"
                            label="fullName" :searchable="true" placeholder="Select a teacher..." />
                    </div>

                    <div class="form-group">
                        <label>Subject</label>
                        <Multiselect v-model="newCourse.subjectId" class="custom-select-modal" :options="props.subjects" valueProp="id"
                            label="name" :searchable="true" placeholder="Select a subject..." />
                    </div>
                </section>

                <section class="inputs_modal">
                    <div class="input__ct">
                        <label for="ability">Valority Unity</label>
                        <input class="input_st" type="number" max="50" min="0" id="ability" v-model.number="newCourse.valorityUnity">
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
                                <label>Degree Specific Name</label>
                                <p>{{ getDegreeDetailName(newCourse.gradeDetailId) }}</p>
                            </div>
                          
                            <div class="field">
                                <label>Teacher Name</label>
                                <p>{{ getTeacherName(newCourse.teacherId) }}</p>
                            </div>

                              <div class="field">
                                <label>Subject Name</label>
                                <p>{{ getSubjectName(newCourse.subjectId) }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field half">
                                <label>Unity Value</label>
                                <p>{{ newCourse.valorityUnity }}</p>
                            </div>
                            <div class="field half">
                                <label>Period</label>
                                <p>{{getPeriodStartDate(newCourse.periodId) }}</p>
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
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
import {DegreeDetailSimpleResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
import { computed, inject, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { ApiError } from '@/interfaces/ApiError';
import { CourseEditResponse, CourseRequest } from '@/interfaces/Course/CourseInterface';
import { PeriodSimpleResponse } from '@/interfaces/Period/periodInterface';
import { useCourse } from '@/composables/useCourse';

//inyeccion de funcines
const {
    createRecord,
    updateRecord
} = inject("courseContext") as ReturnType<typeof useCourse>

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean
    course?: CourseEditResponse
    degreeDetail?: DegreeDetailSimpleResponse[]
    periods?: PeriodSimpleResponse[]
    teachers?: TeacherSimpleResponse[]
    subjects?: CatalogueSimpleResponse[]
}>();

console.log(props.degreeDetail);


const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()


const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

//INICIALIZACIONES
const getInitialCourse = (): CourseRequest => ({
    valorityUnity: null as unknown as number,
    gradeDetailId: null,
    periodId: null,
    teacherId: null,
    subjectId: null
})
const newCourse = ref<CourseRequest>(getInitialCourse());

const clean_form = () => {
    newCourse.value = getInitialCourse()
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            if (isOpen && props.course) {

                const { ...cleanData } = props.course;

                newCourse.value = {
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

const closeModal = () => {
    show.value = false
}

const validateForm = (): string | null => {
    // Validar campos requeridos no estén vacíos
    if (!newCourse.value.gradeDetailId) {
        return 'Selcct a degree detail'
    }
    if (!newCourse.value.periodId) {
        return 'Select a period'
    }
    if (!newCourse.value.teacherId) {
        return 'Select a teacher'
    }
    if (!newCourse.value.subjectId) {
        return 'Select a subject'
    }
    
    // Validar que ability no esté vacío y no sea mayor a 50
    if (newCourse.value.valorityUnity === null || newCourse.value.valorityUnity === undefined) {
        return 'Valority Unity is required'
    }
    if (newCourse.value.valorityUnity < 0 || newCourse.value.valorityUnity > 50) {
        return 'Valority Unity must be between 0 and 10'
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
    if (!id) return
    let degreeCurrent = props.degreeDetail?.find(dg => dg.id === id)
    if (degreeCurrent) {
        return degreeCurrent?.fullName
    } else {
        return "sin nombre";
    }
}

const getSubjectName = (id: number | null) => {
    if (!id) return
    let subjectCurrent = props.subjects?.find(dg => dg.id === id)
    if (subjectCurrent) {
        return subjectCurrent?.name
    } else {
        return "sin nombre";
    }
}

const getTeacherName = (id: number | null) => {
    if (!id) return
    let teacherCurrent = props.teachers?.find(dg => dg.id === id)
    if (teacherCurrent) {
        return teacherCurrent?.fullName
    } else {
        return "sin nombre";
    }
}

const getPeriodStartDate = (id: number | null) => {
    if (!id) return
    let periodCurrent = props.periods?.find(dg => dg.id === id)
    if (periodCurrent) {
        return periodCurrent?.startDate
    } else {
        return "sin nombre";
    }
}
</script>

<style scoped>
.icon_close {
    scale: 1.5;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    color: #9ca3af;
    transition: all .3s ease;
    z-index: 101;
}

.icon_close:hover {
    transform: scale(1.1);
    color: #ef4444;
}

.divider {
    height: 1px;
    background-color: var(--color-fourth);
    margin: 5px 0;
}

.form_container {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 20px;
    padding: 30px;
    background-color: var(--color-sixth);
    border-radius: 0;
    font-family: var(--font-v1);
    color: var(--color-text1);
}

/* LADO IZQUIERDO: Wrapper de las secciones */
.form_wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.section-title {
    font-size: 15px;
    color: var(--color-text-content);
    margin-bottom: 5px;
    font-weight: 800;
}

.box_panel {
    background-color: var(--color-primary);
    border: 1px solid var(--color-fourth);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    gap: 15px;
}
/* formularios */
.input__ct {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 48%;
}

.input_st,
.text_area_st {
    background-color: var(--color-menu);
    border: 1px solid var(--color-seccundary);
    color: var(--color-text-content);
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
}


.input_st:focus{
    border-color: #3b82f6;
}

.inputs_modal{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}
.btn_section {
    display: flex;
    padding: 15px 30px;
    background-color: var(--color-third);
    border-top: 1px solid var(--color-fourth);
    border-radius: 0 0 12px 12px;
    gap: 15px;
    justify-content: flex-end;
}

/* LADO DERECHO: EXPEDIENTE */
.previsualizar {
    flex-direction: column;
    align-items: center;
    height: fit-content;
}

.expediente-header {
    text-align: center;
    padding-bottom: 10px;
    width: 100%;
}

.expediente-header h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--color-text-content);
}

.expediente-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.field label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-line);
    letter-spacing: 1px;
}

.field p {
    font-size: 13px;
    color: var(--color-text-content);
    margin: 0;
    word-break: break-word;
}
</style>

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
</style>