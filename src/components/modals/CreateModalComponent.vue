<template>
    <BaseModalComponent v-model="show" title="Crear registro" :custom-class="'modal-width theme-transparent'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <form class="form" @submit.prevent="sendForm">
            <section class="input__ct" v-for="(field, index) in store.editableFields" :key="index">
                <InputComponent :field="field" v-model="createRecord[field as keyof typeof createRecord]" />
            </section>

            <section class="btn_sections">
                <BtnSaveComponent @save_click="sendForm"></BtnSaveComponent>

                <BtnCancelComponent @cancel_click="closeModal"></BtnCancelComponent>
            </section>
        </form>
    </BaseModalComponent>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import BtnSaveComponent from '../buttons/BtnSaveComponent.vue'
    import BtnCancelComponent from '../buttons/BtnCancelComponent.vue'
import BaseModalComponent from './BaseModalComponent.vue'
import InputComponent from '../inputs/InputComponent.vue'
import CloseIcon from '~icons/ri/close-large-line'
import { reactive, computed } from 'vue'
import { useCatalogueStore } from '@/store/CatalogueStore'
import { InfoMessageAlert } from '../alerts/InfoAlert'
import { ShowCreateAlert } from '../alerts/createAlert'
import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface'

const props = defineProps<{
    modelValue: boolean
    store_id: string
    endpoint: string
    onSuccess?: () => void
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const closeModal = () => {
    show.value = false
    resetForm()
}

const store = useCatalogueStore<T>(props.store_id, props.endpoint)()

const createRecord = reactive({}) as T

function hasEmptyFields(obj: Record<string, any>) {
    return Object.values(obj).some(v => v === '' || v == null)
}

const saveData = async () => {
    await store.createRecord(createRecord)
}

const sendForm = async () => {
    if (hasEmptyFields(createRecord)) {
        InfoMessageAlert('Los campos no pueden ir vacíos', '')
        return
    }

    const ok = await ShowCreateAlert(saveData)
    if (ok) {
        props.onSuccess?.()
        closeModal()
    }
}

const resetForm = () => {
    store.editableFields.forEach(field => {
        (createRecord as any)[field] = ''
    })

}
</script>


<style>
.modal-width {
    width: 100%;
    max-width: 800px;
}

.theme-transparent {
    background-color: var(--color-eight);
    box-shadow: none !important;
    padding: 0 !important;
    border: none !important;
}
</style>

<style scoped>
.form {
    background-color: var(--color-seventh);
    z-index: 100;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    border-radius: 0px 0px 20px;
    position: relative;
}

.btn_sections {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.icon_close {
    scale: 1.5;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    color: rgb(121, 19, 19);
    transition: all .3s ease;
    z-index: 101;
}

.icon_close:hover {
    transform: scale(1.1);
}
</style>