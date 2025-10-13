import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//importacion de vistas

//vistas del usuario normal
import DashboarLayaout from '@/views/Users/DashboarLayaout.vue'
import HomeView from '@/views/Users/general/HomeView.vue'
import DegreeView from '@/views/Users/degrees/DegreeView.vue'
import SectionView from '@/views/Users/degrees/SectionView.vue'
import ClassroomsView from '@/views/Users/degrees/ClassroomsView.vue'
import PeriodsView from '@/views/Users/evaluations/PeriodsView.vue'
import TypeEvaluationsView from '@/views/Users/evaluations/TypeEvaluationsView.vue'


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
        path: 'degree',
        name:'degrees',
        children: [
        { path: '', redirect: { name: 'DegreeMagnament' } }, //redirección al hijo por defecto
          { path: 'degrees', name: 'DegreeMagnament', component: DegreeView },
          { path: 'section', name: 'SectionMagnament', component: SectionView },
          { path: 'classroom', name: 'ClassroomsMagnament', component: ClassroomsView },
        ]
      },
      {
        path:'evaluation',
        name:'evaluations',
        children:[
          {path:'periods', name:'PeriodMagnament', component:PeriodsView},
          {path:'type_evaluations', name:'TypeEvaluatioMagnament', component:TypeEvaluationsView}
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
