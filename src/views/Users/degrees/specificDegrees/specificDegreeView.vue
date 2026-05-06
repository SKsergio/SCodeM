<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Specific Degrees'" @open-modal="handleCreate"></HeaderComponent>

        <!-- contendedor -->
        <slideSpecificDegree @edit="handleEdit" @delete="handleDelete" @toggle-status="handleStatus"></slideSpecificDegree>

        <!-- modal de editar y crear -->
        <ModalCrearEditar
            v-model="isModalOpen" 
            @emitido="fetchAll()" 
            :degree-detail="requestDegreeDetailData"
            :degrees="degreesList"
            :sections="sectionsList"
            :tutors="tutorsList">
        </ModalCrearEditar>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useCatalogue } from '@/composables/useCatalogue';
    import ModalCrearEditar from './components/modalCrearEditar.vue';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import slideSpecificDegree from './components/slideSpecificDegree.vue';
    import { useDegreeDetail } from '@/composables/useDegreeDetail';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
    import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
    import { CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
    import { useTeachers } from '@/composables/useTeachers';
    import { DegreeDetailEditResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
    import { StatusEnum } from '@/enum/StatusEnum';
    import { statusRequest } from '@/interfaces/StatusRequest';
    import { CloseRecordAlert } from '@/components/alerts/CloseRecord';
import { OpenRecordAlert } from '@/components/alerts/OpenRecord';

    const isModalOpen = ref(false);
    const degreeDetailState = useDegreeDetail();
    const requestDegreeDetailData = ref<DegreeDetailEditResponse>();

    const degreeService = useCatalogue<CatalogueSimpleResponse>("degrees")
    const sectionsService = useCatalogue<CatalogueSimpleResponse>("sections")
    const tutorsService = useTeachers()

    //selects
    const degreesList = ref<CatalogueSimpleResponse[]>([]);
    const sectionsList = ref<CatalogueSimpleResponse[]>([]);
    const tutorsList = ref<TeacherSimpleResponse[]>([]);

    provide("degreDetailContext", degreeDetailState);
    const {loading, fetchAll, deleteRecord, getOntetoEdit, changeStatus} = degreeDetailState

    const handleCreate = () => {
        requestDegreeDetailData.value = undefined;

        isModalOpen.value = true;
    }

    //manejar edicion
    const handleEdit = async(id:number)=> {
        try {
            const data = await getOntetoEdit(id);
            requestDegreeDetailData.value = data;
            
            isModalOpen.value = true;
        } catch (error) {
            console.error("No se pudo cargar la información para editar");
            console.error(error);
        }
    }

    //manjear eliminacion
    const handleDelete = async(id:number) =>{
        try {
            ShowDeleteAlert(()=>deleteRecord(id));
        } catch (error) {
            console.error("No se pudo eliminar el grado");
            console.error(error);
        }
    }

    //manjear abriri y cerrar periodos
    const handleStatus = async (id: number, oldStatus: StatusEnum) => {
        const statusIntitial =():statusRequest =>({
            newStatus: null as unknown as StatusEnum
        });

        if (oldStatus == StatusEnum.OPEN) {
            const newStatus = statusIntitial()
            newStatus.newStatus = StatusEnum.CLOSED
            CloseRecordAlert(()=>changeStatus(id, newStatus), "Periodo", "esta accion afectara los cursos asociados")
        }else if(oldStatus == StatusEnum.CLOSED){
            const newStatus = statusIntitial()
            newStatus.newStatus = StatusEnum.OPEN
            OpenRecordAlert(()=>changeStatus(id, newStatus), "Periodo", "esta accion afectara los cursos asociados")
        }
    }


    onMounted(async () => {
        try {
            await fetchAll();
            const [degrees, sections, tutors] = await Promise.all([
                degreeService.getSelects(),
                sectionsService.getSelects(),
                tutorsService.getSelects(),
            ])

            degreesList.value = degrees;
            sectionsList.value = sections;
            tutorsList.value = tutors;

        } catch (e) {
            console.error('Falló la carga inicial', e);
        }
    })
</script>

<style scoped>
.table__container {
    background: var(--color-third);
    display: flex;
    padding: 40px;
    border-radius: 25px 5px 25px 5px;
}

.img_file {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}
</style>

