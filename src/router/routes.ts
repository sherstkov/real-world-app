import { createRouter, createWebHistory } from "vue-router";
import {
  HOME_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  REGISTER_ROUTE_NAME,
} from "../contsants/routes";

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: 'default-layout' */ "@/layouts/DefaultLayout.vue"
      ),
    redirect: { name: HOME_ROUTE_NAME },
    children: [
      {
        path: "",
        name: HOME_ROUTE_NAME,
        component: () =>
          import(/* webpackChunkName: 'home-page' */ "@/pages/HomePage.vue"),
      },
      {
        path: "/login",
        name: LOGIN_ROUTE_NAME,
        component: () =>
          import(/* webpackChunkName: 'login-page' */ "@/pages/LoginPage.vue"),
      },
      {
        path: "/register",
        name: REGISTER_ROUTE_NAME,
        component: () =>
          import(
            /* webpackChunkName: 'login-page' */ "@/pages/RegisterPage.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
});

export default router;
