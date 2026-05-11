<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
<HeaderComponent
    :show-add="canEdit"
    :title="'Cursos'"
    @open-modal="handleCreate()">
</HeaderComponent>


        <!-- contendedor -->
        <slideCourse
            :can-edit="canEdit"
            @edit="handleEdit"
            @delete="handleDelete"
            @toggle-status="handleStatus">
        </slideCourse>

        <!-- modal de editar y crear -->
        <ModalCrearEditar
            v-model="isModalOpen" 
            @emitido="fetchAll()" 
            :course="requestCourseData"
            :degree-detail="degreeSpecificList"
            :periods="periodsList"
            :teachers="teacherList"
            :subjects="subjectList">
        </ModalCrearEditar>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useAuth } from '@/composables/useAuth';
    import { useCourse } from '@/composables/useCourse';
    import { useCatalogue } from '@/composables/useCatalogue';
    import { useTeachers } from '@/composables/useTeachers';
    import { useDegreeDetail } from '@/composables/useDegreeDetail';
    import ModalCrearEditar from './components/modalCrearEditar.vue';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import slideCourse from './components/slideCourse.vue';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
    import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
    import { PeriodSimpleResponse } from '@/interfaces/Period/periodInterface';
    import { CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
    import { CourseEditResponse } from '@/interfaces/Course/CourseInterface';
    import { usePeriod } from '@/composables/usePeriod';
    import { DegreeDetailSimpleResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
    import { StatusEnum } from '@/enum/StatusEnum';
    import { statusRequest } from '@/interfaces/StatusRequest';
    import { CloseRecordAlert } from '@/components/alerts/CloseRecord';
    import { OpenRecordAlert } from '@/components/alerts/OpenRecord';

    const isModalOpen = ref(false);
    const { getCurrentUser } = useAuth();

    const currentUser = getCurrentUser();

    const canEdit =
        currentUser?.role === 'ADMIN' ||
        currentUser?.role === 'TEACHER';
    const courseState = useCourse();
    const requestCourseData = ref<CourseEditResponse>();

    //servicios para selects
    const degreeSpecificService = useDegreeDetail();
    const periodService = usePeriod();
    const tutorsService = useTeachers();
    const subjectsService = useCatalogue<CatalogueSimpleResponse>("subjects");

    //selects
    const degreeSpecificList = ref<DegreeDetailSimpleResponse[]>([]);
    const periodsList = ref<PeriodSimpleResponse[]>([]);
    const teacherList = ref<TeacherSimpleResponse[]>([]);
    const subjectList = ref<CatalogueSimpleResponse[]>([]);


    provide("courseContext", courseState);
    const {loading, fetchAll, deleteRecord, getOntetoEdit, changeStatus} = courseState

    const handleCreate = () => {
        requestCourseData.value = undefined;

        // 2. Ahora sí, abrimos el modal
        isModalOpen.value = true;
    }


    //manejar edicion
    const handleEdit = async(id:number)=> {
        try {
            const data = await getOntetoEdit(id);
            requestCourseData.value = data;
            
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
            console.error("No se pudo eliminar el curso");
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
            CloseRecordAlert(()=>changeStatus(id, newStatus), "Cursos", "esta accion afectara las evaluaciones asociadas")
        }else if(oldStatus == StatusEnum.CLOSED){
            const newStatus = statusIntitial()
            newStatus.newStatus = StatusEnum.OPEN
            OpenRecordAlert(()=>changeStatus(id, newStatus), "Cursos", "esta accion afectara los evaluaciones asociadas")
        }
    }

    onMounted(async () => {
        try {
            await fetchAll();
            const [degreeSpecific, periods, teachers, subjects] = await Promise.all([
                degreeSpecificService.getSelects(),
                periodService.getSelects(),
                tutorsService.getSelects(),
                subjectsService.getSelects(),
            ])

            degreeSpecificList.value = degreeSpecific;
            periodsList.value = periods;
            teacherList.value = teachers;
            subjectList.value = subjects;

        } catch (e) {
            console.error('Falló la carga inicial', e);
            //argar un swal de error general
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

