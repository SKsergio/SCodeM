import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//importacion de vistas

//vistas del usuario normal
import DashboarLayaout from '@/views/Users/DashboarLayaout.vue'
import HomeView from '@/views/Users/general/HomeView.vue'
import DegreeView from '@/views/Users/degrees/DegreeView.vue'
import SectionView from '@/views/Users/degrees/SectionView.vue'
import ClassroomsView from '@/views/Users/degrees/ClassroomsView.vue'


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
        component: DegreeView,
        children: [
          { path: 'degrees', name: 'degrees', component: DegreeView },
          { path: 'section', name: 'sections', component: SectionView },
          { path: 'classroom', name: 'classrooms', component: ClassroomsView },
        ]
      },
    ],
  },
  // Redirección opcional
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
