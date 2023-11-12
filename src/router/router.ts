import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import store from '@/store';
import {
  HOME_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  REGISTER_ROUTE_NAME,
  PROFILE_ROUTE_NAME,
  PUBLISH_ARTICLE_ROUTE_NAME,
  SETTINGS_ROUTE_NAME,
  ARTICLE_ROUTE_NAME,
  EDIT_ARTICLE_ROUTE_NAME,
} from '../contsants/routes';

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
        beforeEnter: () => !isAuthenticated(),
      },
      {
        path: '/register',
        name: REGISTER_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'register-page' */ '@/pages/RegisterPage.vue'),
        beforeEnter: () => !isAuthenticated(),
      },
      {
        path: '/profile/:username',
        name: PROFILE_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'profile-page' */ '@/pages/ProfilePage.vue'),
      },
      {
        path: '/article/create',
        name: PUBLISH_ARTICLE_ROUTE_NAME,
        component: () =>
          import(/* webpackChunkName: 'publish-article-page' */ '@/pages/PublishArticlePage.vue'),
      },
      {
        path: '/article/:slug/edit',
        name: EDIT_ARTICLE_ROUTE_NAME,
        component: () =>
          import(/* webpackChunkName: 'edit-article-page' */ '@/pages/PublishArticlePage.vue'),
      },
      {
        path: '/article/:slug',
        name: ARTICLE_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'article-page' */ '@/pages/ArticlePage.vue'),
      },
      {
        path: '/settings',
        name: SETTINGS_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'settings-page' */ '@/pages/SettingsPage.vue'),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
});

const isAuthenticated = () => {
  return store.getters.isAuthenticated;
};
