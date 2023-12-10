<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div v-if="!profile" class="align-left">Profile is loading...</div>
            <template v-else>
              <img :src="profile.image" class="user-img" :alt="profile.username" />

              <h4>{{ profile.username }}</h4>

              <p v-if="profile.bio">
                {{ profile.bio }}
              </p>

              <router-link
                v-if="showEdit"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: SETTINGS_ROUTE_NAME }"
                aria-label="Edit profile settings"
              >
                <i class="ion-gear-a space" />
                Edit profile settings
              </router-link>

              <button
                v-if="showFollow"
                class="btn btn-sm btn-outline-secondary action-btn"
                :disabled="followProcessGoing"
                @click="toggleFollow"
              >
                <i class="ion-plus-round space" />
                {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <Suspense>
            <ArticlesList :feeds="feeds" />
            <template #fallback> Articles are loading... </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ArticlesList from '@/components/ArticlesList.vue';
import { useFollow } from '@/composable/useFollowProfile';
import { useProfile } from '@/composable/useProfile';
import type { Profile } from '@/services/api';
import { Routes } from '@/router/router';
import { PROFILE_ROUTE_NAME, PROFILE_FAVORITES, SETTINGS_ROUTE_NAME } from '@/contsants/routes';

const route = useRoute();
const store = useStore();

const user = computed(() => store.getters);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const username = computed<string>(() => route.params.username as string);

const { profile, updateProfile } = useProfile({ username });

const { followProcessGoing, toggleFollow } = useFollow({
  following: computed<boolean>(() => profile.value?.following ?? false),
  username,
  onUpdate: (newProfileData: Profile) => updateProfile(newProfileData),
});

const showEdit = computed<boolean>(
  () => isAuthenticated && user.value?.username === username.value,
);
const showFollow = computed<boolean>(() => user.value?.username !== username.value);

let feeds = [PROFILE_ROUTE_NAME, PROFILE_FAVORITES] as Routes[];
</script>
