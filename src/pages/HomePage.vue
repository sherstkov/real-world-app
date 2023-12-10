<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Suspense>
            <ArticlesList :feeds="feeds" />
            <template #fallback> Articles are loading... </template>
          </Suspense>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <Suspense>
              <PopularTags />
              <template #fallback> Popular tags are loading... </template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ArticlesList from '@/components/ArticlesList.vue';
import PopularTags from '@/components/PopularTags.vue';
import { Routes } from '@/router/router';
import { PERSONAL_FEED_ROUTE_NAME, HOME_ROUTE_NAME } from '@/contsants/routes';

let feeds = [PERSONAL_FEED_ROUTE_NAME, HOME_ROUTE_NAME] as Routes[];
</script>
