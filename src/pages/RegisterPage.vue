<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="/login">Have an account?</a>
          </p>
          <ul class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }}: {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form @submit.prevent="registerUser">
            <fieldset class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              type="submit"
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="!(user.email && user.username && user.password)"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '@/services';
import { UPDATE_USER_INFO } from '@/store/modules/user/user.actions.types';
import { isFetchError } from '@/services';
export default {
  name: 'RegisterPage',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await api.users.createUser({
          user: this.user,
        });

        if (response.data) {
          this.$store.dispatch(UPDATE_USER_INFO, response.data.user);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        if (isFetchError(error)) {
          this.errors = error.error?.errors;
        }
      }
    },
  },
};
</script>
