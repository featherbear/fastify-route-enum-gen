#!/usr/bin/env node

if (!process.argv[2] || process.argv.slice(3).length === 0) {
  console.log(
    'Usage: fastify-route-enum-gen <outputFile> <routeFile1> <routeFile2> <...>'
  )
  process.exit(0)
}

process.argv = [
  ...process.argv.slice(0, 3),
  require('path').join(__dirname, 'enumFunction.js'),
  ...process.argv.slice(3)
]

require('fastify-route-tree-cli')
