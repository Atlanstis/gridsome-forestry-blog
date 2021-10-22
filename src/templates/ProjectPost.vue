<template>
  <Layout>
    <div class="project">
      <div class="container">
        <div class="project-header">
          <h1 class="project-title" v-html="$page.post.title" />
          <div class="project-info">
            <div class="categories-container">
              <div class="categories">
                <span class="label">Categories</span>
                <span
                  class="category"
                  v-for="(category, index) in $page.post.categories"
                  :key="index"
                  v-text="category.name"
                />
              </div>
            </div>

            <div class="year-container">
              <span class="label">Year</span>
              <div v-html="$page.post.date" />
            </div>
          </div>
        </div>

        <div v-html="mdRender($page.post.content)" class="content" />

        <p>
          <g-image
            :src="imgUrlCover($page.post.thumbnail.url)"
            :alt="$page.post.title"
          />
        </p>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  post: strapiProject (id: $id) {
    title
    thumbnail {
      url
    }
    date (format: "YYYY")
    categories {
      name
    }
    project_bg_color
    project_fg_color
    content
  }
}
</page-query>

<script>
import { mdRender, imgUrlCover } from '@/utils'
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      bodyAttrs: {
        style: `background-color: ${
          this.$page.post.project_bg_color
            ? this.$page.post.project_bg_color
            : 'var(--color-base)'
        }; color: ${
          this.$page.post.project_fg_color
            ? this.$page.post.project_fg_color
            : 'var(--color-contrast)'
        }`
      }
    }
  },

  methods: {
    mdRender,
    imgUrlCover
  }
}
</script>

<style scoped>
.project-header {
  padding: 20vh 0 4rem 0;
}
.project-title {
  font-size: 4rem;
  margin: 0 0 4rem 0;
  padding: 0;
}
.project-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.project-info > div {
  margin-right: 4rem;
}
.project-info > div:last-of-type {
  margin: 0;
}
.category:after {
  content: ', ';
}
.category:last-of-type:after {
  content: '';
}
</style>
