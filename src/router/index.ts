

import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  },

  {
    path: '/hardware',
    name: 'hardware',
    component: () => import('@/views/hardware/index.vue'),
    meta: {
      title: '硬件查看',
      keepAlive: false
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: '性能测试',
      keepAlive: false
    }
  },
]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// })
const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router;