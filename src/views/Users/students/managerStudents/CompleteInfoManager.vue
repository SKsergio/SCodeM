<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <HeaderDetailComponent :title="'Encargado: ' + detailManager.fullName"></HeaderDetailComponent>

        <div class="info_preview">
            <div class="button_info">
                <button @click="returnPage()">Regresar</button>
            </div>

            <section class="manager_info previsualizar_big box_panel_xl">
                <div class="expediente-header">
                    <h1>DATOS DEL ENCARGADO</h1>
                </div>

                <div class="section_full_info">
                    <div class="img_preview xl_pw">
                        <img v-if="photoPreview" :src="photoPreview" alt="foto de perfil" class="photo-preview">
                        <div v-else class="photo-placeholder">No Photo</div>
                    </div>

                    <div class="expediente-content">
                        <div class="field-group">
                            <div class="field-row">
                                <div class="field">
                                    <label class="label_ct1">Nombre Completo</label>
                                    <p class="complemente_lbl">{{ detailManager.fullName || '---' }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="field-group">
                            <div class="field-row">
                                <div class="field half">
                                    <label class="label_ct1">Edad</label>
                                    <p class="complemente_lbl">{{ detailManager.age }} años</p>
                                </div>
                                <div class="field half">
                                    <label class="label_ct1">Fecha de Nacimiento</label>
                                    <p class="complemente_lbl">{{ detailManager.birthDate ? formatDate(detailManager.birthDate) : '---' }}</p>
                                </div>
                            </div>
                            <div class="field-row">
                                <div class="field half">
                                    <label class="label_ct1">DUI</label>
                                    <p class="complemente_lbl">{{ detailManager.dui || '---' }}</p>
                                </div>
                                <div class="field half">
                                    <label class="label_ct1">Género</label>
                                    <p class="complemente_lbl">{{ genderLabel }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="field-group">
                            <div class="field-row">
                                <div class="field">
                                    <label class="label_ct1">Teléfono</label>
                                    <p class="complemente_lbl">{{ detailManager.phoneNumber || '---' }}</p>
                                </div>
                            </div>
                            <div class="field-row">
                                <div class="field">
                                    <label class="label_ct1">Email</label>
                                    <p class="complemente_lbl">{{ detailManager.email || '---' }}</p>
                                </div>
                            </div>
                            <div class="field-row">
                                <div class="field">
                                    <label class="label_ct1">Dirección</label>
                                    <p class="complemente_lbl">{{ detailManager.address || '---' }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="field-group">
                            <div class="field-row">
                                <div class="field">
                                    <label class="label_ct1">Fecha de Registro</label>
                                    <p class="complemente_lbl">{{ detailManager.createdAt ? formatDate(detailManager.createdAt) : '---' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </div>

        <!-- manejo de los estudiantes asociados -->
        <slideManagerStudents
           @toggle-relation="handleToggleRelation"
           @delete="handleDelete"></slideManagerStudents>
    </div> 
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import HeaderDetailComponent from '@/components/templates/HeaderDetailComponent.vue';
import Load2Component from '@/components/loaders/Load2Component.vue';
import { useManagers } from '@/composables/useManagers.js';
import { useManagerStudents } from '@/composables/useManagerStudents.js';
import { ManagerFullResponse } from '@/interfaces/managers/ManagerInterface.js';
import { AssignedStudentResponse } from '@/interfaces/managers/ManagerInterface.js';
import slideManagerStudents from './components/slideManagerStudents.vue';

// IMPORTAMOS EL SERVICIO DE ESTUDIANTES AQUÍ EN EL PADRE
import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
import { ShowCreateAlert } from '@/components/alerts/createAlert';
import { Gender } from '@/enum/GenderEnum';
import { managerStudentResponseDTO } from '@/interfaces/ManagerStudents/ManagerStudentsInterface.js';
import { formatDate } from '@/utils/FormatDates';
import { ParentType } from '@/enum/ParentType';

const router = useRouter();
const route = useRoute();
const currentManagerId = ref<number | null>();
const idFormUrl = route.query.managerId;

const getFullManagerData = (): ManagerFullResponse => ({
    id: null as unknown as number,
    fullName: '',
    address: '',
    email: '',
    phoneNumber: '',
    dui: '',
    age: 0,
    routePhoto: '',
    birthDate: "",
    gender: null as unknown as Gender,
    // assignedStudents: [] as AssignedStudentResponse[],
    createdAt: '',
})

const managerState = useManagers();
const managerStudentState = useManagerStudents();

// Instanciamos el servicio de estudiantes
const { getDetail } = managerState;

provide("managerStudentsContext", managerStudentState);
const { loading, deleteRecord, updateRecord, fetchByManagerId } = managerStudentState

const detailManager = ref<ManagerFullResponse>(getFullManagerData());
const photoPreview = ref<string>('');
const prefijo = import.meta.env.VITE_BASE_URL;

const genderLabel = computed(() => {
    if (detailManager.value.gender === Gender.M) return 'Masculino';
    if (detailManager.value.gender === Gender.F) return 'Femenino';
    return '---';
});

const handleDelete = async (id: number) => {
    try {
        if (id) {
            const deleted = await ShowDeleteAlert(() => deleteRecord(id));
            if (deleted) {
                await getByManagerId(currentManagerId.value as number);
            }
        }
    } catch (error) {
        console.error("No se pudo eliminar el curso");
        console.error(error);
    } 
}

const handleToggleRelation = async (id: number, newRelationType: ParentType, newEmergencyContact: boolean) => {
    try {
        if (id) {
            await updateRecord(id, {
                relationType: newRelationType,
                emergencyContact: newEmergencyContact
            });
            await getByManagerId(currentManagerId.value as number);
        }
    } catch (error) {
        console.error("No se pudo editar el registro");
        console.error(error);
    }
}

const sendData = async () => {
    // const ok = await ShowCreateAlert(()=> handleGenerateEnrollment());
    // if(ok){
    //     console.log("Generando inscripciones...");  
    // }
    console.log("Generando asociaciones...");

}



function returnPage() {
    router.push({
        name: 'ManagerMagnament',
    });
}

onMounted(async () => {
    try {
        loadDetail();
    } catch (e) {
        console.error('Falló la carga inicial', e);
    }
})

const loadDetail = async () => {
    if (idFormUrl) {
        currentManagerId.value = Number(idFormUrl);
        detailManager.value = await getDetail(currentManagerId.value);
        photoPreview.value = detailManager.value.routePhoto
            ? `${prefijo}${detailManager.value.routePhoto}`
            : '';
        await getByManagerId(currentManagerId.value);
    } else {
        console.warn("No se proporcionó ningún ID de encargado.");
    }
}

const getByManagerId = async (managerId: number) => {
    try {
        await managerStudentState.fetchByManagerId(managerId);
    } catch (error) {
        console.error("Error al obtener los estudiantes asociados al encargado:", error);
    }
};
</script>

<style scoped>
.table__container {
    background: var(--color-third);
    display: flex;
    border-radius: 25px 5px 25px 5px;
}

.img_file {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}

.info_preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    font-family: var(--font-v2);
}

.button_info {
    width: 10%;
}

.manager_info {
    width: 90%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
}
.section_full_info{
    display: flex;
    flex-direction: row-reverse;
    gap: 44px;
    /* background: gray; */
    padding: 10px;
}

.sct_detail {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
}
.xl_pw{
        width: 500px;
    height: 400px;
}
.label_ct1{
    font-size: 17px;
}
.complemente_lbl{
    font-size: 16px;
    font-weight: 500;
}

</style>
