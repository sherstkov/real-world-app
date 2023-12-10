<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>

    <div class="card-footer">
      <router-link
        :to="{ name: PROFILE_ROUTE_NAME, params: { username: comment.author.username } }"
        class="comment-author"
      >
        <img
          :src="comment.author.image"
          class="comment-author-img"
          :alt="comment.author.username"
        />
      </router-link>

      &nbsp;

      <router-link
        :to="{ name: PROFILE_ROUTE_NAME, params: { username: comment.author.username } }"
        class="comment-author"
      >
        {{ comment.author.username }}
      </router-link>

      <span class="date-posted">{{ new Date(comment.createdAt).toLocaleDateString('en-US') }}</span>

      <span class="mod-options">
        <i
          v-if="showRemove"
          tabindex="0"
          role="button"
          aria-label="Delete comment"
          class="ion-trash-a"
          @click="emit('remove-comment')"
          @keypress.enter="emit('remove-comment')"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Comment } from '@/services/api';
import { PROFILE_ROUTE_NAME } from '@/contsants/routes';

interface Props {
  comment: Comment;
  username?: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'remove-comment'): boolean;
}
const emit = defineEmits<Emits>();

const showRemove = computed(
  () => props.username !== undefined && props.username === props.comment.author.username,
);
</script>
