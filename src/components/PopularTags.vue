<template>
  <p>Popular Tags</p>

  <div class="tag-list">
    <router-link
      v-for="tag in tags"
      :key="tag"
      :to="{ name: TAG_ROUTE_NAME, params: { tag } }"
      class="tag-pill tag-default"
    >
      {{ tag }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useTags } from '@/composable/useTags';
import { TAG_ROUTE_NAME } from '@/contsants/routes';

const { tags, fetchTags } = useTags();

await fetchTags();
</script>
