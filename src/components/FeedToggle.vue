<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-for="link in currentNavLinks" class="nav-item">
        <router-link class="nav-link" :to="{ name: link.name, params: link.params }">{{
          link.title()
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  HOME_ROUTE_NAME,
  TAG_ROUTE_NAME,
  PERSONAL_FEED_ROUTE_NAME,
  PROFILE_FAVORITES,
  PROFILE_ROUTE_NAME,
} from '@/contsants/routes';
import type { Routes } from '@/router/router';
import { useStore } from 'vuex';

type NavLink = {
  name: Routes;
  active: Boolean;
  title: String;
  params: Object;
};

const props = defineProps<{
  feeds: Array<Routes>;
  tag?: string | undefined;
}>();

const store = useStore();

const user = computed(() => store.getters);

const username = computed(() => user.value?.username);

const allNavLinks: NavLink[] = computed(() => [
  { name: HOME_ROUTE_NAME, title: () => 'Global feed', params: {} },
  {
    name: PERSONAL_FEED_ROUTE_NAME,
    title: () => 'Your feed',
  },
  { name: TAG_ROUTE_NAME, title: () => props.tag, params: { tag: props.tag } },
  { name: PROFILE_ROUTE_NAME, title: () => 'My articles', params: { username: username.value } },
  {
    name: PROFILE_FAVORITES,
    title: () => 'Favorited Articles',
    params: { username: username.value },
  },
]);

const currentNavLinks = computed(() =>
  allNavLinks.value.filter((link) => props.feeds.includes(link.name)),
);
</script>
