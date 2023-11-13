<template>
  <div class="article-meta">
    <router-link :to="{ name: PROFILE_ROUTE_NAME, params: { username: article.author.username } }">
      <img :src="article.author.image" :alt="article.author.username" />
    </router-link>

    <div class="info">
      <router-link
        :to="{ name: PROFILE_ROUTE_NAME, params: { username: article.author.username } }"
        class="author"
      >
        {{ article.author.username }}
      </router-link>

      <span class="date">{{ new Date(article.createdAt).toLocaleDateString() }}</span>
    </div>

    <button
      v-if="displayFollowButton"
      :aria-label="article.author.following ? 'Unfollow' : 'Follow'"
      class="btn btn-sm btn-outline-secondary space"
      :disabled="followProcessGoing"
      @click="toggleFollow"
    >
      <i class="ion-plus-round space" />
      {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
    </button>

    <button
      :aria-label="article.favorited ? 'Unfavorite article' : 'Favorite article'"
      class="btn btn-sm space"
      :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
      :disabled="favoriteProcessGoing"
      @click="favoriteArticle"
    >
      <i class="ion-heart space" />
      {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>

    <router-link
      v-if="displayEditButton"
      aria-label="Edit article"
      class="btn btn-outline-secondary btn-sm space"
      :to="{ name: EDIT_ARTICLE_ROUTE_NAME, params: { slug: article.slug } }"
    >
      <i class="ion-edit space" /> Edit Article
    </router-link>

    <button
      v-if="displayEditButton"
      aria-label="Delete article"
      class="btn btn-outline-danger btn-sm"
      @click="onDelete"
    >
      <i class="ion-trash-a" /> Delete Article
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useFavoriteArticle } from '@/composable/useFavoriteArticle';
import { useFollow } from '@/composable/useFollowProfile';
import { useRouter } from 'vue-router';
import { api } from '@/services';
import type { Article, Profile } from '@/services/api';
import { HOME_ROUTE_NAME, EDIT_ARTICLE_ROUTE_NAME, PROFILE_ROUTE_NAME } from '@/contsants/routes';

interface Props {
  article: Article;
}
interface Emits {
  (e: 'update', article: Article): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();
const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.getters.user);

const { article } = toRefs(props);
const displayEditButton = computed(
  () => isAuthenticated.value && user.value?.username === article.value.author.username,
);
const displayFollowButton = computed(
  () => isAuthenticated.value && user.value?.username !== article.value.author.username,
);

const { favoriteProcessGoing, favoriteArticle } = useFavoriteArticle({
  isFavorited: computed(() => article.value.favorited),
  articleSlug: computed(() => article.value.slug),
  onUpdate: (newArticle) => emit('update', newArticle),
});

const onDelete = async () => {
  await api.articles.deleteArticle(article.value.slug);
  await router.push(HOME_ROUTE_NAME);
};

const { followProcessGoing, toggleFollow } = useFollow({
  following: computed(() => article.value.author.following),
  username: computed(() => article.value.author.username),
  onUpdate: (author: Profile) => {
    const newArticle = { ...article.value, author };
    emit('update', newArticle);
  },
});
</script>
