<template>
    <BaseModalComponent v-model="show" title="Register new Period" :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">
            <div class="form_wrapper box_panel">

                <section class="inputs_modal">
                    <div class="input__ct">
                        <label for="ability">Start Date</label>
                         <VueDatePicker v-model="newPeriod.startDate" locale="es" format="yyyy-MM-dd"
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" :enable-time-picker="false"
                            auto-apply />
                    </div>

                    <div class="input__ct">
                        <label for="year">End Date</label>
                        <VueDatePicker v-model="newPeriod.endDate" locale="es" format="yyyy-MM-dd"
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
                            <div class="field half">
                                <label>Start Date</label>
                                <p>{{ newPeriod.startDate }}</p>
                            </div>
                            <div class="field half">
                                <label>End Date</label>
                                <p>{{ newPeriod.endDate }}</p>
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
import { computed, inject, ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import CloseIcon from '~icons/ri/close-large-line'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { PeriodRequest, PeriodResponse } from '@/interfaces/Period/periodInterface';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import type{ usePeriod } from '@/composables/usePeriod';

import { ApiError } from '@/interfaces/ApiError';

//inyeccion de funcines
const {
    createRecord,
    updateRecord
} = inject("periodContext") as ReturnType<typeof usePeriod>

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean
    period?: PeriodResponse | null
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
const getInitialPeriod = (): PeriodRequest => ({
    startDate: "",
    endDate: "",
})
const newPeriod = ref<PeriodRequest>(getInitialPeriod());

const clean_form = () => {
    newPeriod.value = getInitialPeriod()
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            if (isOpen && props.period) {

                const { ...cleanData } = props.period;

                newPeriod.value = {
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
    if (!newPeriod.value.startDate) {
        return 'Selecciona una fecha de inicio'
    }
    if (!newPeriod.value.endDate) {
        return 'Selecciona una fecha de fin'
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

<style>
.modal-width-pt {
    width: 100%;
    /* max-width: 700px; */
    margin: 0 auto;
}
</style>