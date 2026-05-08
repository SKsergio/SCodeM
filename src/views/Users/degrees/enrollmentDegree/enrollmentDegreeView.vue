<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <HeaderDetailComponent :title="'Enrollment Students in Degrees'"></HeaderDetailComponent>

        <div class="info_preview">
            <button @click="returnPage()">Regresar</button>
            <article class="sct_detail">
                <h1>Total Students: {{ detailDegree.totalStudents }}</h1>
                <h1>year: {{ detailDegree.year }}</h1>
            </article>
        </div>

        <slideEnrollmentDegree :alumnos-pre-inscritos="alumnosPreInscritos" :fetch-students="fetchStudentsForSelect"
            @add-student="handleAddStudent" @remove-student="handleRemoveStudent"
            @generate-enrollment="handleGenerateEnrollment" @delete="handleDelete"></slideEnrollmentDegree>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';
    import HeaderDetailComponent from '@/components/templates/HeaderDetailComponent.vue';
    import { useEnrollmentDegrees } from '@/composables/useEnrollmentDegree';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { useDegreeDetail } from '@/composables/useDegreeDetail';
    import { DegreeDetailFullResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
    import { CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
    import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
    import slideEnrollmentDegree from './components/slideEnrollmentDegree.vue';

    // IMPORTAMOS EL SERVICIO DE ESTUDIANTES AQUÍ EN EL PADRE
    import { useStudents } from '@/composables/useStudent';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import { BatchEnrollmentRequestDTO } from '@/interfaces/EnrollmentDegree/EnrollmentDegreeInterface';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';

    const router = useRouter();
    const route = useRoute();
    const currentDetailId = ref<number | null>();
    const idFormUrl = route.query.detailId;

    const getInitialDegreeDetail = (): DegreeDetailFullResponse => ({
        id: null as unknown as number,
        ability: null as unknown as number,
        totalStudents: 0,
        availableSlots: 0,
        year: 0,
        section: null as unknown as CatalogueSimpleResponse,
        degree: null as unknown as CatalogueSimpleResponse,
        tutor: null as unknown as TeacherSimpleResponse
    })

    const enrollmentState = useEnrollmentDegrees();
    const degreeDetail = useDegreeDetail();

    // Instanciamos el servicio de estudiantes
    const { getSelects } = useStudents();
    const { getDetail } = degreeDetail;

    provide("enrollmentContext", enrollmentState);
    const { loading, fetcByGradeId, createBatchEnrolls, deleteSpecificRecord } = enrollmentState

    const detailDegree = ref<DegreeDetailFullResponse>(getInitialDegreeDetail());
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

    const handleGenerateEnrollment = async () => {
        const ids_studenrs: number[] = alumnosPreInscritos.value.map(st => st.id)
        const payload: BatchEnrollmentRequestDTO = {
            gradeDetailId: detailDegree.value.id,
            studentIds: ids_studenrs
        }
        try {
            await createBatchEnrolls(payload);
            loadDetail();
            alumnosPreInscritos.value = []
        } catch (error) {
            console.log(error);
        }
        console.log("Alumnos listos para inscribir:", alumnosPreInscritos.value);
    };

    const handleDelete = async (id: number) => {
        try {
            if (currentDetailId.value) {
                ShowDeleteAlert(() => deleteSpecificRecord(id, currentDetailId.value as number));
                loadDetail();
            }
        } catch (error) {
            console.error("No se pudo eliminar el curso");
            console.error(error);
        }
    }

    function returnPage() {
        router.push({
            name: 'DegreeDetailMagnament', 
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
            currentDetailId.value = Number(idFormUrl);
            detailDegree.value = await getDetail(currentDetailId.value);
            await fetcByGradeId(currentDetailId.value);
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
