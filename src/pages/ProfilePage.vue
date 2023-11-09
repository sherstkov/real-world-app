<template><button @click="handleDelete">DELTE</button></template>
<script lang="ts">
import { LOGOUT } from '@/store/modules/user/user.actions.types';
export default {
  name: 'ProfilePage',
  methods: {
    handleDelete() {
      this.$store.dispatch(LOGOUT);
    },
  },
};
</script>
