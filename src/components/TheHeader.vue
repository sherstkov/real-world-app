<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li v-for="{ name, title, icon, display, to } in links" class="nav-item" :key="name">
          <router-link v-if="display === authStatus || display === 'all'" class="nav-link" :to="to"
            ><i v-if="icon" :class="icon" /> {{ title }}</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {
  HOME_ROUTE_NAME,
  PUBLISH_ARTICLE_ROUTE_NAME,
  SETTINGS_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  PROFILE_ROUTE_NAME,
  REGISTER_ROUTE_NAME,
} from '@/contsants/routes';
import { User } from '@/services/api';
export default {
  name: 'TheHeader',
  computed: {
    user(): User {
      return this.$store.getters?.user;
    },
    username() {
      return this.user?.username;
    },
    authStatus() {
      return this.user ? 'authorized' : 'anonymous';
    },
    links() {
      return [
        {
          title: 'Home',
          display: 'all',
          to: { name: HOME_ROUTE_NAME },
        },
        {
          title: 'Sign in',
          display: 'anonymous',
          to: { name: LOGIN_ROUTE_NAME },
        },
        {
          title: 'Sign up',
          display: 'anonymous',
          to: { name: REGISTER_ROUTE_NAME },
        },
        {
          title: 'New Post',
          display: 'authorized',
          icon: 'ion-compose',
          to: { name: PUBLISH_ARTICLE_ROUTE_NAME },
        },
        {
          title: 'Settings',
          display: 'authorized',
          icon: 'ion-gear-a',
          to: { name: SETTINGS_ROUTE_NAME },
        },
        {
          title: this.username || 'Profile',
          display: 'authorized',
          to: { name: PROFILE_ROUTE_NAME, params: { username: this.username } },
        },
      ];
    },
  },
};
</script>
