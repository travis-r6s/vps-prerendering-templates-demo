import { renderToNodeStream } from '@vue/server-renderer'
import { escapeInject } from 'vite-plugin-ssr'
import { createApp } from './app'
import { getPageTitle } from './getPageTitle'
import type { PageContext } from './types'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export { passToClient }
export { render }

const passToClient = ['pageProps', 'documentProps', 'pageData']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext)
  const stream = renderToNodeStream(app)

  const title = getPageTitle(pageContext)

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`
}


interface Context extends PageContext {
  Page: { pageQuery?: { query?: string } }
}
export async function onBeforeRender(ctx: Context) {
  console.log('(_default.page.server.ts) onBeforeRender', ctx.url);

  // Before we render, fetch any data from our datastore, and add to context.
  // In the actual Wind framework, this is where we would get the query with `ctx.Page.pageQuery`, and query our datastore.
  const page = global.pathsAndPages.get(ctx.url)

  return {
    pageContext: {
      pageData: page?.data || {}
    }
  }
}

export async function prerender() {
  console.log('(_default.page.server.ts) prerender');

  // When we are prerendering, we can fetch all pages + data from our datastore,
  // and add the to the output array so we don't need to run `onBeforeRender` for each.
  const pages = Array.from(global.pathsAndPages)

  const prerenderPages = pages.map(([url, { data }]) => ({
    url,
    pageContext: {
      pageData: data || {}
    }
  }))

  console.log(`Prerendering ${prerenderPages.length} pages`);

  return prerenderPages
}
