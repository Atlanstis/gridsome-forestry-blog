<template>
  <Layout>
    <div class="container">
      <Hero />
      <ProjectsGrid :projects="$page.projects.edges" />
    </div>
    <LatestJournals :journals="$page.journals.edges" />
  </Layout>
</template>

<page-query>
query {
  projects: allStrapiProject {
    edges {
      node {
        id
        date (format: "YYYY-MM-DD")
        title
        categories {
          name
        }
        thumbnail {
          url
        }
      }
    }
  }
  journals: allStrapiJournal {
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>

<script>
import Hero from '@/components/Hero'
import ProjectsGrid from '@/components/ProjectsGrid'
import LatestJournals from '@/components/LatestJournals'

export default {
  metaInfo: {
    title: 'Home'
  },

  components: {
    Hero,
    ProjectsGrid,
    LatestJournals
  }
}
</script>
