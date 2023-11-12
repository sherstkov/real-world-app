<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newTag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @change="addTag"
                  @keypress.enter.prevent="addTag"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, index) in article.tagList"
                    :key="index"
                    class="tag-default tag-pill"
                  >
                    {{ tag }}
                    <i
                      role="button"
                      tabindex="0"
                      :aria-label="`Delete tag: ${tag}`"
                      class="ion-close-round"
                      @click="removeTag(tag)"
                      @keypress.enter="removeTag(tag)"
                    ></i>
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
                :disabled="!(article.title && article.description && article.body)"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ARTICLE_ROUTE_NAME } from '@/contsants/routes';
import { api } from '@/services';
import type { Article } from '@/services/api';

export default {
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [] as string[],
      },
      newTag: '',
    };
  },
  methods: {
    async onSubmit() {
      let article: Article;
      if (this.slug) {
        article = await api.articles
          .updateArticle(this.slug, { article: this.article })
          .then((res) => res.data.article);
      } else {
        article = await api.articles
          .createArticle({ article: this.article })
          .then((res) => res.data.article);
      }
      return this.$router.push({ name: ARTICLE_ROUTE_NAME, params: { slug: article.slug } });
    },
    async fetchArticle(slug: string) {
      const article = await api.articles.getArticle(slug).then((res) => res.data.article);

      this.article.title = article.title;
      this.article.description = article.description;
      this.article.body = article.body;
      this.article.tagList = article.tagList;
    },
    removeTag(tag: string) {
      this.article.tagList = this.article.tagList.filter((t) => t !== tag);
    },
    addTag() {
      this.article.tagList.push(this.newTag.trim());
      this.newTag = '';
    },
  },
  mounted() {
    if (this.slug) this.fetchArticle(this.slug);
  },
  computed: {
    slug() {
      return this.$route.params.slug as string;
    },
  },
};
</script>
