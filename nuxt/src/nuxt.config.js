export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // axios でproxy が使えるようにする
    proxy: true
  },
  proxy: {
    // proxy設定法
    // https://blog.proglearn.com/2020/05/26/%E3%80%90nuxt-js%E3%80%91%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E3%81%ABcors%E3%81%A7%E6%8E%A5%E7%B6%9A%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%EF%BC%9F%E3%81%AA%E3%82%89%E3%81%B0-nuxtjs/
    // https://qiita.com/mouse_484/items/71f77aef3dfe5216a71b
    '/api/': {
      target: 'http://192.168.50.10:3000/',
      pathRewrite: {'^/api/': ''},
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  server: {
    //dockerfileでhostとport設定をしたので、nuxtで受け取れるように変更する
    port: 8080, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  },

  //file変更の監視を行い、変えるたびchromeに反映
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
