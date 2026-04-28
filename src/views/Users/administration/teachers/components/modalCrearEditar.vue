<template>
    <BaseModalComponent v-model="show" title="Registrar Nuevo Encargado"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />
        <div class="teacher_container">

            <section class="names">
                <div class="input__ct">
                    <label for="first_name">First Name</label>
                    <input class="input_st" type="text" id="first_name" placeholder="Maria..."
                        v-model="newTeacher.firstName">
                </div>

                <div class="input__ct">
                    <label for="seccond_name">Seccond Name</label>
                    <input class="input_st" type="text" id="seccond_name" v-model="newTeacher.secondName"
                        placeholder="Carmen...">
                </div>

                <div class="input__ct">
                    <label for="first_last_name">First Last Name</label>
                    <input class="input_st" type="text" id="first_last_name" placeholder="Avalos"
                        v-model="newTeacher.firstLastName">
                </div>

                <div class="input__ct">
                    <label for="second_last_name">Seccond Last Name</label>
                    <input class="input_st" type="text" id="second_last_name" v-model="newTeacher.secondLastName"
                        placeholder="Henriquez">
                </div>
            </section>

            <section class="documents">
                <div class="input__ct">
                    <label for="DUI">DUI</label>
                    <input class="input_st" type="text" placeholder="812395148-2" id="DUI" v-model="newTeacher.dui">
                </div>

                <div class="input__ct">
                    <label for="direction">Phone</label>
                    <input class="input_st" type="text" id="phone" v-model="newTeacher.phoneNumber">
                </div>

                <div class="input__ct">
                    <label for="speciality">Especiality</label>
                    <input class="input_st" type="text" id="speciality" v-model="newTeacher.speciality">
                </div>

            </section>

            <section class="other_data">
                <div class="input__ct">
                    <label for="birthdate">Birthdate</label>
                    <VueDatePicker v-model="newTeacher.birthDate" locale="es" format="yyyy-MM-dd"
                        model-type="yyyy-MM-dd" class="custom-datepicker" :teleport="true" :enable-time-picker="false"
                        auto-apply />
                </div>

                <div class="input__ct">
                    <label for="email">Email</label>
                    <input class="input_st" type="email" placeholder="jsxfhds@gmail.com" id="email"
                        v-model="newTeacher.email">
                </div>

                <div class="input__ct">
                    <label for="direction">Address</label>
                    <textarea id="direction" v-model="newTeacher.address" class="text_area_st"
                        placeholder="canton el camino hacia el...."></textarea>
                </div>
            </section>

            <section class="img_data">
                <label>Photo</label>
                <ImageInputComponent @image="handleImageFromChild"></ImageInputComponent>
            </section>

            <section class="previsualizar">

                <div class="expediente-header">
                    <h2>Expediente</h2>
                </div>

                <div class="img_preview">
                    <img :src="photoPreview" alt="foto de perfil" class="photo-preview"> 
                </div>

                <div class="expediente-content">
                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>Nombre Completo</label>
                                <p>{{ newTeacher.firstName }} {{ newTeacher.secondName }} {{ newTeacher.firstLastName }} {{ newTeacher.secondLastName }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div> 

                                        <div class="field-group">
                        <div class="field-row">
                            <div class="field half">
                                <label>Edad</label>
                                <p>{{ calculateAge() }} años</p>
                            </div>
                            <div class="field half">
                                <label>Nacimiento</label>
                                <p>{{ newTeacher.birthDate }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field half">
                                <label>DUI</label>
                                <p>{{ newTeacher.dui }}</p>
                            </div>
                            <div class="field half">
                                <label>Especialidad</label>
                                <p>{{ newTeacher.speciality }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>Teléfono</label>
                                <p>{{ newTeacher.phoneNumber }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Email</label>
                                <p>{{ newTeacher.email }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Dirección</label>
                                <p>{{ newTeacher.address }}</p>
                            </div>
                        </div>
                    </div>

                </div>


            </section>

        </div>

        <section class="btn_section">
            <BtnSaveComponent @save_click="sendData"></BtnSaveComponent>
            <BtnCleanComponent></BtnCleanComponent>
            <BtnCancelComponent></BtnCancelComponent>
        </section>
    </BaseModalComponent>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Gender } from '@/enum/GenderEnum';
import CloseIcon from '~icons/ri/close-large-line'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { TeacherRequest } from '@/interfaces/Teacher/TeacherInterface';
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import ImageInputComponent from '@/components/inputs/ImageInputComponent.vue';
import { CreateManager } from '@/services/Students/StudentManagerService';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';

const newTeacher = ref<TeacherRequest>({
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    address: '',
    birthDate: "",
    phoneNumber: '',
    email: '',
    gender: null as unknown as Gender,
    speciality: '',
    photo: null,
    dui: '',
})

const photoPreview = ref<string>('')

const calculateAge = (): number => {
    if (!newTeacher.value.birthDate) return 0
    const today = new Date()
    const birthDate = new Date(newTeacher.value.birthDate)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

//PROPS Y EMMITS
const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const handleImageFromChild = (file: File) => {
    newTeacher.value.photo = file;
    const reader = new FileReader()
    reader.onload = (e) => {
        photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
}

const closeModal = () => {
    show.value = false
}

const saveData = async () => {
    // await CreateManager(newTeacher.value)
    console.log("hOLA");

}

const sendData = async () => {
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

.photo-preview{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.teacher_container {
    display: grid;
    padding: 20px;
    gap: 15px;
    color: var(--color-text1);
    font-family: var(--font-v1);
    justify-items: stretch;
    align-items: start;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
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
    grid-row: 3 / 4;
    grid-column: 1 / 4
}

.btn_section {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
    flex-direction: row;
    margin-left: auto;
    gap: 10px;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
}

.other_data {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    grid-row: 2/3;
    grid-column: -6/-3;
}

.documents {
    grid-row: 3 / 4;
    grid-column: 2 / 4;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.icon_close {
    scale: 1.5;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    color: var(--color-delete);
    transition: all .3s ease;
    z-index: 101;
}

.icon_close:hover {
    transform: scale(1.1);
}

.previsualizar {
    grid-row: 1/ 4;
    grid-column: 4 / 6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border: 2px solid var(--color-text1);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
}

.teacher_container section {
    display: flex;
    gap: 15px;
    padding: 10px;
    /* overflow-y: auto; */
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

/* expediente */
.expediente-header {
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 3px solid var(--color-text1);
}

.expediente-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--color-text1);
}
.expediente-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}
.field-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.img_preview{
    width: 50%;
    height: 250px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
}

.field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.field-row .field:only-child {
    grid-column: 1 / -1;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.field.half {
    flex: 1;
}

.field label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text1);
    letter-spacing: 1px;
}

/* .field p {
    margin: 0;
    font-size: 14px;
    color: var(--color-text1);
    font-weight: 500;
    padding: 4px;
    background-color: var( --color-fifth);
    border-radius: 4px;
    border-left: 3px solid var(--color-text1);
    min-height: 30px;
    display: flex;
    align-items: center;
} */
.divider {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-text1), transparent);
    margin: 5px 0;
}

</style>