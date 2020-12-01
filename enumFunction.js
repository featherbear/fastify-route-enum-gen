import { TreeSymbol, MethodSymbol } from 'fastify-route-tree'

const data = {}

function crawl () {
  if (this[TreeSymbol][MethodSymbol]) {
    for (const [method, schema] of Object.entries(
      this[TreeSymbol][MethodSymbol]
    )) {
      data[
        (schema && schema.id) ||
          this.path
            .toUpperCase()
            .replace(/^\//g, '')
            .replace(/[^a-zA-Z0-9]/g, '_')
      ] = this.path
    }
  } else {
    for (const path of Object.values(this[TreeSymbol])) {
      crawl.apply(path)
    }
  }
}

export default function () {
  crawl.apply(this)
  return JSON.stringify(data, null, 2)
}
