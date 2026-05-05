<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :title="'Enrollment Students'" @open-modal="handleCreate"></HeaderComponent>

        <!-- contendedor -->
        <SlideEnrollmentDegree @edit="handleEdit" @delete="handleDelete" @toggle-status="handleStatus"></SlideEnrollmentDegree>

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
    import { useCourse } from '@/composables/useCourse';
    import { useStudents } from '@/composables/useStudent';
    import { useEnrollmentDegrees } from '@/composables/useEnrollmentDegree';
    import ModalCrearEditar from './components/modalCrearEditar.vue';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { CourseEditResponse, CourseSimpleResponse } from '@/interfaces/Course/CourseInterface';
    import { StudentSimpleResponse } from '@/interfaces/students/studentInterface';
    import SlideEnrollmentDegree from './components/slideEnrollmentDegree.vue';

    const isModalOpen = ref(false);
    const enrollmentState = useEnrollmentDegrees();
    const requestEnrollmentData = ref<CourseEditResponse>();

    //servicios para selects
    const studentService = useStudents();
    const courseService = useCourse();

    //selects
    const studentList = ref<StudentSimpleResponse[]>([]);
    const courseList = ref<CourseSimpleResponse[]>([]);


    provide("enrollmentContext", enrollmentState);
    const {loading, fetchAll, deleteRecord, getOntetoEdit} = enrollmentState

    const handleCreate = () => {
        requestEnrollmentData.value = undefined;
        isModalOpen.value = true;
    }


    onMounted(async () => {
        try {
            await fetchAll();
            const [students, courses] = await Promise.all([
                studentService.getSelects(),
                courseService.getSelects(),
            ])

            studentList.value = students;
            courseList.value = courses;
        } catch (e) {
            console.error('Falló la carga inicial', e);
            //argar un swal de error general
        }
    })
</script>

<style>
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

