<template>
  <TheHeader />
  <router-view />
  <TheFooter />
</template>

<script lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'DefaultLayout',
  components: { TheHeader, TheFooter },
};
</script>
