import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//importacion de vistas

//vistas del usuario normal
import DashboarLayaout from '@/views/Users/DashboarLayaout.vue'
import HomeView from '@/views/Users/general/HomeView.vue'
import DegreeView from  '@/views/Users/degrees/degree/DegreeView.vue'
import SectionView from '@/views/Users/degrees/section/SectionView.vue'
import ClassroomsView from '@/views/Users/degrees/classroom/ClassroomsView.vue'
import TypeEvaluationsView from '@/views/Users/evaluations/TypeEvaluationsView.vue'
import SujectView from '@/views/Users/degrees/subject/SubjectView.vue'
import FileTypeView from '@/views/Users/administration/fileType/FileTypeView.vue'
import TeacherView from '@/views/Users/administration/teachers/TeacherView.vue'
import ManagerStudentsGridView from '@/views/Users/students/ManagerStudents/ManagerStudentsGridView.vue'
import SpecificDegreeView from '@/views/Users/degrees/specificDegrees/specificDegreeView.vue'

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
                    { path: 'managers', name: 'ManagerStudentMagnament', component: ManagerStudentsGridView },
                ]
            },
            {
                path: 'degree',
                name: 'degrees',
                children: [
                    { path: '', redirect: { name: 'DegreeMagnament' } }, //redirección al hijo por defecto
                    { path: 'degrees', name: 'DegreeMagnament', component: DegreeView },
                    { path: 'section', name: 'SectionMagnament', component: SectionView },
                    { path: 'degreeDetail', name: 'DegreeDetailMagnament', component: SpecificDegreeView },
                    { path: 'classroom', name: 'ClassroomsMagnament', component: ClassroomsView },
                    { path: 'subject', name: 'SubjectMagnament', component: SujectView }
                ]
            },
            {
                path: 'evaluation',
                name: 'evaluations',
                children: [
                    // {path:'periods', name:'PeriodMagnament', component:PeriodsView},
                    { path: 'type_evaluations', name: 'TypeEvaluatioMagnament', component: TypeEvaluationsView }
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
