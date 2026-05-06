<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderDetailComponent :title="'Enrollment Students in Degrees'"></HeaderDetailComponent>

        <div class="info_preview">
            <button>Regresar</button>
            <article class="sct_detail">
                <h1>Total Students: {{ detailDegree.totalStudents }}</h1>
                <h1>year: {{ detailDegree.year }}</h1>
            </article>
        </div>
        <!-- contendedor -->
        <slideEnrollmentDegree></slideEnrollmentDegree>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, provide } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStudents } from '@/composables/useStudent';
    import HeaderDetailComponent from '@/components/templates/HeaderDetailComponent.vue';
    import BtnCancelComponent from '@/components/buttons/BtnCancelComponent.vue';
    import { useEnrollmentDegrees } from '@/composables/useEnrollmentDegree';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import { useDegreeDetail } from '@/composables/useDegreeDetail';
    import { DegreeDetailFullResponse } from '@/interfaces/DegreeDetail/DegreeDetailInterface';
    import { CatalogueSimpleResponse } from '@/interfaces/Catalogues/CataloguesInterface';
    import { TeacherSimpleResponse } from '@/interfaces/Teacher/TeacherInterface';
    import slideEnrollmentDegree from './components/slideEnrollmentDegree.vue';

    //obtener el id
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

    //estados principales
    const enrollmentState = useEnrollmentDegrees();
    const degreeDetail = useDegreeDetail();

    //servicio para padre
    const { getDetail } = degreeDetail;

    //servicios para selects
    const studentService = useStudents();
    //selects
    const studentList = ref<StudentSimpleResponse[]>([]);


    provide("enrollmentContext", enrollmentState);
    const { loading, fetcByGradeId } = enrollmentState

    const detailDegree = ref<DegreeDetailFullResponse>(getInitialDegreeDetail());

    onMounted(async () => {
        const idFormUrl = route.query.detailId;

        try {
            if (idFormUrl) {
                currentDetailId.value = Number(idFormUrl);
                detailDegree.value = await getDetail(currentDetailId.value);
                await fetcByGradeId(currentDetailId.value);
                const [students] = await Promise.all([
                    studentService.getSelects(),
                ])
                studentList.value = students;
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
