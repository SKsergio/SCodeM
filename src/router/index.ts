import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//importacion de vistas

//vistas del usuario normal
import DashboarLayaout from '@/views/Users/DashboarLayaout.vue'
import HomeView from '@/views/Users/general/HomeView.vue'
import DegreeView from '@/views/Users/degrees/degree/DegreeView.vue'
import SectionView from '@/views/Users/degrees/section/SectionView.vue'
import ClassroomsView from '@/views/Users/degrees/classroom/ClassroomsView.vue'
import SujectView from '@/views/Users/degrees/subject/SubjectView.vue'
import FileTypeView from '@/views/Users/administration/fileType/FileTypeView.vue'
import TeacherView from '@/views/Users/administration/teachers/TeacherView.vue'
import SpecificDegreeView from '@/views/Users/degrees/specificDegrees/specificDegreeView.vue'
import PeriodView from '@/views/Users/courses/periods/PeriodView.vue'
import CourseView from '@/views/Users/courses/courses/courseView.vue'
import EvaluationView from '@/views/Users/evaluations/evaluations/evaluationView.vue'
import StudentView from '@/views/Users/students/students/studentView.vue'
import EnrollmentDegreeView from '@/views/Users/degrees/enrollmentDegree/enrollmentDegreeView.vue'

const routes: Array<RouteRecordRaw> = [
    // {
    //   path: '/auth',
    //   component:AuthLayaout,
    //   children:{
    //     //hijos del componetnte, cosas como los login o registros
    //   }
    // }
    {
        path: '/dashboard',
        component: DashboarLayaout,
        children: [
            {
                path: 'home',
                name: 'HomeView',
                component: HomeView,
            },
            {
                path: 'administration',
                name: 'administration',
                children: [
                    { path: 'type_file', name: 'TypeFileMagnament', component: FileTypeView },
                    { path: 'teachers', name: 'TeacherMagnament', component: TeacherView },
                ]
            },
            {
                path: 'students',
                name: 'students',
                children: [
                    // { path: 'managers', name: 'ManagerStudentMagnament', component: ManagerStudentsGridView },
                    { path: 'students', name: 'StudentMagnament', component: StudentView },
                    
                ]
            },
            {
                path: 'degree',
                name: 'degrees',
                children: [
                    { path: '', redirect: { name: 'DegreeMagnament' } }, 
                    { path: 'degrees', name: 'DegreeMagnament', component: DegreeView },
                    { path: 'section', name: 'SectionMagnament', component: SectionView },
                    { path: 'enrollment', name: 'EnrollmentDegreeMagnament', component: EnrollmentDegreeView },
                    { path: 'degreeDetail', name: 'DegreeDetailMagnament', component: SpecificDegreeView },
                    { path: 'classroom', name: 'ClassroomsMagnament', component: ClassroomsView },
                    { path: 'subject', name: 'SubjectMagnament', component: SujectView }
                ]
            },
            {
                path: 'courses',
                name: 'courses',
                children: [
                    { path: 'periods', name: 'PeriodMagnament', component: PeriodView },
                    { path: 'courses', name: 'CourseMagnament', component: CourseView }
                ]
            },
            {
                path: 'evaluations',
                name: 'evaluations',
                children: [
                    { path: 'evaluations', name: 'EvaluationMagnament', component: EvaluationView },
                ]
            }
        ],
    },
    // Redirección al home
    {
        path: '/',
        redirect: '/dashboard/home'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
