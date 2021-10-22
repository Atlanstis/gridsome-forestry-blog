// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gypsophila',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_BASE_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['Project', 'Journal'],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '',
          password: ''
        }
      }
    }
  ],
  templates: {
    StrapiProject: [
      {
        path: '/projects/:id',
        component: './src/templates/ProjectPost.vue'
      }
    ],
    StrapiJournal: [
      {
        path: '/journal-post/:id',
        component: './src/templates/JournalPost.vue'
      }
    ]
  }
}
