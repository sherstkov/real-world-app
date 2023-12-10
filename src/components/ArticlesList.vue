<template>
  <FeedToggle :feeds="feeds" :tag="tag" />
  <div v-if="articlesDownloading" class="article-preview">Articles are loading...</div>
  <div v-else-if="articles.length === 0" class="article-preview">No articles.</div>
  <template v-else>
    <ArticlesListArticlePreview
      v-for="(article, index) in articles"
      :key="article.slug"
      :article="article"
      @update="(newArticle) => updateArticle(index, newArticle)"
    />

    <AppPagination :count="articlesCount" :page="page" @page-change="changePage" />
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useArticles } from '@/composable/useArticle';
import FeedToggle from './FeedToggle.vue';
import { watch, ref } from 'vue';
import ArticlesListArticlePreview from './ArticleListPreview.vue';
import AppPagination from './AppPagination.vue';

import { Routes } from '@/router/router';
import { TAG_ROUTE_NAME } from '@/contsants/routes';

const props = defineProps({
  feeds: Array as () => Routes[],
});

const route = useRoute();
const tag = ref(route.params?.tag);

let feeds = ref(props.feeds as Routes[]);

watch(
  route,
  (newRoute) => {
    tag.value = newRoute.params?.tag;
  },
  { immediate: true },
);

watch(
  route,
  (newRoute) => {
    const newTag = newRoute.params?.tag as string | undefined;
    if (newTag) {
      if (!feeds.value.includes(TAG_ROUTE_NAME)) {
        feeds.value.push(TAG_ROUTE_NAME);
      }
      tag.value = newTag;
    } else {
      const tagIndex = feeds.value.indexOf(TAG_ROUTE_NAME);
      if (tagIndex >= 0) {
        feeds.value.splice(tagIndex, 1);
      }
      tag.value = undefined;
    }
  },
  { immediate: true },
);

const {
  fetchArticles,
  articlesDownloading,
  articlesCount,
  articles,
  updateArticle,
  page,
  changePage,
} = useArticles();

await fetchArticles();
</script>
