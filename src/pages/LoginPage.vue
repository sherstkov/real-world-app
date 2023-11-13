<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>

          <ul class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form @submit.prevent="loginUser">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                required
                v-model="form.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                v-model="form.password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="!(form.email && form.password)"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { router } from '@/router/router';
import { api, isFetchError } from '@/services';
import { LoginUser } from '@/services/api';
import { ref, reactive } from 'vue';
import { UPDATE_USER_INFO } from '@/store/modules/user/user.actions.types';
import { HOME_ROUTE_NAME } from '@/contsants/routes';

const store = useStore();

const form: LoginUser = reactive({
  email: '',
  password: '',
});
const errors = ref();

const loginUser = async () => {
  errors.value = {};

  try {
    const result = await api.users.login({ user: form });

    store.dispatch(UPDATE_USER_INFO, result.data.user);
    router.push(HOME_ROUTE_NAME);
  } catch (e) {
    if (isFetchError(e)) {
      errors.value = e.error?.errors;
      return;
    }
  }
};
</script>
