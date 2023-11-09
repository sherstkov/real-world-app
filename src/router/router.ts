import { createRouter, createWebHistory } from 'vue-router';
import type { RouteParams, RouteRecordRaw } from 'vue-router';
import {
  HOME_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  REGISTER_ROUTE_NAME,
  PROFILE_ROUTE_NAME,
} from '../contsants/routes';

export type AppRouteNames =
  | typeof HOME_ROUTE_NAME
  | typeof LOGIN_ROUTE_NAME
  | typeof REGISTER_ROUTE_NAME
  | typeof PROFILE_ROUTE_NAME;

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'default-layout' */ '@/layouts/DefaultLayout.vue'),
    redirect: { name: HOME_ROUTE_NAME },
    children: [
      {
        path: '',
        name: HOME_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'home-page' */ '@/pages/HomePage.vue'),
      },
      {
        path: '/login',
        name: LOGIN_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'login-page' */ '@/pages/LoginPage.vue'),
      },
      {
        path: '/register',
        name: REGISTER_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'login-page' */ '@/pages/RegisterPage.vue'),
      },
      {
        path: '/profile/:username',
        name: PROFILE_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'login-page' */ '@/pages/ProfilePage.vue'),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
});

export function routerPush(
  name: AppRouteNames,
  params?: RouteParams,
): ReturnType<typeof router.push> {
  return params !== undefined
    ? router.push({
        name,
        params,
      })
    : router.push({ name });
}
