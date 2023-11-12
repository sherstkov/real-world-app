<template>
  <p v-if="!profile">
    <router-link :to="{ name: LOGIN_ROUTE_NAME }"> Sign in </router-link> or
    <router-link :to="{ name: REGISTER_ROUTE_NAME }"> sign up </router-link> to add comments on this
    article.
  </p>
  <form v-else class="card comment-form" @submit.prevent="submitComment">
    <div class="card-block">
      <textarea
        v-model="comment"
        aria-label="Write comment"
        class="form-control"
        placeholder="Write a comment..."
        :rows="3"
      />
    </div>
    <div class="card-footer">
      <img :src="profile.image" class="comment-author-img" :alt="profile.username" />
      <button
        aria-label="Submit"
        type="submit"
        :disabled="comment === ''"
        class="btn btn-sm btn-primary"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useProfile } from '@/composable/useProfile';
import { api } from '@/services';
import type { Comment } from '@/services/api';
import { LOGIN_ROUTE_NAME, REGISTER_ROUTE_NAME } from '@/contsants/routes';

interface Props {
  articleSlug: string;
}
interface Emits {
  (e: 'add-comment', comment: Comment): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const store = useStore();

const { user } = store.getters;

const username = computed(() => user.value?.username ?? '');
const { profile } = useProfile({ username });

const comment = ref('');

const submitComment = async () => {
  const newComment = await api.articles
    .createArticleComment(props.articleSlug, { comment: { body: comment.value } })
    .then((res) => res.data.comment);
  emit('add-comment', newComment);
  comment.value = '';
};
</script>
