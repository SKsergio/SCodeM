<template>
    <BaseModalComponent v-model="show" title="Register new teacher"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">

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
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" :enable-time-picker="false"
                            auto-apply />
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
                            <DuiComponent id="dui-maestro" v-model="newTeacher.dui" />
                        </div>

                        <div class="input__ct">
                            <label for="phone">Phone</label>
                            <input class="input_st" type="text" id="phone" v-model="newTeacher.phoneNumber">
                        </div>

                        <div class="end_section">
                            <div class="input__ct ">
                                <label for="speciality">Especiality</label>
                                <input class="input_st" type="text" id="speciality" v-model="newTeacher.speciality">
                            </div>

                            <div class="input__ct gender_section">
                                <label>Gender</label>
                                <div class="gender-toggle">
                                    <label class="gender-option">
                                        <input type="radio" value="M" v-model="newTeacher.gender" name="gender">
                                        <span class="gender-pill">Male</span>
                                    </label>

                                    <label class="gender-option">
                                        <input type="radio" value="F" v-model="newTeacher.gender" name="gender">
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
                                <p>{{ newTeacher.firstName }} {{ newTeacher.secondName }} {{ newTeacher.firstLastName }}
                                    {{ newTeacher.secondLastName }}</p>
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
                                <label>phone</label>
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
                                <label>addrees</label>
                                <p>{{ newTeacher.address || '---' }}</p>
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
    import { TeacherEditResponse, TeacherRequest } from '@/interfaces/Teacher/TeacherInterface';
    import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
    import ImageInputComponent from '@/components/inputs/ImageInputComponent.vue';
    import { ShowCreateAlert } from '@/components/alerts/createAlert';
    import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
    import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
    import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
    import type { useTeachers } from '@/composables/useTeachers';
    import Swal from 'sweetalert2';
    import DuiComponent from '@/components/inputs/DuiComponent.vue';

    const {
        createRecord,
        updateRecord
    } = inject("teacherContext") as ReturnType<typeof useTeachers>


    //PROPS Y EMMITS
    const props = defineProps<{
        modelValue: boolean,
        teacherData?: TeacherEditResponse | null;
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
        (e: 'emitido', value: boolean): void
    }>()


    const getInitialTeacher = (): TeacherRequest => ({
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

    const newTeacher = ref<TeacherRequest>(getInitialTeacher());
    const prefijo = import.meta.env.VITE_BASE_URL;


    const clean_form = () => {
        newTeacher.value = getInitialTeacher();
        photoPreview.value = ''
    }


    watch(
        () => props.modelValue,
        (isOpen) => {
            if (isOpen) {
                if (isOpen && props.teacherData) {

                    const { id, routePhoto, ...cleanData } = props.teacherData;

                    newTeacher.value = {
                        ...cleanData,
                        photo: null
                    } as unknown as TeacherRequest;

                    if (props.teacherData.routePhoto) {
                        photoPreview.value = `${prefijo}${props.teacherData.routePhoto}`;
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
        try {
            if (props.teacherData?.id) {
                await updateRecord(props.teacherData.id, newTeacher.value)
            } else {
                await createRecord(newTeacher.value)
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

<style>
.modal-width-pt {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

.theme-modal-manager {
    background-color: var(--color-sixth) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
    padding: 0 !important;
    border: 1px solid var(--color-fourth) !important;
    border-radius: 12px;
}

.picker {
    --dp-text-color: #ffffff;
    --dp-border-color: #3f4041;
    --dp-border-color-hover: #3b82f6;
    --dp-border-radius: 6px;
}

.picker input {
    background-color: var(--color-primary);
    color: var(--dp-text-color);
}
</style>