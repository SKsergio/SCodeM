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
                <h1>
                    Hola
                </h1>
                <h4>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex aut veniam blanditiis numquam impedit porro voluptatibus sequi repellendus incidunt harum, sit atque odit expedita, commodi deleniti doloribus autem ipsa. Ipsam.
                    Minima placeat omnis fuga illum maxime ipsam optio, maiores voluptatem explicabo deleniti dolorum numquam facilis. Pariatur odit quidem ipsa libero voluptatibus excepturi asperiores alias. Ratione, rem nulla? Quo, cupiditate neque.
                    Iste perferendis hic corrupti magnam laborum, ipsam voluptatibus quos commodi, earum quo dolor temporibus! Porro nemo rem eum officiis deleniti debitis nostrum odio, quasi consectetur autem adipisci sit nam facere.
                    Aspernatur similique mollitia voluptatibus placeat, molestias rerum atque est temporibus fugit voluptate debitis laudantium ut nam eligendi impedit omnis vel exercitationem cumque voluptas quae at nihil! Dignissimos officiis inventore dolorum.
                    Fugiat culpa, voluptatum exercitationem cupiditate dicta soluta aliquid ex vero quo aliquam. Laudantium obcaecati voluptates fugiat, provident illum veritatis ipsum! Ipsa, impedit minima! Adipisci quidem, recusandae eius error totam illo?
                

                
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque at ullam, dolore illo voluptatem dicta saepe voluptates quibusdam, quos dolorum quod enim assumenda quasi veniam labore quis expedita ad soluta.
               </h4>
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

const age = ref<number>(0)

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
    margin-top: auto;
    margin-left: auto;
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

.previsualizar{
    grid-row: 1/ 4;
    grid-column: 4 / 6;
}

.teacher_container section {
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