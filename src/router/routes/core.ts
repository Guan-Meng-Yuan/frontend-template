import type { RouteRecordRaw } from 'vue-router'

const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/pages/_core/fallback/not-found.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
}
const coreRoutes: RouteRecordRaw[] = [

]
