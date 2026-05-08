<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <HeaderDetailComponent :title="'Enrollment Students in Degrees'"></HeaderDetailComponent>

        <div class="info_preview">
            <button>Regresar</button>
            <article class="sct_detail">
                <h1>Total Students: {{ detailDegree.totalStudents }}</h1>
                <h1>year: {{ detailDegree.year }}</h1>
            </article>
        </div>
        
        <slideEnrollmentDegree
            :alumnos-pre-inscritos="alumnosPreInscritos"
            :fetch-students="fetchStudentsForSelect"
            @add-student="handleAddStudent"
            @remove-student="handleRemoveStudent"
            @generate-enrollment="handleGenerateEnrollment"
        ></slideEnrollmentDegree>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useRoute } from 'vue-router';
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

    const route = useRoute();
    const currentDetailId = ref<number | null>();

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
    const { loading, fetcByGradeId } = enrollmentState

    const detailDegree = ref<DegreeDetailFullResponse>(getInitialDegreeDetail());

    // --- NUEVO ESTADO PARA PRE-INSCRIPCIÓN ---
    const alumnosPreInscritos = ref<StudentSimpleResponse[]>([]);

    // Función asíncrona que usará el Multiselect en el hijo
    const fetchStudentsForSelect = async (query: string) => {
        if (!query) return []; // Si no hay texto, no buscamos
        try {
            const students = await getSelects({ search: query });
            // Multiselect necesita un formato específico: value y label
            // Pasamos el objeto original para poder recuperarlo luego
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

    // Funciones para manejar la lista
    const handleAddStudent = (student: StudentSimpleResponse) => {
        const exists = alumnosPreInscritos.value.some(s => s.id === student.id);
        if (!exists) {
            alumnosPreInscritos.value.push(student);
        }
    };

    const handleRemoveStudent = (studentId: number) => {
        alumnosPreInscritos.value = alumnosPreInscritos.value.filter(s => s.id !== studentId);
    };

    const handleGenerateEnrollment = () => {
        console.log("Alumnos listos para inscribir:", alumnosPreInscritos.value);
    };

    onMounted(async () => {
        const idFormUrl = route.query.detailId;
        try {
            if (idFormUrl) {
                currentDetailId.value = Number(idFormUrl);
                detailDegree.value = await getDetail(currentDetailId.value);
                await fetcByGradeId(currentDetailId.value);
            } else {
                console.warn("No se proporcionó ningún ID para las inscripciones.");
            }
        } catch (e) {
            console.error('Falló la carga inicial', e);
        }
    })
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
.info_preview{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 10px;
}
.sct_detail{
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
}
</style>
