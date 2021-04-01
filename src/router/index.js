import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import { VueCookieNext } from 'vue-cookie-next'

const routes = [
  {
    path: '/',
    name: 'Admin',
    component: () => import('../Admin.vue'),
    meta: {
      requireAuth: false
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/logs/list',
        name: 'Logs',
        component: () => import('../views/Logs.vue')
      },
      {
        path: '/logs/search',
        name: 'Search',
        component: () => import('../views/NewestLogs.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../Login.vue')
  }
]

var router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authObj = getAuth()
  const now = Math.round((new Date()).getTime() / 1000)

  if (to.matched.some(r => r.meta.requireAuth)) {
    if (authObj == null || parseInt(authObj.expired_at) < now) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

function getAuth () {
  const auth = VueCookieNext.getCookie('__syslog')
  const authObj = JSON.parse(auth)
  return authObj
}

export default router
