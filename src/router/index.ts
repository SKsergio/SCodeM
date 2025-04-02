import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//importacion de vistas
import HomeView from '@/views/general/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'HomeView',
    component: HomeView,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
