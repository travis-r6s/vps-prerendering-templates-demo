import { Plugin } from 'vite'

// Simple plugin that parses the custom `<page-query></page-query>` block,
// and adds it as a string to the current component.
// We can then use this later in the render hooks (faked, for now) with `pageContext.Page.pageQuery`
export default function myPlugin(): Plugin {
  return {
    name: 'transform-file',
    enforce: 'pre',

    async transform(src, id, options) {
      if (!/vue&type=page-query/.test(id)) return

      console.log('transforming:', id)
      const data = { query: src }
      return `export default Comp => {
        Comp.pageQuery = ${JSON.stringify(data)}
      }`
    }
  }
}
