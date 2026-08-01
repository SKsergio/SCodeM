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

                <div class="form-group">
                        <label>Degree Detail</label>

                        <Multiselect v-model="newPeriod.gradeDetailId" :options="props.degreeDetail" valueProp="id"
                            label="fullName" class="custom-select-modal" :searchable="true" placeholder="select a specific degree..."
                            noOptionsText="The list is empty" noResultsText="No results found" />
                    </div>
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
                        <div class="field-row">
                            <div class="field half">
                                <label>Degree Detail</label>
                                <p>{{ getDegreeDetailName(newPeriod.gradeDetailId) }}</p>
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
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import CloseIcon from '~icons/ri/close-large-line'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import { PeriodEditResponse, PeriodRequest, PeriodResponse } from '@/interfaces/Period/periodInterface';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import type { usePeriod } from '@/composables/usePeriod';

import { ApiError } from '@/interfaces/ApiError';
import { DegreeDetailSimpleResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';

//inyeccion de funcines
const {
    createRecord,
    updateRecord
} = inject("periodContext") as ReturnType<typeof usePeriod>

//PROPS Y EMITS
const props = defineProps<{
    modelValue: boolean
    period?: PeriodEditResponse | null,
    degreeDetail?: DegreeDetailSimpleResponse[]
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
    gradeDetailId: 0,
})
const newPeriod = ref<PeriodRequest>(getInitialPeriod());

const clean_form = () => {
    newPeriod.value = getInitialPeriod()
}

const getDegreeDetailName = (id: number | null) => {
    if (!id) return
    let degreeCurrent = props.degreeDetail?.find(dg => dg.id === id)
    if (degreeCurrent) {
        return degreeCurrent?.fullName
    } else {
        return "sin nombre";
    }
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
.inputs_modal {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}
</style>