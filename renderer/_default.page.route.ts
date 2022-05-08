import { PageFile } from "vite-plugin-ssr/dist/cjs/shared/getPageFiles"

export { onBeforeRoute }

function onBeforeRoute(pageContext: {
  _pageFilesAll: PageFile[],
  url: string,
  _pageId: string | undefined | null
}) {
  let { url } = pageContext

  // If we have this current url in our pages datastore, associate it with the relevant template (pageId).
  const pageId = global.pathsAndPages?.get(url)

  if (pageId) return {
    pageContext: {
      _pageId: pageId.template
    },
  }
}
