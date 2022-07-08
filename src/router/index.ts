import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/hello-cesium',
  },
  {
    name: 'HelloCesium',
    path: '/hello-cesium',
    component: () => import('@/pages/HelloCesium.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
