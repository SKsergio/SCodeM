<template>
    <BaseModalComponent v-model="show" title="Nuevo registro de Encargado"
        :custom-class="'modal-width-pt theme-modal-manager'">
        <CloseIcon class="icon_close" @click="closeModal" />

        <div class="form_container">

            <div class="form_wrapper">
                <h3 class="section-title">INFORMACIÓN DEL ENCARGADO</h3>

                <section class="names box_panel">
                    <div class="input__ct">
                        <label for="first_name">Primer Nombre</label>
                        <input class="input_st" type="text" id="first_name" placeholder="Maria..."
                            v-model="newManager.firstName">
                    </div>

                    <div class="input__ct">
                        <label for="seccond_name">Segundo Nombre</label>
                        <input class="input_st" type="text" id="seccond_name" v-model="newManager.secondName"
                            placeholder="Carmen...">
                    </div>

                    <div class="input__ct">
                        <label for="first_last_name">Primer Apellido</label>
                        <input class="input_st" type="text" id="first_last_name" placeholder="Avalos"
                            v-model="newManager.firstLastName">
                    </div>

                    <div class="input__ct">
                        <label for="second_last_name">Segundo Apellido</label>
                        <input class="input_st" type="text" id="second_last_name" v-model="newManager.secondLastName"
                            placeholder="Henriquez">
                    </div>
                </section>

                <section class="other_data box_panel">
                    <div class="input__ct">
                        <label for="birthdate">Fecha de Nacimiento</label>
                        <VueDatePicker v-model="newManager.birthDate" locale="es" format="yyyy-MM-dd"
                            model-type="yyyy-MM-dd" :teleport="true" class="picker" :enable-time-picker="false"
                            auto-apply />
                    </div>

                    <div class="input__ct">
                        <label for="email">Email</label>
                        <input class="input_st" type="email" placeholder="jsxfhds@gmail.com" id="email"
                            v-model="newManager.email">
                    </div>

                    <div class="input__ct address_ct">
                        <label for="direction">Dirección</label>
                        <textarea id="direction" v-model="newManager.address" class="text_area_st"
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
                            <DuiComponent id="dui-maestro" v-model="newManager.dui" />
                        </div>

                        <div class="input__ct">
                            <label for="phone">Teléfono</label>
                            <input class="input_st" type="text" id="phone" v-model="newManager.phoneNumber">
                        </div>

                        <div class="end_section">

                            <div class="input__ct gender_section">
                                <label>Gender</label>
                                <div class="gender-toggle">
                                    <label class="gender-option">
                                        <input type="radio" value="M" v-model="newManager.gender" name="gender">
                                        <span class="gender-pill">Masculino</span>
                                    </label>

                                    <label class="gender-option">
                                        <input type="radio" value="F" v-model="newManager.gender" name="gender">
                                        <span class="gender-pill">Femenino</span>
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
                                <p>{{ newManager.firstName }} {{ newManager.secondName }} {{ newManager.firstLastName }}
                                    {{ newManager.secondLastName }}</p>
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
                                <label>Fecha de Nacimiento</label>
                                <p>{{ newManager.birthDate || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field half">
                                <label>DUI</label>
                                <p>{{ newManager.dui || '---' }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="field-group">
                        <div class="field-row">
                            <div class="field">
                                <label>Teléfono</label>
                                <p>{{ newManager.phoneNumber || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Email</label>
                                <p>{{ newManager.email || '---' }}</p>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field">
                                <label>Dirección</label>
                                <p>{{ newManager.address || '---' }}</p>
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
    import { ManagerEditResponse, ManagerRequest } from '@/interfaces/managers/ManagerInterface';
    import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
    import ImageInputComponent from '@/components/inputs/ImageInputComponent.vue';
    import { ShowCreateAlert } from '@/components/alerts/createAlert';
    import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
    import BtnSaveComponent from '@/components/buttons/BtnSaveComponent.vue';
    import BtnCleanComponent from '@/components/buttons/BtnCleanComponent.vue';
    import type { useManagers } from '@/composables/useManagers';
    import Swal from 'sweetalert2';
    import DuiComponent from '@/components/inputs/DuiComponent.vue';

    const {
        createRecord,
        updateRecord
    } = inject("managerContext") as ReturnType<typeof useManagers>


    //PROPS Y EMMITS
    const props = defineProps<{
        modelValue: boolean,
        managerData?: ManagerEditResponse | null;
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
        (e: 'emitido', value: boolean): void
    }>()


    const getInitialManager = (): ManagerRequest => ({
        firstName: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
        address: '',
        birthDate: "",
        phoneNumber: '',
        email: '',
        gender: null as unknown as Gender,
        photo: null,
        dui: '',
    })

    const newManager = ref<ManagerRequest>(getInitialManager());
    const prefijo = import.meta.env.VITE_BASE_URL;


    const clean_form = () => {
        newManager.value = getInitialManager();
        photoPreview.value = ''
    }


    watch(
        () => props.modelValue,
        (isOpen) => {
            if (isOpen) {
                if (isOpen && props.managerData) {

                    const { id, routePhoto, ...cleanData } = props.managerData;

                    newManager.value = {
                        ...cleanData,
                        photo: null
                    } as unknown as ManagerRequest;

                    if (props.managerData.routePhoto) {
                        photoPreview.value = `${prefijo}${props.managerData.routePhoto}`;
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
        if (!newManager.value.birthDate) return 0
        const today = new Date()
        const birthDate = new Date(newManager.value.birthDate)
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
        newManager.value.photo = file;
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
            if (props.managerData?.id) {
                await updateRecord(props.managerData.id, newManager.value)
            } else {
                await createRecord(newManager.value)
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