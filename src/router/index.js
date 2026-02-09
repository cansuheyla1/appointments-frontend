import { createRouter, createWebHistory } from 'vue-router'
import BookAppointment from '../views/BookAppointment.vue'
import MyAppointments from '../views/MyAppointments.vue'

const routes = [
  {
    path: '/',
    name: 'BookAppointment',
    component: BookAppointment
  },
  {
    path: '/my-appointments',
    name: 'MyAppointments',
    component: MyAppointments
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
