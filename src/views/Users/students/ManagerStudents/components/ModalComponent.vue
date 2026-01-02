<template>
    <BaseModalComponent v-model="show" title="Registrar Nuevo Encargado"
        :custom-class="'modal-width-pt theme-transparent'">
        <XCircleIcon class="icon_close" @click="closeModal" />
        <div class="manager_container">

            <section class="names">
                <div class="input__ct">
                    <label for="first_name">First Name</label>
                    <input type="text" name="first_name" id="first_name" v-model="newManager.first_name">
                </div>

                <div class="input__ct">
                    <label for="seccond_name">Seccond Name</label>
                    <input type="text" name="seccond_name" id="seccond_name" v-model="newManager.seccond_name">
                </div>

                <div class="input__ct">
                    <label for="first_last_name">First Last Name</label>
                    <input type="text" name="first_last_name" id="first_last_name" v-model="newManager.first_last_name">
                </div>

                <div class="input__ct">
                    <label for="second_last_name">Seccond Last Name</label>
                    <input type="text" name="second_last_name" id="second_last_name"
                        v-model="newManager.second_last_name">
                </div>

                <div class="input__ct">
                    <label for="married_surname">Married Surname</label>
                    <input type="text" name="married_surname" id="married_surname" v-model="newManager.married_surname">
                </div>
            </section>

            <section class="documents">
                <div class="input__ct">
                    <label for="DUI">DUI</label>
                    <input type="text" name="DUI" id="DUI" v-model="newManager.DUI">
                </div>

                <div class="input__ct">
                    <label for="passport">Passport</label>
                    <input type="text" name="passport" id="passport" v-model="newManager.passport">
                </div>
            </section>


            <section class="other_data">
                <div class="input__ct">
                    <label for="direction">Birthdate</label>
                    <input type="date" name="birthdate" id="birthdate" v-model="newManager.birthdate">
                </div>

                <div class="input__ct">
                    <label for="direction">Age</label>
                    <input type="number" name="age" id="age" v-model="newManager.age">
                </div>

                <div class="input__ct">
                    <label for="direction">Address</label>
                    <textarea name="direction" id="direction" v-model="newManager.direction"></textarea>
                </div>

                <div class="input__ct">
                    <label for="nationality">Nationality</label>
                    <input type="text" name="nationality" id="nationality" v-model="newManager.nationality">
                </div>

                <div class="input__ct">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="newManager.email">
                </div>
            </section>

            <section class="img_data">
                <label>Photo</label>
                <ImageInputComponent @image="handleImageFromChild"></ImageInputComponent>
            </section>

            <section class="btn_section">
                <button @click="saveData">Guardar</button>
                <button>Limpiar</button>
                <button>Cancelar</button>

            </section>

        </div>
    </BaseModalComponent>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { XCircleIcon } from '@heroicons/vue/24/solid';
    import { StudentManagerPayload } from '@/interfaces/students/StudentManagers';
    import BaseModalComponent from '@/components/modals/BaseModalComponent.vue';
    import ImageInputComponent from '@/components/inputs/ImageInputComponent.vue';
    import { CreateManager } from '@/services/Students/StudentManagerService';

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
        birthdate: new Date(),
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

    const saveData = async()=>{
        console.log(newManager.value);
        await CreateManager(newManager.value)
    }
</script>

<style>
.modal-width-pt {
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
}

.theme-transparent {
    background-color: var(--color-eight);
    box-shadow: none !important;
    padding: 0 !important;
    border: none !important;
}

.manager_container{
    display: grid;
    padding: 20px;
    gap: 15px;
    color: var(--color-lines);
    font-family: var(--font-v1);
    justify-items: stretch;
    align-items: start;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    background-color: var(--color-sixth);
}

/* hijos */
.names{
    grid-column: 1/ 4 ;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
}
.img_data{
    grid-row: 1/1;
    grid-column: 4/6;
}
.btn_section{
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: auto;
    margin-left: auto;
    grid-row: 2/3;
    grid-column: 5/6;
}
.other_data{
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    grid-row: 2/3;
    grid-column: -6/-4;
}
.documents{
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
    gap: 10px;
    padding: 10px;
}
.input__ct{
    display: flex;
    gap: 8px;
}
.input__ct input {
    max-width: 190px;
    height: 40px;
    padding: 0.875rem;
    font-size: 1rem;
    border: 1.5px solid #000;
    border-radius: 0.5rem;
    box-shadow: 2.5px 3px 0 #000;
    outline: none;
    transition: ease 0.25s;
}

.input__ct input:focus {
    box-shadow: 5.5px 7px 0 black;
}
</style>