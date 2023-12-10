<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isButtonDisabled"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button @click="onLogout" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import { UpdateUser } from '@/services/api';
import { LOGOUT } from '@/store/modules/user/user.actions.types';
import { router } from '@/router/router';
import { LOGIN_ROUTE_NAME, HOME_ROUTE_NAME, PROFILE_ROUTE_NAME } from '@/contsants/routes';
import { api, isFetchError } from '@/services';
import { UPDATE_USER_INFO } from '@/store/modules/user/user.actions.types';
import type { User } from '@/services/api';

const store = useStore();

const form: UpdateUser = reactive({});
const user: ComputedRef<User> = computed(() => store.getters.user);
const isAuthenticated: ComputedRef<boolean> = computed(() => store.getters.isAuthenticated);
const errors = ref();

onMounted(() => {
  if (!isAuthenticated) {
    router.push(LOGIN_ROUTE_NAME);
  }

  form.image = user.value?.image;
  form.username = user.value?.username;
  form.bio = user.value?.bio;
  form.email = user.value?.email;
});

const onSubmit = async () => {
  errors.value = {};
  try {
    const updatedUser = {
      email: form.email,
      password: form.password,
      username: form.username,
      bio: form.bio,
      image: form.image,
    };

    const userData = await api.user
      .updateCurrentUser({ user: updatedUser })
      .then((res) => res.data.user);
    store.dispatch(UPDATE_USER_INFO, userData);
    router.push({ name: PROFILE_ROUTE_NAME, params: { username: userData.username } });
  } catch (error) {
    if (isFetchError(error)) {
      errors.value = error.error?.errors;
    }
  }
};

const onLogout = () => {
  store.dispatch(LOGOUT);
  router.push(HOME_ROUTE_NAME);
};

const isButtonDisabled = computed(
  () =>
    form.image === user.value?.image &&
    form.username === user.value?.username &&
    form.bio === user.value?.bio &&
    form.email === user.value?.email &&
    !form.password,
);
</script>
