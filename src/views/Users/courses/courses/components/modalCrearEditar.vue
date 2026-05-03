<template>
    <BaseModalComponent v-model="show" title="Register new Course" :custom-class="'modal-width-pt theme-modal-manager'">
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