<template>
    <BaseModalComponent v-model="show" title="Register new teacher"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="teacher_container">

            <div class="form_wrapper">
                <h3 class="section-title">TEACHER INFORMATION</h3>

                <section class="names box_panel">
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

                <section class="other_data box_panel">
                    <div class="input__ct">
                        <label for="birthdate">Birthdate</label>
                        <VueDatePicker v-model="newTeacher.birthDate" locale="es" format="yyyy-MM-dd"
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" 
                            :enable-time-picker="false" auto-apply/>
                    </div>

                    <div class="input__ct">
                        <label for="email">Email</label>
                        <input class="input_st" type="email" placeholder="jsxfhds@gmail.com" id="email"
                            v-model="newTeacher.email">
                    </div>

                    <div class="input__ct address_ct">
                        <label for="direction">Address</label>
                        <textarea id="direction" v-model="newTeacher.address" class="text_area_st"
                            placeholder="canton el camino hacia el...."></textarea>
                    </div>
                </section>

                <section class="documents box_panel">
                    <div class="sc1">
                        <label>Photo</label>
                        <ImageInputComponent @image="handleImageFromChild" :preview_photo="false"></ImageInputComponent>
                    </div>

                    <div class="sc2">
                        <div class="input__ct">
                            <label for="DUI">DUI</label>
                            <input class="input_st" type="text" placeholder="812395148-2" id="DUI"
                                v-model="newTeacher.dui">
                        </div>

                        <div class="input__ct">
                            <label for="phone">Phone</label>
                            <input class="input_st" type="text" id="phone" v-model="newTeacher.phoneNumber">
                        </div>

                        <div class="input__ct">
                            <label for="speciality">Especiality</label>
                            <input class="input_st" type="text" id="speciality" v-model="newTeacher.speciality">
                        </div>
                    </div>
                </section>
            </div>

            <section class="previsualizar box_panel">
                <div class="expediente-header">
                    <h2>EXPEDIENTE</h2>
                </div>

                <div class="img_preview">
                    <img v-if="photoPreview" :src="photoPreview" alt="foto de perfil" class="photo-preview">
                    <div v-else class="photo-placeholder">No Photo</div>
                </div>

                <div class="expediente-content">
                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>Nombre Completo</label>
                                <p>{{ newTeacher.firstName }} {{ newTeacher.secondName }} {{ newTeacher.firstLastName }}
                                    {{ newTeacher.secondLastName }}</p>
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
                                <p>{{ newTeacher.birthDate || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field half">
                                <label>DUI</label>
                                <p>{{ newTeacher.dui || '---' }}</p>
                            </div>
                            <div class="field half">
                                <label>Especialidad</label>
                                <p>{{ newTeacher.speciality || '---' }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>Teléfono</label>
                                <p>{{ newTeacher.phoneNumber || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Email</label>
                                <p>{{ newTeacher.email || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Dirección</label>
                                <p>{{ newTeacher.address || '---' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <section class="btn_section">
            <BtnSaveComponent @save_click="sendData"></BtnSaveComponent>
            <BtnCleanComponent></BtnCleanComponent>
            <BtnCancelComponent @click="closeModal"></BtnCancelComponent>
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
    console.log("Datos listos para guardar");
}

const sendData = async () => {
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

/* CONTENEDOR PRINCIPAL: Layout de 2 columnas */
.teacher_container {
    display: grid;
    grid-template-columns: 1.5fr 1fr;/* 60% Formulario, 40% Expediente */
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

/* PANELES INDIVIDUALES (Para reemplazar el border blanco que tenías) */
.box_panel {
    background-color: var(--color-primary);
    border: 1px solid var(--color-fourth);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    gap: 15px;
}

/* SECCIONES DEL FORMULARIO */
.names {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.other_data {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.documents {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
}

.sc1 {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.sc2 {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
}

/* INPUTS Y LABELS (Ahora en columna para más limpieza) */
.input__ct {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 48%;
}
.sc2 .input__ct{
    width: 100%;
}


.address_ct {
    width: 100%;
}

.input_st,
.text_area_st {
    background-color: var(--color-menu);
    border: 1px solid var(--color-seccundary) ;
    color: var(--color-text-content);
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
}

.text_area_st {
    resize: none;
    height: 80px;
}

.input_st:focus,
.text_area_st:focus {
    border-color: #3b82f6;
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

.img_preview {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    background-color: var(--color-menu);
    border: 1px solid var(--color-seccundary);
}

.photo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.photo-placeholder {
    color: var(--scroll-color);
    font-size: 12px;
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

.divider {
    height: 1px;
    background-color: var(--color-fourth);
    margin: 5px 0;
}

/* SECCIÓN DE BOTONES */
.btn_section {
    display: flex;
    padding: 15px 30px;
    background-color: var(--color-third);
    border-top: 1px solid var(--color-fourth);
    border-radius: 0 0 12px 12px;
    gap: 15px;
    justify-content: flex-end;
}
</style>

<style>
.modal-width-pt {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

.theme-modal-manager {
    background-color: #161b2b !important; /* var(--color-sixth) */
    box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
    padding: 0 !important;
    border: 1px solid #2f3835 !important; /* var(--color-fourth) */
    border-radius: 12px;
}

.picker {
    --dp-background-color: #181e2b;
    --dp-text-color: #ffffff;
    --dp-border-color: #3f4041;
    --dp-border-color-hover: #3b82f6;
    --dp-border-radius: 6px;
}

.picker input {
    background-color: var(--dp-background-color);
    color: var(--dp-text-color);
}
</style>