import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'

import pageData from './page-graphql'

// Mocking the pages datastore here
const pathsAndPages = new Map([
  ['/templates/Post', {
    template: '/pages/404',
    data: {}
  }],
  ['/posts/hello', {
    template: '/templates/Post',
    data: {
      id: 1,
      title: 'Demo data from server',
      content: 'lorem hipsum!',
      slug: '/hello'
    }
  }]
])

// And adding to global so we can access easily in this demo
global.pathsAndPages = pathsAndPages

const config: UserConfig = {
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md(),
    ssr({
      prerender: true,
      // pageFiles: {}
    }),
    pageData()
  ]
}

export default config
