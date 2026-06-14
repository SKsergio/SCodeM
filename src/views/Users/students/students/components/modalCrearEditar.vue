<template>
    <BaseModalComponent v-model="show" title="Register new Student"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">

            <div class="form_wrapper">
                <h3 class="section-title">STUDENT INFORMATION</h3>

                <section class="names box_panel">
                    <div class="input__ct">
                        <label for="first_name">First Name</label>
                        <input class="input_st" type="text" id="first_name" placeholder="Maria..."
                            v-model="newStudent.firstName">
                    </div>

                    <div class="input__ct">
                        <label for="seccond_name">Seccond Name</label>
                        <input class="input_st" type="text" id="seccond_name" v-model="newStudent.secondName"
                            placeholder="Carmen...">
                    </div>

                    <div class="input__ct">
                        <label for="first_last_name">First Last Name</label>
                        <input class="input_st" type="text" id="first_last_name" placeholder="Avalos"
                            v-model="newStudent.firstLastName">
                    </div>

                    <div class="input__ct">
                        <label for="second_last_name">Seccond Last Name</label>
                        <input class="input_st" type="text" id="second_last_name" v-model="newStudent.secondLastName"
                            placeholder="Henriquez">
                    </div>
                </section>

                <section class="other_data box_panel">
                    <div class="input__ct">
                        <label for="birthdate">Birthdate</label>
                        <VueDatePicker v-model="newStudent.birthDate" locale="es" format="yyyy-MM-dd"
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" :enable-time-picker="false"
                            auto-apply />
                    </div>

                    <div class="input__ct">
                        <label for="email">Email</label>
                        <input class="input_st" type="email" placeholder="jsxfhds@gmail.com" id="email"
                            v-model="newStudent.email">
                    </div>

                    <div class="input__ct address_ct">
                        <label for="direction">Address</label>
                        <textarea id="direction" v-model="newStudent.address" class="text_area_st"
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
                            <label for="Carnet">Carnet</label>
                            <input class="input_st" type="text" placeholder="2025001" id="Carnet"
                                v-model="newStudent.carnet">
                        </div>

                        <div class="input__ct">
                            <label for="phone">Phone</label>
                            <input class="input_st" type="text" id="phone" v-model="newStudent.phoneNumber">
                        </div>

                        <div class="end_section">
                            <div class="input__ct gender_section">
                                <label>Gender</label>
                                <div class="gender-toggle gender_sc">
                                    <label class="gender-option">
                                        <input type="radio" value="M" v-model="newStudent.gender" name="gender">
                                        <span class="gender-pill">Male</span>
                                    </label>

                                    <label class="gender-option">
                                        <input type="radio" value="F" v-model="newStudent.gender" name="gender">
                                        <span class="gender-pill">Female</span>
                                    </label>
                                </div>
                            </div>
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
                                <label>Complete Name</label>
                                <p>{{ newStudent.firstName }} {{ newStudent.secondName }} {{ newStudent.firstLastName }}
                                    {{ newStudent.secondLastName }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field half">
                                <label>Age</label>
                                <p>{{ calculateAge() }} años</p>
                            </div>
                            <div class="field half">
                                <label>BirthDate</label>
                                <p>{{ newStudent.birthDate || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field half">
                                <label>Carnet</label>
                                <p>{{ newStudent.carnet || '---' }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>phone</label>
                                <p>{{ newStudent.phoneNumber || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Email</label>
                                <p>{{ newStudent.email || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>addrees</label>
                                <p>{{ newStudent.address || '---' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <section class="btn_section">
            <BtnSaveComponent @save_click="sendData"></BtnSaveComponent>
            <BtnCleanComponent @clean_click="clean_form"></BtnCleanComponent>
            <BtnCancelComponent @click="closeModal"></BtnCancelComponent>
        </section>
    </BaseModalComponent>
</template>

<script setup lang="ts">
import { computed, ref, inject, watch } from 'vue';
import { Gender } from '@/enum/GenderEnum';
import CloseIcon from '~icons/ri/close-large-line'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
import ImageInputComponent from '@/components/inputs/ImageInputComponent.vue';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
import type { useStudents } from '@/composables/useStudent';
import Swal from 'sweetalert2';
import { StudentEditResponse, StudentRequest } from '@/interfaces/students/studentInterface';

const {
    createRecord,
    updateRecord
} = inject("studentContext") as ReturnType<typeof useStudents>


//PROPS Y EMMITS
const props = defineProps<{
    modelValue: boolean,
    studentData?: StudentEditResponse | null;
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'emitido', value: boolean): void
}>()


const getInitialStudent = (): StudentRequest => ({
    firstName: '',
    secondName: '',
    firstLastName: '',
    carnet: '',
    secondLastName: '',
    address: '',
    birthDate: "",
    phoneNumber: '',
    email: '',
    gender: null as unknown as Gender,
    photo: null,
})

const newStudent = ref<StudentRequest>(getInitialStudent());
const prefijo = import.meta.env.VITE_BASE_URL;


const clean_form = () => {
    newStudent.value = getInitialStudent();
    photoPreview.value = ''
}


watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            if (isOpen && props.studentData) {

                const { id, routePhoto, ...cleanData } = props.studentData;

                newStudent.value = {
                    ...cleanData,
                    photo: null
                } as unknown as StudentRequest;

                if (props.studentData.routePhoto) {
                    photoPreview.value = `${prefijo}${props.studentData.routePhoto}`;
                } else {
                    photoPreview.value = '';
                }
            } else {
                clean_form();
            }
        } else {
            clean_form()
        }
    }
)

const photoPreview = ref<string>('')

const calculateAge = (): number => {
    if (!newStudent.value.birthDate) return 0
    const today = new Date()
    const birthDate = new Date(newStudent.value.birthDate)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

const handleImageFromChild = (file: File) => {
    newStudent.value.photo = file;
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
    try {
        if (props.studentData?.id) {
            await updateRecord(props.studentData.id, newStudent.value)
        } else {
            await createRecord(newStudent.value)
            Swal.fire("Creando...");
        }
    } catch (error) {
        console.log("ocurrio un error: " + error);
        throw error;
    }
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
.gender_sc{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>