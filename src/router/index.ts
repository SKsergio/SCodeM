import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Importación de vistas del usuario normal
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
import RegistrationCourseView from '@/views/Users/courses/courseRegistration/registrationCourseView.vue'

// Importación de la vista de Login
import LoginView from '@/views/Auth/LoginView.vue'
import ManagerView from '@/views/Users/students/managers/ManagerView.vue'
import CompleteInfoManager from '@/views/Users/students/managerStudents/CompleteInfoManager.vue'

const routes: Array<RouteRecordRaw> = [
    // 1. RUTA DE LOGIN (Independiente, no usa el DashboardLayout)
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { requiresGuest: true } // Marca para indicar que solo invitados (sin login) pueden verla
    },
    {
        path: '/change-password',
        name: 'ChangePassword',
        component: () => import('@/views/Auth/ChangePasswordView.vue'),
        meta: { requiresAuth: true }
    },
    // 2. RUTAS PROTEGIDAS (Usan el DashboardLayout)
    {
        path: '/dashboard',
        component: DashboarLayaout,
        meta: { requiresAuth: true }, // ESTO ES CLAVE: Protege el dashboard y todos sus hijos
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
                    { path: 'students', name: 'StudentMagnament', component: StudentView },
                    { path: 'managers', name: 'ManagerMagnament', component: ManagerView },
                    { path: 'managerFull', name: 'ManagerFullMagnament', component: CompleteInfoManager }
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
                    { path: 'registrationCourses', name: 'RegistrationCoursesMagnament', component: RegistrationCourseView },
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
    },
    // Ruta comodín para atrapar errores 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboard/home'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// ==========================================
// EL POLICÍA DE LAS RUTAS (Route Guard)
// ==========================================
router.beforeEach((to, from, next) => {
    // Busca si hay un token guardado
    const isAuthenticated = !!localStorage.getItem('auth_token');

    // Si la ruta requiere estar logueado y NO hay token...
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Lo pateamos de vuelta al login
        next({ name: 'Login' });
    }
    // Si la ruta es solo para invitados (como el login) y SÍ hay token...
    else if (to.meta.requiresGuest && isAuthenticated) {
        // Lo mandamos directo al dashboard porque ya inició sesión
        next({ name: 'HomeView' });
    }
    // En cualquier otro caso, lo dejamos pasar normalmente
    else {
        next();
    }
});

export default router