import dotenv from 'dotenv'
let env = dotenv.config()
// console.log(env.parsed)

export default {
  mode: 'universal',
  env: env.parsed,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Snippets',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/algolia'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    baseURL: env.parsed.API_URL
  },

  auth: {
    redirect: {
      login: '/auth/signin'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'data.token'
          },
          user: {
            url: 'auth/me',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: 'auth/logout',
            method: 'post'          }
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vue-instantsearch',
      'instantsearch.js/es'
    ],

    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
