import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import Login from '../views/Login.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  { path: '/', redirect: '/weft/people' },
  { path: '/weft', redirect: '/weft/people' },
  { path: '/weft/people', name: 'People', component: () => import('../views/operations/People.vue'), meta: { requiresAuth: true, roles: ['admin', 'super_admin'] } },
  { path: '/weft/people/:id', name: 'Employee', component: () => import('../views/operations/EmployeeProfile.vue'), meta: { requiresAuth: true, roles: ['admin', 'super_admin'] } },
  { path: '/weft/attendance', name: 'Attendance', component: () => import('../views/operations/Attendance.vue'), meta: { requiresAuth: true, roles: ['admin', 'super_admin'] } },
  { path: '/weft/leave', name: 'Leave', component: () => import('../views/weft/Leave.vue'), meta: { requiresAuth: true, roles: ['admin', 'super_admin'] } },
  { path: '/weft/payroll', name: 'Payroll', component: () => import('../views/weft/Payroll.vue'), meta: { requiresAuth: true, roles: ['admin', 'super_admin'] } },
  { path: '/weft/me', name: 'MyRecord', component: () => import('../views/weft/MyRecord.vue'), meta: { requiresAuth: true } },
  { path: '/weft/settings', name: 'Settings', component: () => import('../views/weft/Settings.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()

  if (to.meta.guest) {
    return auth.isAuthenticated ? next('/weft/people') : next()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ path: '/login', query: { return_to: to.fullPath } })
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.role)) {
    return next('/weft/me')
  }

  return next()
})

export default router
