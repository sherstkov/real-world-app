<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
      </ul>
    </div>
    {{ console.log(this.user) }}
  </nav>
</template>

<script lang="ts">
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME, REGISTER_ROUTE_NAME } from '@/contsants/routes';
import { User } from '@/services/api';
export default {
  name: 'TheHeader',
  computed: {
    user(): User {
      return this.$store.getters.user;
    },
    username() {
      return 'da';
    },
    links() {
      return [
        {
          name: HOME_ROUTE_NAME,
          title: 'Home',
          display: 'all',
        },
        {
          name: LOGIN_ROUTE_NAME,
          title: 'Sign in',
          display: 'anonymous',
        },
        {
          name: REGISTER_ROUTE_NAME,
          title: 'Sign up',
          display: 'anonymous',
        },
        {
          name: 'settings',
          title: 'Settings',
          display: 'authorized',
          icon: 'ion-gear-a',
        },
        {
          name: 'profile',
          title: this.username || 'Profile',
          params: { username: this.username },
          display: 'authorized',
        },
      ];
    },
    navLinks() {},
  },
};
</script>
