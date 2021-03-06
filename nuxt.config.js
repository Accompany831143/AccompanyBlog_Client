/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-03-19 17:17:46
 * @FilePath: \AivaBlog_Client\nuxt.config.js
 */
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Aiva博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Aiva,一名前端工程师，热爱技术，喜欢钻研。' },
      { hid: 'keywords', name: 'keywords', content: '个人博客,前端开发,技术文章,Aiva,Aiva博客' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'ant-design-vue/dist/antd.min.css',
    '@/assets/css/Global.less',
    '@/static/hljs.css',
    '@/static/articleDetail.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/constom.config',
    '@/plugins/route',
    '~/plugins/axios',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  loading: {
    color: '#d0344e'
  },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxAsyncRequests: 10,
        cacheGroups: {
          moment: {
            test: /node_modules[\\/]moment/,
            chunks: 'all',
            priority: 20,
            name: true
          },
          antdDesignVue: {
            test: /node_modules[\\/]ant-design-vue/,
            chunks: 'all',
            priority: 20,
            name: true
          },
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    transpile: [
      "ant-design-vue"
    ],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    },
    babel: {
      plugins: [
        [
          "import",
          { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
        ]
      ]
    }
  }
}
