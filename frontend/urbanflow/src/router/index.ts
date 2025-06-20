import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/login/LoginPage.vue'
import ControlHome from '@/views/control/ControlHome.vue'
import MapEdge from '@/views/Map/MapEdge.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
    redirect: '/control'
  },
  {
    path: '/control',
    name: 'ControlHome',
    component: ControlHome
  },
  {
  path: '/map',
  name: 'MapEdge',
  component: MapEdge
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
