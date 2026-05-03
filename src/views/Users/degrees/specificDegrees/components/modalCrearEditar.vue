<template>
    <BaseModalComponent v-model="show" title="Register new Degree" :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">
            <div class="form_wrapper box_panel">

                <section class="selects_modal">
                    <div class="form-group">
                        <label>Academic Degree</label>

                        <Multiselect v-model="newDegreeDetail.degreeId" :options="props.degrees" valueProp="id"
                            label="name" class="custom-select-modal" :searchable="true" placeholder="select a degree..."
                            noOptionsText="The list is empty" noResultsText="No results found" />
                    </div>

                    <div class="form-group">
                        <label>Section</label>
                        <Multiselect v-model="newDegreeDetail.sectionId" class="custom-select-modal" :options="props.sections" valueProp="id"
                            label="name" :searchable="true" placeholder="select a section..." />
                    </div>

                    <div class="form-group">
                        <label>Tutor in charge</label>
                        <Multiselect v-model="newDegreeDetail.tutorId" class="custom-select-modal" :options="props.tutors" valueProp="id"
                            label="fullName" :searchable="true" placeholder="select a tutor..." />
                    </div>
                </section>

                <section class="inputs_modal">
                    <div class="input__ct">
                        <label for="ability">Ability</label>
                        <input class="input_st" type="number" max="50" min="0" id="ability" v-model.number="newDegreeDetail.ability">
                    </div>

                    <div class="input__ct">
                        <label for="year">Year</label>
                        <input class="input_st" type="number" :max="currentYear" min="1900" id="year" v-model.number="newDegreeDetail.year">
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
                                <label>Degree Name</label>
                                <p>{{ getDegreeName(newDegreeDetail.degreeId) }}</p>
                            </div>
                            <div class="field">
                                <label>Section Name</label>
                                <p>{{ getSectionName(newDegreeDetail.sectionId) }}</p>
                            </div>
                            <div class="field">
                                <label>Tutor Name</label>
                                <p>{{ getTutorName(newDegreeDetail.tutorId) }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field half">
                                <label>Ability</label>
                                <p>{{ newDegreeDetail.ability }}</p>
                            </div>
                            <div class="field half">
                                <label>Year</label>
                                <p>{{ newDegreeDetail.year }}</p>
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
import { DegreeDetailEditResponse, DegreeDetailRequest } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
import { computed, inject, ref, watch } from 'vue';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import type{ useDegreeDetail } from '@/composables/useDegreeDetail';
import { ApiError } from '@/interfaces/ApiError';

//inyeccion de funcines
const {
    createRecord,
    updateRecord
} = inject("degreDetailContext") as ReturnType<typeof useDegreeDetail>

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean
    degreeDetail?: DegreeDetailEditResponse | null
    degrees?: CatalogueSimpleResponse[]
    sections?: CatalogueSimpleResponse[]
    tutors?: TeacherSimpleResponse[]
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()

const currentYear = computed(() => new Date().getFullYear())

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

//INICIALIZACIONES
const getInitialDegreeDetail = (): DegreeDetailRequest => ({
    ability: null as unknown as number,
    year: 2026,
    degreeId: null,
    tutorId: null,
    sectionId: null
})
const newDegreeDetail = ref<DegreeDetailRequest>(getInitialDegreeDetail());

const clean_form = () => {
    newDegreeDetail.value = getInitialDegreeDetail()
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            if (isOpen && props.degreeDetail) {

                const { ...cleanData } = props.degreeDetail;

                newDegreeDetail.value = {
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
    if (!newDegreeDetail.value.degreeId) {
        return 'Selecciona un grado académico'
    }
    if (!newDegreeDetail.value.sectionId) {
        return 'Selecciona una sección'
    }
    if (!newDegreeDetail.value.tutorId) {
        return 'Selecciona un tutor'
    }
    
    // Validar que ability no esté vacío y no sea mayor a 50
    if (newDegreeDetail.value.ability === null || newDegreeDetail.value.ability === undefined) {
        return 'La capacidad es requerida'
    }
    if (newDegreeDetail.value.ability > 50) {
        return 'La capacidad no puede ser mayor a 50'
    }
    if (newDegreeDetail.value.ability < 0) {
        return 'La capacidad no puede ser menor a 0'
    }
    
    // Validar que year no esté vacío y no sea mayor al año actual
    if (!newDegreeDetail.value.year) {
        return 'El año es requerido'
    }
    if (newDegreeDetail.value.year > currentYear.value) {
        return `El año no puede ser mayor al año actual (${currentYear.value})`
    }
    if (newDegreeDetail.value.year < 1900) {
        return 'El año no puede ser menor a 1900'
    }
    
    return null
}

const saveData = async () => {
     try {
        if (props.degreeDetail?.id) {
            await updateRecord(props.degreeDetail.id, newDegreeDetail.value)
        } else {
            await createRecord(newDegreeDetail.value)
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
const getDegreeName = (id: number | null) => {
    if (!id) return
    let degreeCurrent = props.degrees?.find(dg => dg.id === id)
    if (degreeCurrent) {
        return degreeCurrent?.name
    } else {
        return "sin nombre";
    }
}

const getSectionName = (id: number | null) => {
    if (!id) return
    let degreeCurrent = props.sections?.find(dg => dg.id === id)
    if (degreeCurrent) {
        return degreeCurrent?.name
    } else {
        return "sin nombre";
    }
}

const getTutorName = (id: number | null) => {
    if (!id) return
    let degreeCurrent = props.tutors?.find(dg => dg.id === id)
    if (degreeCurrent) {
        return degreeCurrent?.fullName
    } else {
        return "sin nombre";
    }
}
</script>

<style scoped>
.inputs_modal{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}
</style>

<style>
.modal-width-pt {
    width: 100%;
    max-width: 900px;
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