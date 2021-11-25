const fg = require('fast-glob')
const path = require('path')
const pathResolve = require('aneka/src/fs/path-resolve')
const { uniq, concat, isEmpty, intersection, isFunction } = require('lodash')

const verbs = ['HEAD', 'GET', 'POST', 'UPDATE', 'PATCH', 'DELETE', 'OPTIONS']

module.exports = async function (dir = '', fastify, options = {}) {
  let baseDir
  if (!options.root) options.root = 'cwd'
  if (!options.prefix) options.prefix = '/'
  if (isEmpty(dir)) throw new Error('Directory to scan is not provided')
  if (path.isAbsolute(dir)) baseDir = dir
  else if (options.root === 'cwd') baseDir = fastify.config.dir.base
  else if (options.root === 'dataDir') baseDir = fastify.config.dir.data
  // else if (options.root === 'dirname') baseDir = path.join(__dirname, dir)
  else baseDir = dir
  baseDir = pathResolve(baseDir)
  const files = await fg(`${baseDir}/**/*.js`)
  const result = []
  const paths = {}
  for (const file of files) {
    let url = file
      .replace(baseDir, '')
      .replace(/@@/g, '\t')
      .replace(/@/g, ':')
      .replace(/\t/g, '@')
      .split('/')
      .slice(0, -1)
      .join('/')
    url = (options.prefix + url).replace(/\/\//g, '/')
    if (!paths[url]) paths[url] = []
    const method = path.basename(file, '.js').split('-').map(m => m.toUpperCase())
    if (intersection(verbs, method).length > 0) {
      const check = intersection(paths[url], method)
      if (check.length > 0) throw new Error(`Method "${method.join('-')}" clashed with "${paths[url].join('-')}" in path "${url}"`)
      paths[url] = uniq(concat(paths[url], method))
      result.push({ file, url, method })
    }
  }
  fastify.config.routes = concat((fastify.config.routes || []), result)
}
