<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <HeaderDetailComponent :title="'Registration Students in Courses'" :context="course.name"></HeaderDetailComponent>

        <div class="info_preview">
            <button @click="returnPage()">Regresar</button>
            <article class="sct_detail">
                <h2>Total Students: {{ course.totalStudents }}</h2>
                <h2>year: {{ course.year }}</h2>
            </article>
        </div>

        <SlideRegistrationCourse :alumnos-pre-inscritos="alumnosPreInscritos" :fetch-students="fetchStudentsForSelect"
            @add-student="handleAddStudent" @remove-student="handleRemoveStudent"
            @generate-enrollment="sendData" @delete="handleDelete"></SlideRegistrationCourse>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';
    import HeaderDetailComponent from '@/components/templates/HeaderDetailComponent.vue';
    import { useRegistrationCourses } from '@/composables/useCourseRegistration';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { DegreeDetailSimpleResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
    import { CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
    import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';

    // IMPORTAMOS EL SERVICIO DE ESTUDIANTES AQUÍ EN EL PADRE
    import { useStudents } from '@/composables/useStudent';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
    import { ShowCreateAlert } from '@/components/alerts/createAlert';
    import { CourseFullResponse } from '@/interfaces/Course/CourseInterface';
    import { StatusEnum } from '@/enum/StatusEnum';
    import { PeriodSimpleResponse } from '@/interfaces/Period/periodInterface';
    import { useCourse } from '@/composables/useCourse';
    import { BatchRegistrationRequestDTO } from '@/interfaces/CourseRegistration/courseRegistrationInterface';
    import SlideRegistrationCourse from './components/slideRegistrationCourse.vue';

    const router = useRouter();
    const route = useRoute();
    const currentCourseId = ref<number | null>();
    const idFormUrl = route.query.courseId;

    const getInitialCourse = (): CourseFullResponse => ({
        id: null as unknown as number,
        name: '',
        code: '',
        teacher: null as unknown as TeacherSimpleResponse,
        gradeDetail: null as unknown as DegreeDetailSimpleResponse,
        subject: null as unknown as CatalogueSimpleResponse,
        period: null as unknown as PeriodSimpleResponse,
        totalStudents: 0,
        availableSlots: 0,
        status: StatusEnum.OPEN,
        year: 0,
        valorityUnity: 0,
    })

    const registrationState = useRegistrationCourses();
    const courseState = useCourse();

    // Instanciamos el servicio de estudiantes
    const { getSelects } = useStudents();
    const { getDetail } = courseState;

    provide("courseRegistrationContext", registrationState);
    const { loading, fetchByCourseId, createBatchRegistration, deleteSpecificRecord } = registrationState

    const course = ref<CourseFullResponse>(getInitialCourse());
    const alumnosPreInscritos = ref<StudentSimpleResponse[]>([]);

    // Función asíncrona que usará el Multiselect en el hijo
    const fetchStudentsForSelect = async (query: string) => {
        if (!query) return []; 
        try {
            const students = await getSelects({ search: query });
            return students.map(s => ({
                value: s.id,
                label: s.fullName,
                originalData: s
            }));
        } catch (e) {
            console.error("Error buscando alumnos", e);
            return [];
        }
    };

    const handleAddStudent = (student: StudentSimpleResponse) => {
        const exists = alumnosPreInscritos.value.some(s => s.id === student.id);
        if (!exists) {
            alumnosPreInscritos.value.push(student);
        }
    };

    const handleRemoveStudent = (studentId: number) => {
        alumnosPreInscritos.value = alumnosPreInscritos.value.filter(s => s.id !== studentId);
    };

    const sendData = async ()=>{
        const ok = await ShowCreateAlert(()=> handleGenerateRegistration());
        if(ok){
            console.log("Generando inscripciones...");  
        }
    }

    const handleGenerateRegistration = async () => {
        const ids_studenrs: number[] = alumnosPreInscritos.value.map(st => st.id)
        const payload: BatchRegistrationRequestDTO = {
            courseId: course.value.id,
            studentIds: ids_studenrs
        }
        try {
            await createBatchRegistration(payload);
            loadDetail();
            alumnosPreInscritos.value = []
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const handleDelete = async (id: number) => {
        try {
            if (currentCourseId.value) {
                ShowDeleteAlert(() => deleteSpecificRecord(id, currentCourseId.value as number));
                loadDetail();
            }
        } catch (error) {
            console.error("No se pudo eliminar el curso");
            console.error(error);
        }
    }

    function returnPage() {
        router.push({
            name: 'CourseMagnament', 
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
            currentCourseId.value = Number(idFormUrl);
            course.value = await getDetail(currentCourseId.value);
            await fetchByCourseId(currentCourseId.value);
        } else {
            console.warn("No se proporcionó ningún ID para las inscripciones.");
        }
    }
</script>
<style scoped>
.table__container {
    background: var(--color-third);
    display: flex;
    border-radius: 25px 5px 25px 5px;
}
.info_preview{
    font-family: var(--font-v2);
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
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 10px;
}

.sct_detail {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
}
</style>
