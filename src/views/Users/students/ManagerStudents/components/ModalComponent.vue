<template>
    <BaseModalComponent v-model="show" title="Registrar Nuevo Encargado"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <XCircleIcon class="icon_close" @click="closeModal" />
        <div class="manager_container">

            <section class="names">
                <div class="input__ct">
                    <label for="first_name">First Name</label>
                    <input class="input_st" type="text" id="first_name" placeholder="Maria..."
                        v-model="newManager.first_name">
                </div>

                <div class="input__ct">
                    <label for="seccond_name">Seccond Name</label>
                    <input class="input_st" type="text" id="seccond_name" v-model="newManager.seccond_name"
                        placeholder="Carmen...">
                </div>

                <div class="input__ct">
                    <label for="first_last_name">First Last Name</label>
                    <input class="input_st" type="text" id="first_last_name" placeholder="Avalos"
                        v-model="newManager.first_last_name">
                </div>

                <div class="input__ct">
                    <label for="second_last_name">Seccond Last Name</label>
                    <input class="input_st" type="text" id="second_last_name" v-model="newManager.second_last_name"
                        placeholder="Henriquez">
                </div>

                <div class="input__ct">
                    <label for="married_surname">Married Surname</label>
                    <input class="input_st" type="text" id="married_surname" placeholder="casada..."
                        v-model="newManager.married_surname">
                </div>
            </section>

            <section class="documents">
                <div class="input__ct">
                    <label for="DUI">DUI</label>
                    <input class="input_st" type="text" placeholder="812395148-2" id="DUI" v-model="newManager.DUI">
                </div>

                <div class="input__ct">
                    <label for="passport">Passport</label>
                    <input class="input_st" type="text" placeholder="no requerido" id="passport"
                        v-model="newManager.passport">
                </div>
            </section>

            <section class="other_data">
                <div class="input__ct">
                    <label for="birthdate">Birthdate</label>
                    <VueDatePicker v-model="newManager.birthdate" locale="es" format="yyyy-MM-dd"
                        model-type="yyyy-MM-dd" class="custom-datepicker" :teleport="true" :enable-time-picker="false"
                        auto-apply />
                </div>

                <div class="input__ct">
                    <label for="direction">Age</label>
                    <input class="input_st" type="number" id="age" v-model="newManager.age" readonly="true">
                </div>

                <div class="input__ct">
                    <label for="direction">Address</label>
                    <textarea id="direction" v-model="newManager.direction" class="text_area_st"
                        placeholder="canton el camino hacia el...."></textarea>
                </div>

                <div class="input__ct">
                    <label for="nationality">Nationality</label>
                    <input class="input_st" type="text" id="nationality" v-model="newManager.nationality">
                </div>

                <div class="input__ct">
                    <label for="email">Email</label>
                    <input class="input_st" type="email" placeholder="jsxfhds@gmail.com" id="email"
                        v-model="newManager.email">
                </div>
            </section>

            <section class="img_data">
                <label>Photo</label>
                <ImageInputComponent @image="handleImageFromChild"></ImageInputComponent>
            </section>

            <section class="btn_section">
                <button @click="sendData">Guardar</button>
                <button>Limpiar</button>
                <button>Cancelar</button>
            </section>

        </div>
    </BaseModalComponent>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { XCircleIcon } from '@heroicons/vue/24/solid';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { StudentManagerPayload } from '@/interfaces/students/StudentManagers';
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import ImageInputComponent from '@/components/inputs/ImageInputComponent.vue';
import { CreateManager } from '@/services/Students/StudentManagerService';
import { ShowCreateAlert } from '@/components/alerts/createAlert';

const newManager = ref<StudentManagerPayload>({
    id: 0,
    DUI: '',
    passport: null,
    first_name: '',
    seccond_name: '',
    first_last_name: '',
    second_last_name: '',
    married_surname: null,
    direction: '',
    nationality: '',
    birthdate: "",
    email: '',
    age: 0,
    photo: null,
    file_type_id: 1
})

//PROPS Y EMMITS
const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value:boolean):void
}>()

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const handleImageFromChild = (file: File) => {
    newManager.value.photo = file;
}

const closeModal = () => {
    show.value = false
}

const saveData = async () => {
    await CreateManager(newManager.value)
}

const sendData = async() =>{
    const ok = await ShowCreateAlert(saveData)

    if (ok) {
        closeModal()
        emit('emitido', true)
    }
}

//FALTA
//VALIDAR QUE NO SE VAYAN CAMPOS VACIOS
//MANEJAR ERRORES
//ACTUALIZAR LA TABLA CUANDO SE AGREGUE UNO NUEVO
</script>

<style>
.modal-width-pt {
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
}

.theme-modal-manager {
    background-color: var(--color-eight);
    box-shadow: none !important;
    padding: 0 !important;
    border: none !important;
}

.manager_container {
    display: grid;
    padding: 20px;
    gap: 15px;
    color: var(--color-text1);
    font-family: var(--font-v1);
    justify-items: stretch;
    align-items: start;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    background-color: var(--color-menu);
}

/* hijos */
.names {
    grid-column: 1/ 4;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
}

.img_data {
    grid-row: 1/1;
    grid-column: 4/6;
}

.btn_section {
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: auto;
    margin-left: auto;
    grid-row: 2/3;
    grid-column: 5/6;
}

.other_data {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    grid-row: 2/3;
    grid-column: -6/-3;
}

.documents {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.icon_close {
    width: 45px;
    position: absolute;
    right: 15px;
    top: 7px;
    cursor: pointer;
    color: var(--color-delete);
    transition: all .5s ease;
    z-index: 101;
}

.manager_container section {
    display: flex;
    gap: 15px;
    padding: 10px;
}

.input__ct {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: row;
}

.input__ct label {
    min-width: 140px;
    text-align: left;
    font-weight: 500;
    flex-shrink: 0;
}
</style>