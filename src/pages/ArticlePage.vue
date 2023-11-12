<template>
  <div class="article-page">
    <Suspense>
      <ArticleDetail />
      <template #fallback>
        <div class="container page">Article is loading...</div>
      </template>
    </Suspense>

    <Suspense>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleDetailComments />
        </div>
      </div>
      <template #fallback>
        <div class="container page">Comments are loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import ArticleDetail from '@/components/Article/ArticleDetail.vue';
import ArticleDetailComments from '@/components/Article/ArticleDetailComments.vue';
</script>
